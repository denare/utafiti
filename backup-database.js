#!/usr/bin/env node
/**
 * Firestore Database Backup Script
 * Exports all survey responses and stats from Firestore to local JSON backup files
 * Run: npm run backup
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK with service account
let serviceAccount;

try {
  serviceAccount = require('./serviceAccountKey.json');
} catch (e) {
  console.error('❌ Error: serviceAccountKey.json not found!');
  console.error('Steps to create it:');
  console.error('1. Go to Firebase Console: https://console.firebase.google.com/project/utafiti-8c2cc/settings/serviceaccounts/adminsdk');
  console.error('2. Click "Generate New Private Key"');
  console.error('3. Save the JSON file as serviceAccountKey.json in the project root');
  console.error('4. Add serviceAccountKey.json to .gitignore');
  console.error('5. Run this script again');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'utafiti-8c2cc'
});

const db = admin.firestore();
const backupDir = path.join(__dirname, 'backup1');

// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

async function backupDatabase() {
  try {
    console.log('🔄 Starting database backup...\n');

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `firestore-backup-${timestamp}.json`);

    const backup = {
      exportDate: new Date().toISOString(),
      projectId: 'utafiti-8c2cc',
      collections: {}
    };

    // Backup responses collection
    console.log('📋 Backing up "responses" collection...');
    const responsesSnap = await db.collection('responses').orderBy('timestamp', 'desc').get();
    backup.collections.responses = [];
    responsesSnap.forEach(doc => {
      backup.collections.responses.push({
        id: doc.id,
        ...doc.data()
      });
    });
    console.log(`   ✅ ${backup.collections.responses.length} responses backed up`);

    // Backup stats collection
    console.log('📊 Backing up "stats" collection...');
    const statsSnap = await db.collection('stats').get();
    backup.collections.stats = [];
    statsSnap.forEach(doc => {
      backup.collections.stats.push({
        id: doc.id,
        ...doc.data()
      });
    });
    console.log(`   ✅ ${backup.collections.stats.length} stats documents backed up`);

    // Write backup file
    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2), 'utf-8');
    const fileSize = (fs.statSync(backupFile).size / 1024).toFixed(2);

    console.log('\n✅ Backup completed successfully!');
    console.log(`📁 Backup file: backup1/firestore-backup-${timestamp}.json`);
    console.log(`📦 File size: ${fileSize} KB`);
    console.log(`📈 Total records: ${backup.collections.responses.length + backup.collections.stats.length}`);

    // Create metadata file
    const metadataFile = path.join(backupDir, 'backup-manifest.json');
    const manifest = {
      lastBackup: new Date().toISOString(),
      backupFile: path.basename(backupFile),
      totalResponses: backup.collections.responses.length,
      totalStats: backup.collections.stats.length,
      fileSize: fileSize + ' KB'
    };
    fs.writeFileSync(metadataFile, JSON.stringify(manifest, null, 2), 'utf-8');

    console.log('📄 Manifest: backup1/backup-manifest.json\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

backupDatabase();
