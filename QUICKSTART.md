# 🚀 Quick Start Guide - Marine Refuge Email System

## ⚡ 5-Minute Setup

### Step 1: Get SendGrid API Key (2 minutes)

1. Go to [SendGrid.com](https://sendgrid.com/) and sign up
2. Navigate to: **Settings** → **API Keys**
3. Click **Create API Key**
4. Name: "MarineRefuge"
5. Permissions: **Full Access** or **Mail Send**
6. Copy the API key (you'll only see it once!)

### Step 2: Verify Sender Email (1 minute + email verification)

1. In SendGrid: **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill form with: `marinerefugestartup@gmail.com`
4. Submit and check email for verification link
5. Click the link to verify

### Step 3: Setup MongoDB (2 minutes)

**Option A - Quick (Local):**
```bash
# Install MongoDB and start it
mongod
```

**Option B - Cloud (MongoDB Atlas):**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Click "Connect" → "Connect your application"
4. Copy connection string

### Step 4: Create .env File (1 minute)

Create `.env` in project root:

```env
PORT=5000
SENDGRID_API_KEY=SG.your_key_here_from_step1
SENDGRID_SENDER_EMAIL="Marine Refuge Updates <marinerefugestartup@gmail.com>"
MONGODB_URI=mongodb://localhost:27017/marinerefuge
```

Or for MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/marinerefuge
```

### Step 5: Start Server (30 seconds)

```bash
npm run dev
```

### Step 6: Test It! (30 seconds)

```bash
curl -X POST http://localhost:5000/api/subscribe \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"YOUR_EMAIL@example.com\"}"
```

**Check your inbox!** 📧

---

## 🎯 API Endpoints

### Subscribe to Newsletter
```bash
POST http://localhost:5000/api/subscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Get Subscriber Count
```bash
GET http://localhost:5000/api/subscribers/count
```

---

## 🐛 Troubleshooting

### "SendGrid API key is not configured"
→ Make sure `.env` file exists and has `SENDGRID_API_KEY`

### "MongoDB connection error"
→ Check MongoDB is running: `mongod` or verify Atlas connection string

### Email not received
→ Check spam folder and verify sender email in SendGrid

### Port 5000 in use
→ Kill the process:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [PID] /F
```

---

## 📚 Full Documentation

- **IMPLEMENTATION_SUMMARY.md** - What was built
- **EMAIL_SYSTEM_README.md** - Complete API docs
- **SETUP_CHECKLIST.md** - Detailed setup
- **FILE_STRUCTURE.md** - Code organization
- **FRONTEND_INTEGRATION_EXAMPLE.tsx** - React example

---

## ✅ You're Done!

Your email system is now running at: **http://localhost:5000**

### Next Steps:
1. ✅ Test with your email
2. ✅ Integrate with frontend (see FRONTEND_INTEGRATION_EXAMPLE.tsx)
3. ✅ Add newsletter form to your website

**Questions?** Check EMAIL_SYSTEM_README.md for details.

---

Made with 💙 for Marine Refuge
