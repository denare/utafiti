# Utafiti Survey - Backup & Setup Guide

## 📦 Database Backup Setup

### Step 1: Get Service Account Key

To backup your Firestore database, you need a Firebase service account key:

1. **Go to Firebase Console:**
   - https://console.firebase.google.com/project/utafiti-8c2cc/settings/serviceaccounts/adminsdk

2. **Generate Key:**
   - Click **"Generate New Private Key"**
   - A JSON file will download

3. **Save the File:**
   - Save as `serviceAccountKey.json` in the project root directory
   - Example location: `/home/telnet/Documents/My Projects/utafiti/serviceAccountKey.json`

4. **Security:**
   - This file is in `.gitignore` - it will NOT be committed
   - Keep it private - it has full database access
   - Do NOT share or commit to git

### Step 2: Install Dependencies

```bash
cd /home/telnet/Documents/My\ Projects/utafiti
npm install
```

### Step 3: Create First Backup

```bash
npm run backup
```

**Output will show:**
```
🔄 Starting database backup...
📋 Backing up "responses" collection...
   ✅ X responses backed up
📊 Backing up "stats" collection...
   ✅ X stats documents backed up

✅ Backup completed successfully!
📁 Backup file: backup1/firestore-backup-YYYY-MM-DD-HH-mm-SS.json
📦 File size: X.XX KB
📈 Total records: X
```

## 📁 Backup Files

Backups are stored in `backup1/` directory:

- **`firestore-backup-YYYY-MM-DD-HH-mm-SS.json`** - Complete database backup with timestamps
- **`backup-manifest.json`** - Summary of last backup

## 🔄 Regular Backups

### Daily Backup Script (Linux/Mac)

Add to your crontab to backup daily at 2 AM:

```bash
crontab -e
```

Add this line:
```
0 2 * * * cd /home/telnet/Documents/My\ Projects/utafiti && npm run backup
```

### Windows Task Scheduler

1. Open Task Scheduler
2. Create Basic Task
3. Set trigger: Daily at 2 AM
4. Action: `npm run backup` in project directory

## 📊 Backup Contents

Each backup includes:

```json
{
  "exportDate": "ISO timestamp",
  "projectId": "utafiti-8c2cc",
  "collections": {
    "responses": [
      {
        "id": "document-id",
        "q1": "answer",
        "q2": "answer",
        ...
        "timestamp": "..."
      }
    ],
    "stats": [
      {
        "id": "overview",
        "unique_opens": 123,
        "submissions": 45
      }
    ]
  }
}
```

## ✅ Verification

To verify your backup contains all data:

```bash
npm run backup
ls -lh backup1/
```

You should see:
- `firestore-backup-*.json` (the actual backup)
- `backup-manifest.json` (metadata)

## 🆘 Troubleshooting

### "serviceAccountKey.json not found"
- Make sure you downloaded the key from Firebase Console
- Save it in the project root directory
- Restart the backup script

### "Permission denied"
- Ensure the key has Firestore read permissions
- Check Firebase Console > Service Accounts > Permissions

### Large backup file
- Normal - includes all survey responses and metadata
- Compress if needed: `gzip backup1/*.json`

## 🚀 Next Steps

1. ✅ Download `serviceAccountKey.json` from Firebase Console
2. ✅ Save it in project root
3. ✅ Run `npm install` to install dependencies
4. ✅ Run `npm run backup` to create first backup
5. ✅ Set up automated daily backups (optional)

---

**Important:** Always keep backups! This protects your survey data.
