# 🚀 CONSERVATION GEOGRAPHY QUIZ - DEPLOYMENT GUIDE

## ✅ Ready to Deploy!

Your Conservation Geography Quiz Platform is fully prepared for deployment on Render!

---

## 📋 Quick Start

### **Deploy in 3 Steps (15-20 minutes)**

#### **Step 1: Deploy Backend (5-10 min)**
1. Go to: https://render.com/dashboard
2. Click: "New +" → "Blueprint"
3. Select: NPTEL-Quiz repository
4. Click: "Connect"
5. Wait 5-10 minutes
6. **Copy backend URL**

#### **Step 2: Deploy Frontend (5-10 min)**
1. Go to: https://render.com/dashboard
2. Click: "New +" → "Static Site"
3. Select: NPTEL-Quiz repository
4. Configure:
   - Build Command: `bash build-frontend.sh`
   - Publish Directory: `public`
5. Add Environment Variables:
   - `REACT_APP_API_URL = https://conservation-quiz-backend.onrender.com`
   - `PUBLIC_URL = /`
6. Click: "Create Static Site"
7. Wait 5-10 minutes
8. **Copy frontend URL**

#### **Step 3: Update CORS (2-3 min)**
1. Go to backend service
2. Click: "Environment"
3. Update: `FRONTEND_URL = your-frontend-url`
4. Click: "Save"
5. Wait 2-3 minutes

---

## ✅ Your App is Live!

```
Frontend: https://conservation-quiz-frontend.onrender.com
Backend:  https://conservation-quiz-backend.onrender.com
```

---

## 🧪 Test Your App

1. Visit frontend URL
2. Click "Start Quiz"
3. Answer a question
4. Submit score
5. Check leaderboard ✅

---

## 📊 Project Details

### **Features**
✅ 120 Real NPTEL Quiz Questions
✅ 30-Second Timer Per Question
✅ Score Tracking (In-Memory)
✅ Leaderboard Display
✅ Responsive Design
✅ No Database Required
✅ Production Ready

### **Tech Stack**
- **Frontend**: React 18 + Tailwind CSS
- **Backend**: Express.js + Node.js
- **Storage**: In-Memory (No Database)
- **Deployment**: Render

---

## ⚠️ Important Notes

### **Free Tier**
- Services sleep after 15 minutes of inactivity
- First request takes ~30 seconds
- Upgrade to paid plan ($7/month) for production

### **Scores Storage**
- Stored in server memory
- Persist while server running
- Reset when server restarts
- Perfect for a quiz app

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend build fails | Check Render logs |
| Frontend build fails | Verify build-frontend.sh exists |
| index.html not found | Ensure Publish Directory is `public` |
| CORS errors | Update FRONTEND_URL, wait for redeploy |
| Scores not saving | Check backend logs |

---

## 📁 Key Files

- `render.yaml` - Backend deployment config
- `build-frontend.sh` - Frontend build script
- `public/` - Built frontend files
- `backend/` - Express backend
- `frontend/` - React frontend

---

## 📞 Support

- Render: https://render.com/docs
- Express: https://expressjs.com
- React: https://react.dev

---

## 🎉 You're All Set!

Your app is ready to deploy. Just follow the 3 steps above!

**Happy deploying! 🚀**

