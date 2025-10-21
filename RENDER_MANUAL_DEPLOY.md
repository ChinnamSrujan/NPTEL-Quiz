# 🚀 RENDER MANUAL DEPLOYMENT GUIDE

## ⚠️ Important: Deploy Backend and Frontend Separately

Due to monorepo structure, we need to deploy backend and frontend as separate services on Render.

---

## 📋 Prerequisites

✅ GitHub account with NPTEL-Quiz repository
✅ Render account (https://render.com)
✅ Code pushed to GitHub

---

## 🎯 STEP 1: Deploy Backend (5 minutes)

### **1.1 Create Web Service**
1. Go to: https://render.com/dashboard
2. Click: **"New +"** → **"Web Service"**
3. Click: **"Connect a repository"**
4. Select: **NPTEL-Quiz** repository
5. Click: **"Connect"**

### **1.2 Configure Backend Service**
```
Name: conservation-quiz-backend
Environment: Node
Region: (choose closest to you)
Branch: main
Build Command: cd backend && npm install
Start Command: cd backend && npm start
Plan: Free
```

### **1.3 Add Environment Variables**
Click: **"Advanced"** → **"Add Environment Variable"**

```
Key: NODE_ENV
Value: production
```

```
Key: FRONTEND_URL
Value: (leave empty for now, update later)
```

### **1.4 Deploy**
1. Click: **"Create Web Service"**
2. ⏳ Wait 5-10 minutes for deployment
3. 📋 **Copy your backend URL** (e.g., `https://conservation-quiz-backend.onrender.com`)

---

## 🎯 STEP 2: Deploy Frontend (5 minutes)

### **2.1 Create Static Site**
1. Go to: https://render.com/dashboard
2. Click: **"New +"** → **"Static Site"**
3. Click: **"Connect a repository"**
4. Select: **NPTEL-Quiz** repository
5. Click: **"Connect"**

### **2.2 Configure Frontend Service**
```
Name: conservation-quiz-frontend
Branch: main
Build Command: cd frontend && npm install && npm run build
Publish Directory: frontend/build
Root Directory: (leave empty)
```

### **2.3 Add Environment Variables**
Click: **"Advanced"** → **"Add Environment Variable"**

```
Key: REACT_APP_API_URL
Value: https://conservation-quiz-backend.onrender.com
```

```
Key: PUBLIC_URL
Value: /
```

### **2.4 Important: Disable render.yaml
⚠️ **IMPORTANT**: If Render asks about render.yaml, **IGNORE IT** and proceed with manual configuration.

The render.yaml file is for the backend service only. The frontend should be deployed separately.

### **2.5 Deploy**
1. Click: **"Create Static Site"**
2. ⏳ Wait 5-10 minutes for deployment
3. 📋 **Copy your frontend URL** (e.g., `https://conservation-quiz-frontend.onrender.com`)

---

## 🎯 STEP 3: Update CORS Configuration (2 minutes)

### **3.1 Update Backend Environment**
1. Go to: https://render.com/dashboard
2. Click: **conservation-quiz-backend** service
3. Click: **"Environment"**
4. Find: `FRONTEND_URL`
5. Update value to: `https://conservation-quiz-frontend.onrender.com`
6. Click: **"Save"**
7. ⏳ Wait 2-3 minutes for auto-redeploy

---

## ✅ Done! Your App is Live!

```
🌐 Frontend: https://conservation-quiz-frontend.onrender.com
🔧 Backend:  https://conservation-quiz-backend.onrender.com
```

---

## 🧪 Test Your App

1. Visit your **frontend URL**
2. Click **"Start Quiz"**
3. Answer a question
4. Submit your score
5. Check **leaderboard** ✅

---

## 📊 Deployment Timeline

```
Step 1: Deploy Backend     → 5-10 minutes
Step 2: Deploy Frontend    → 5-10 minutes
Step 3: Update CORS        → 2-3 minutes
─────────────────────────────────────────
Total Time: 12-23 minutes
```

---

## ⚠️ Important Notes

### **Free Tier Limitations**
- Services sleep after 15 minutes of inactivity
- First request takes ~30 seconds
- **Upgrade to paid plan ($7/month) for production**

### **Scores Storage**
- Stored in server memory
- Persist while server running
- Reset when server restarts
- Perfect for a quiz app

---

## 🆘 Troubleshooting

### **Backend Build Fails**
1. Check Render logs
2. Verify `backend/package.json` exists
3. Check `backend/server.js` exists
4. Ensure Node version is compatible

### **Frontend Build Fails**
1. Check Render logs
2. Verify `frontend/package.json` exists
3. Check `frontend/public/index.html` exists
4. Ensure build command is correct

### **CORS Errors**
1. Update `FRONTEND_URL` in backend
2. Wait for auto-redeploy
3. Clear browser cache
4. Test in incognito mode

### **Scores Not Saving**
1. Check backend logs
2. Verify API endpoint is correct
3. Check browser console for errors
4. Test API directly with curl

---

## 📞 Support

- **Render Docs**: https://render.com/docs
- **Render Support**: https://render.com/support
- **Express Docs**: https://expressjs.com
- **React Docs**: https://react.dev

---

## 💡 Pro Tips

1. **Monitor Logs**: Check Render dashboard regularly
2. **Test Locally**: Run `npm run dev` before deploying
3. **Share URLs**: Send frontend URL to users
4. **Upgrade Later**: Add paid plan if needed
5. **Backup Data**: Export scores periodically

---

## 📋 Deployment Checklist

- [ ] Deploy backend on Render
- [ ] Copy backend URL
- [ ] Deploy frontend on Render
- [ ] Copy frontend URL
- [ ] Update CORS configuration
- [ ] Test your app
- [ ] Verify scores save
- [ ] Check leaderboard
- [ ] Share with users

---

## 🎯 Features

✅ 120 Real Quiz Questions
✅ 30-Second Timer Per Question
✅ Score Tracking (In-Memory)
✅ Leaderboard Display
✅ Responsive Design
✅ No Database Required
✅ Production Ready

---

## 📊 Project Status

| Component | Status |
|-----------|--------|
| Backend | ✅ Ready |
| Frontend | ✅ Ready |
| Build | ✅ Tested |
| Code | ✅ Pushed |
| Deployment | ✅ Ready |

---

## 🚀 Ready to Deploy?

**Follow the 3 steps above and your app will be live in 12-23 minutes!**

---

## 🎉 You're All Set!

Your Conservation Geography Quiz Platform is ready to deploy on Render!

**No database setup needed. Just deploy and go live!**

---

**Happy deploying! 🚀**

