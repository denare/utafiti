#!/usr/bin/env node
/**
 * Build script to inject environment variables into config.js
 * Run this before deploying to Firebase
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '.env.local');
const envVars = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');
  
  lines.forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    }
  });
} else {
  console.error('❌ Error: .env.local file not found!');
  console.error('Create .env.local with Firebase configuration first.');
  process.exit(1);
}

// Generate config.js
const configContent = `
// Auto-generated configuration file
// Do NOT commit this file - it's generated from .env.local
// This file is added to .gitignore

window.firebaseConfig = {
  apiKey: "${envVars.FIREBASE_API_KEY || ''}",
  authDomain: "${envVars.FIREBASE_AUTH_DOMAIN || ''}",
  projectId: "${envVars.FIREBASE_PROJECT_ID || ''}",
  storageBucket: "${envVars.FIREBASE_STORAGE_BUCKET || ''}",
  messagingSenderId: "${envVars.FIREBASE_MESSAGING_SENDER_ID || ''}",
  appId: "${envVars.FIREBASE_APP_ID || ''}"
};
`;

// Write config.js
const configPath = path.join(__dirname, 'config.js');
fs.writeFileSync(configPath, configContent, 'utf-8');

console.log('✅ config.js generated successfully!');
console.log('📝 Config file location:', configPath);
console.log('🔒 This file is in .gitignore and will NOT be committed');
