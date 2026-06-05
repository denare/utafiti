# 🏠 Utafiti Survey - Housing Survey Application

A comprehensive Kiswahili survey application for collecting housing market data in Tanzania, with secure Firebase backend and admin dashboard.

## 🚀 Quick Start

### Deployed App
- **Survey Form:** https://utafiti-tz.web.app
- **Admin Dashboard:** https://utafiti-tz.web.app/admin.html

### Local Development
```bash
# Build and deploy
npm run deploy

# Backup database
npm run backup

# Local testing
npm run serve
```

## 📋 Features

### Survey Form (index.html)
- ✅ 20-question survey in Kiswahili
- ✅ Conditional logic (questions shown based on previous answers)
- ✅ Real-time validation
- ✅ Firestore database integration
- ✅ Prevents duplicate submissions (localStorage)
- ✅ Share functionality (WhatsApp, Facebook)
- ✅ Mobile-optimized design

### Admin Dashboard (admin.html)
- ✅ Real-time response viewer
- ✅ Simple view (user-friendly cards) & Raw view (JSON)
- ✅ CSV export for all responses
- ✅ Response statistics
- ✅ Copy response IDs to clipboard
- ✅ Secure configuration (API keys hidden)

## 🔒 Security

### API Keys Protection
- ✅ All credentials stored in `.env.local`
- ✅ `config.js` auto-generated from environment variables
- ✅ Both files in `.gitignore` (never committed)
- ✅ No exposed keys in source code

### Database Backups
- ✅ Automated Firestore backup script
- ✅ Daily backups with timestamps
- ✅ Complete data preservation
- ✅ Restore-ready JSON format

## 📦 Setup & Deployment

### 1. Firebase Authentication
```bash
export PATH="$HOME/.npm-global/bin:$PATH"
firebase login:ci --no-localhost
```

### 2. Build & Deploy
```bash
npm run deploy
```

This automatically:
- Generates `config.js` from `.env.local`
- Deploys to Firebase Hosting
- Updates live app at https://utafiti-tz.web.app

### 3. Setup Database Backups
See [BACKUP_SETUP.md](BACKUP_SETUP.md) for detailed instructions.

## 📁 Project Structure

```
utafiti/
├── index.html              # Survey form
├── admin.html              # Admin dashboard
├── config.js               # Auto-generated config (gitignored)
├── .env.local              # Environment variables (gitignored)
├── build-config.js         # Build script
├── backup-database.js      # Backup script
├── package.json            # Dependencies & scripts
├── firebase.json           # Firebase config
├── .firebaserc             # Firebase project reference
├── .gitignore              # Git ignore rules
├── backup1/                # Database backups
│   ├── firestore-backup-*.json
│   └── backup-manifest.json
└── BACKUP_SETUP.md         # Backup guide
```

## 🔧 Environment Configuration

### .env.local (not committed)
```
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=utafiti-8c2cc.firebaseapp.com
FIREBASE_PROJECT_ID=utafiti-8c2cc
FIREBASE_STORAGE_BUCKET=utafiti-8c2cc.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=396461110907
FIREBASE_APP_ID=1:396461110907:web:4c2a322e1ebc5f949214de
```

### config.js (auto-generated, not committed)
Generated from `.env.local` by `build-config.js`

## 📊 Data Collection

### Survey Questions (20 total)
1. Region
2. Job Type
3. Housing Status
4. Monthly Rent
5. Search Methods
6. Time to Find
7. Used Agent
8. Agent Fee
9. Problems Faced
10. Scam Experience
11. Amount Lost
12. Trust Factors
13. Escrow Payment
14. Phone Type
15. Apps Used
16. Website/App Experience
17. New App Interest
18. Important Features
19. Success Fee
20. Problem Severity
21. Comments

### Database Collections
- **responses** - All survey submissions with timestamps
- **stats** - Aggregate metrics (unique opens, total submissions)

## 📥 Data Export

### Download Survey Responses
1. Go to admin dashboard: https://utafiti-tz.web.app/admin.html
2. Click "📥 Download Data"
3. CSV file downloads with all responses
4. Open in Excel/Google Sheets for analysis

### File Format
- **Name:** `Utafiti_Responses_YYYY-MM-DD_HH-mm.csv`
- **Columns:** Response #, Date, Q1-Q20 answers
- **Format:** Proper CSV with quoted fields

## 💾 Backup Strategy

### Automatic Backups
```bash
# One-time backup
npm run backup

# Schedule daily backups (see BACKUP_SETUP.md)
```

### Backup Files
- **Location:** `backup1/` directory
- **Format:** JSON with all responses and stats
- **Naming:** `firestore-backup-YYYY-MM-DD-HH-mm-SS.json`
- **Manifest:** `backup-manifest.json` (metadata)

## 🛠️ Maintenance

### Dependencies
```bash
# Install/update
npm install

# Check versions
npm list
```

### Firebase CLI
```bash
# Verify installation
firebase --version

# Check project
firebase projects:list

# Deploy
npm run deploy
```

### Troubleshooting
- **Deploy fails:** Re-authenticate with `firebase login:ci --no-localhost`
- **Config not loading:** Run `npm run build` to regenerate config.js
- **Backup errors:** Check `serviceAccountKey.json` exists and has permissions

## 📝 License

ISC

## 👤 Author

Utafiti Team

---

**Last Updated:** June 5, 2026
**Firebase Project:** utafiti-8c2cc
**Hosting:** utafiti-tz.web.app
