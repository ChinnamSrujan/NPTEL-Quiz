# 🚀 QUICK DEPLOY GUIDE - 6 MINUTES TO LIVE

## ✅ Code is Ready!

Your code has been pushed to GitHub and is ready to deploy on Render!

---

## 🎯 3-Step Deployment Process

### **STEP 1: Deploy Backend (3 minutes)**

1. Go to: **https://render.com**
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Select your **NPTEL-Quiz** repository
5. Fill in the form:
   ```
   Name: conservation-quiz-backend
   Environment: Node
   Build Command: cd backend && npm install
   Start Command: cd backend && npm start
   Plan: Free
   ```
6. Click **"Advanced"** and add Environment Variables:
   ```
   NODE_ENV = production
   FRONTEND_URL = (leave empty for now)
   ```
7. Click **"Create Web Service"**
8. ⏳ **Wait 3-5 minutes** for deployment
9. 📋 **Copy your backend URL** (e.g., `https://conservation-quiz-backend.onrender.com`)

---

### **STEP 2: Deploy Frontend (3 minutes)**

1. Go to: **https://render.com**
2. Click **"New +"** → **"Static Site"**
3. Select your **NPTEL-Quiz** repository
4. Fill in the form:
   ```
   Name: conservation-quiz-frontend
   Build Command: cd frontend && npm install && npm run build
   Publish Directory: frontend/build
   ```
5. Click **"Create Static Site"**
6. ⏳ **Wait 3-5 minutes** for deployment
7. 📋 **Copy your frontend URL** (e.g., `https://conservation-quiz-frontend.onrender.com`)

---

### **STEP 3: Update CORS (1 minute)**

1. Go back to your **backend service** on Render
2. Click **"Environment"** tab
3. Find the `FRONTEND_URL` variable
4. Update it with your **frontend URL** from Step 2
5. Click **"Save"**
6. ⏳ **Wait 1-2 minutes** for auto-redeploy

---

## ✅ Done! Your App is Live!

### **Your Live URLs:**
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
5. Check if it appears in the **leaderboard** ✅

---

## 📊 What's Included

✅ 120 Real NPTEL Questions
✅ 30-Second Timer Per Question
✅ Score Tracking (in-memory)
✅ Leaderboard Display
✅ Responsive Design
✅ No Database Required
✅ Production Ready

---

## ⚠️ Important Notes

### **Free Tier Limitations**
- Services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- **Upgrade to paid plan ($7/month) for production use**

### **Scores Storage**
- Stored in server memory
- Persist while server is running
- Reset when server restarts
- Perfect for a quiz app

---

## 🆘 Troubleshooting

### **Backend not responding?**
- Check Render logs (Dashboard → Backend Service → Logs)
- Verify backend is deployed successfully
- Check if frontend URL is set in environment variables

### **Frontend not connecting?**
- Check browser console (F12)
- Verify backend URL is correct
- Check CORS settings

### **Scores not saving?**
- Check backend logs
- Test API: `https://your-backend.onrender.com/api/health`
- Verify backend is running

### **Build fails?**
- Check Render build logs
- Verify all dependencies in package.json
- Check Node version compatibility

---

## 📞 Support

- **Render Docs**: https://render.com/docs
- **Express Docs**: https://expressjs.com
- **React Docs**: https://react.dev

---

## 🎯 Success Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Render
- [ ] CORS configured with frontend URL
- [ ] App loads without errors
- [ ] Quiz displays all 120 questions
- [ ] Can answer questions
- [ ] Scores save correctly
- [ ] Leaderboard displays scores
- [ ] Shared with users

---

## 💡 Pro Tips

1. **Monitor Logs** - Check Render dashboard regularly
2. **Test Locally First** - Run `npm run dev` before deploying
3. **Share Your URLs** - Send frontend URL to users
4. **Upgrade When Needed** - Add paid plan for production

---

## 🚀 Ready?

**Follow the 3 steps above and your app will be live in 6 minutes!**

---

**Happy deploying! 🎉**

