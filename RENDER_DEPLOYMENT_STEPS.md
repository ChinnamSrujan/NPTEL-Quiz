# Quick Render Deployment Steps

## 🚀 Deploy in 5 Minutes

### Step 1: Prepare Your Code
```bash
# Make sure everything is committed
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### Step 2: Create MongoDB Atlas Database
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a new project
4. Create a free M0 cluster
5. Create a database user (username & password)
6. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/quiz?retryWrites=true&w=majority`

### Step 3: Deploy Backend
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Fill in:
   - **Name**: `conservation-quiz-backend`
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

5. Click "Advanced" and add Environment Variables:
   ```
   NODE_ENV = production
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/quiz?retryWrites=true&w=majority
   FRONTEND_URL = (leave empty for now, update after frontend deployment)
   ```

6. Click "Create Web Service"
7. Wait 5-10 minutes for deployment
8. Copy your backend URL (e.g., `https://conservation-quiz-backend.onrender.com`)

### Step 4: Update Backend Environment
1. Go to your backend service on Render
2. Click "Environment"
3. Update `FRONTEND_URL` with your frontend URL (you'll get this in next step)

### Step 5: Deploy Frontend
1. Go to https://render.com
2. Click "New +" → "Static Site"
3. Connect your GitHub repo
4. Fill in:
   - **Name**: `conservation-quiz-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`

5. Click "Create Static Site"
6. Wait 5-10 minutes for deployment
7. Copy your frontend URL (e.g., `https://conservation-quiz-frontend.onrender.com`)

### Step 6: Final Configuration
1. Update backend CORS:
   - Go to backend service on Render
   - Click "Environment"
   - Update `FRONTEND_URL` = your frontend URL
   - Service will auto-redeploy

2. Update frontend API URL:
   - In your code, update `frontend/package.json` proxy to backend URL
   - Commit and push
   - Frontend will auto-redeploy

### Step 7: Test Your Deployment
1. Visit your frontend URL
2. Click "Start Quiz"
3. Answer a question and submit
4. Check if score is saved

## 📊 Your Live URLs
- **Frontend**: https://conservation-quiz-frontend.onrender.com
- **Backend**: https://conservation-quiz-backend.onrender.com
- **API Health**: https://conservation-quiz-backend.onrender.com/api/health

## ⚠️ Important Notes

### Free Tier Limitations
- Services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- Upgrade to paid plan for production use

### MongoDB Atlas
- Free tier has 512MB storage
- Sufficient for quiz scores
- Upgrade if needed

### Custom Domain (Optional)
- Render allows custom domains
- Add your domain in service settings
- Update CORS accordingly

## 🔧 Troubleshooting

### Backend not responding
```bash
# Check backend logs on Render dashboard
# Verify MongoDB connection string
# Check environment variables are set
```

### Frontend not connecting to backend
```bash
# Check browser console for errors
# Verify backend URL in frontend
# Check CORS settings
```

### Build fails
```bash
# Check Render build logs
# Ensure all dependencies in package.json
# Verify Node version compatibility
```

## 📈 Monitoring

1. Go to Render dashboard
2. Click your service
3. View real-time logs
4. Monitor CPU and memory usage

## 🎉 Success!

Your Conservation Geography Quiz Platform is now live on Render!

Share your URLs:
- Frontend: https://conservation-quiz-frontend.onrender.com
- Backend API: https://conservation-quiz-backend.onrender.com

## 💡 Next Steps

1. Add custom domain
2. Set up monitoring
3. Enable auto-deploy on GitHub push
4. Consider upgrading to paid plan
5. Add more features (leaderboard, user authentication, etc.)

