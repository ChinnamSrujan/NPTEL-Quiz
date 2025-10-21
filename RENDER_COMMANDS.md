# Render Deployment - Exact Commands

## 📋 Copy-Paste Ready Commands

### For Backend Service on Render

**Build Command:**
```
cd backend && npm install
```

**Start Command:**
```
cd backend && npm start
```

**Environment Variables:**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/quiz?retryWrites=true&w=majority
FRONTEND_URL=https://conservation-quiz-frontend.onrender.com
```

---

### For Frontend Service on Render

**Build Command:**
```
cd frontend && npm install && npm run build
```

**Publish Directory:**
```
frontend/build
```

---

## 🔐 MongoDB Connection String Format

Replace the placeholders:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/quiz?retryWrites=true&w=majority
```

Where:
- `USERNAME` = Your MongoDB database user
- `PASSWORD` = Your MongoDB database password
- `CLUSTER` = Your MongoDB cluster name (e.g., cluster0)

**Example:**
```
mongodb+srv://admin:myPassword123@cluster0.abc123.mongodb.net/quiz?retryWrites=true&w=majority
```

---

## 🚀 Local Testing Before Deployment

### Test Backend Locally
```bash
cd backend
npm install
npm start
```

Should output:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### Test Frontend Locally
```bash
cd frontend
npm install
npm start
```

Should open http://localhost:3000

### Test Full Stack
```bash
npm run dev
```

---

## 📝 Git Commands

### Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### Check Git Status
```bash
git status
```

### View Commit History
```bash
git log --oneline
```

---

## 🔍 Verification Commands

### Check Backend Health
```bash
curl https://conservation-quiz-backend.onrender.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "production"
}
```

### Check MongoDB Connection
```bash
# In backend logs on Render, you should see:
✅ MongoDB connected successfully
```

---

## 🛠️ Troubleshooting Commands

### View Backend Logs
```
# On Render dashboard:
1. Click your backend service
2. Click "Logs" tab
3. View real-time logs
```

### View Frontend Build Logs
```
# On Render dashboard:
1. Click your frontend service
2. Click "Logs" tab
3. View build and deployment logs
```

### Test API Endpoint
```bash
# Get all scores
curl https://conservation-quiz-backend.onrender.com/api/scores

# Post a new score
curl -X POST https://conservation-quiz-backend.onrender.com/api/scores \
  -H "Content-Type: application/json" \
  -d '{"playerName":"Test","score":85,"totalQuestions":120}'
```

---

## 📊 Environment Variables Checklist

### Backend Required Variables
- [ ] `NODE_ENV` = `production`
- [ ] `MONGODB_URI` = Your MongoDB connection string
- [ ] `FRONTEND_URL` = Your frontend URL

### Frontend Required Variables
- [ ] `REACT_APP_API_URL` = Your backend URL

---

## 🔄 Redeployment

### Force Redeploy Backend
```
1. Go to Render dashboard
2. Click backend service
3. Click "Manual Deploy" → "Deploy latest commit"
```

### Force Redeploy Frontend
```
1. Go to Render dashboard
2. Click frontend service
3. Click "Manual Deploy" → "Deploy latest commit"
```

---

## 📱 Testing the Deployed App

### Test Quiz Flow
1. Visit: `https://conservation-quiz-frontend.onrender.com`
2. Click "Start Quiz"
3. Answer a question
4. Click "Submit"
5. Check if score is saved
6. Verify in browser console (F12) for any errors

### Test API Directly
```bash
# Get all scores
curl https://conservation-quiz-backend.onrender.com/api/scores

# Expected response:
[
  {
    "_id": "...",
    "playerName": "John",
    "score": 85,
    "totalQuestions": 120,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Push code | `git push origin main` |
| Check status | `git status` |
| View logs | Render dashboard → Logs |
| Redeploy | Render dashboard → Manual Deploy |
| Test backend | `curl https://...onrender.com/api/health` |
| Test frontend | Visit `https://...onrender.com` |

---

## 💾 Backup Commands

### Backup MongoDB Data
```bash
# Export data from MongoDB Atlas
# Use MongoDB Atlas UI → Collections → Export
```

### Backup Code
```bash
# Your code is already backed up on GitHub
git push origin main
```

---

## 🚨 Emergency Commands

### Restart Backend Service
```
1. Go to Render dashboard
2. Click backend service
3. Click "Settings"
4. Click "Restart"
```

### Clear Cache
```
# In browser:
Ctrl+Shift+Delete (Windows)
Cmd+Shift+Delete (Mac)
```

---

## 📞 Support Resources

- Render Status: https://status.render.com
- Render Docs: https://render.com/docs
- MongoDB Status: https://status.mongodb.com
- GitHub Status: https://www.githubstatus.com

---

**Ready to deploy? Follow RENDER_DEPLOYMENT_STEPS.md for step-by-step instructions!**

