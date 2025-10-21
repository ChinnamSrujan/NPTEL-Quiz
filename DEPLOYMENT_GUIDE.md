# Deployment Guide - Render

This guide will help you deploy the Conservation Geography Quiz Platform to Render.

## Prerequisites

1. **GitHub Account** - Push your code to GitHub
2. **Render Account** - Sign up at https://render.com
3. **MongoDB Atlas Account** - Create a free MongoDB cluster at https://www.mongodb.com/cloud/atlas

## Step 1: Prepare MongoDB

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account or sign in
3. Create a new project
4. Create a new cluster (M0 Free tier)
5. Create a database user with username and password
6. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`)
7. Copy this connection string - you'll need it later

## Step 2: Push Code to GitHub

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Conservation Geography Quiz Platform"
   ```

2. Create a new repository on GitHub

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

## Step 3: Deploy Backend on Render

1. Go to https://render.com and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Fill in the details:
   - **Name**: `conservation-quiz-backend`
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free (or paid if you want better performance)

5. Add Environment Variables:
   - Click "Advanced" → "Add Environment Variable"
   - Add these variables:
     ```
     NODE_ENV = production
     MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
     FRONTEND_URL = https://your-frontend-url.onrender.com
     ```

6. Click "Create Web Service"
7. Wait for deployment to complete (5-10 minutes)
8. Copy your backend URL (e.g., `https://conservation-quiz-backend.onrender.com`)

## Step 4: Update Frontend Configuration

1. Update `frontend/package.json` proxy:
   ```json
   "proxy": "https://conservation-quiz-backend.onrender.com"
   ```

2. Create `.env.production` in frontend folder:
   ```
   REACT_APP_API_URL=https://conservation-quiz-backend.onrender.com
   ```

3. Commit and push changes:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

## Step 5: Deploy Frontend on Render

1. Go to https://render.com
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Fill in the details:
   - **Name**: `conservation-quiz-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`

5. Click "Create Static Site"
6. Wait for deployment (5-10 minutes)
7. Your frontend URL will be displayed (e.g., `https://conservation-quiz-frontend.onrender.com`)

## Step 6: Update Backend CORS

1. Update `backend/server.js` CORS configuration:
   ```javascript
   app.use(cors({
     origin: process.env.NODE_ENV === 'production' 
       ? ['https://conservation-quiz-frontend.onrender.com'] 
       : ['http://localhost:3000'],
     credentials: true
   }));
   ```

2. Commit and push:
   ```bash
   git add .
   git commit -m "Update CORS for production"
   git push
   ```

3. Render will automatically redeploy

## Step 7: Verify Deployment

1. Visit your frontend URL: `https://conservation-quiz-frontend.onrender.com`
2. Click "Start Quiz" to test
3. Check the browser console for any errors
4. Test the score submission

## Troubleshooting

### Backend not connecting to MongoDB
- Verify MongoDB connection string is correct
- Check MongoDB Atlas IP whitelist (allow all IPs: 0.0.0.0/0)
- Check environment variables are set correctly

### Frontend not connecting to backend
- Verify backend URL in frontend environment variables
- Check CORS settings in backend
- Check browser console for errors

### Build fails
- Check Node version compatibility
- Ensure all dependencies are listed in package.json
- Check for any build errors in Render logs

### Free tier limitations
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30 seconds
- Upgrade to paid plan for better performance

## Monitoring

1. Go to Render dashboard
2. Click on your service
3. View logs in real-time
4. Monitor resource usage

## Next Steps

- Set up custom domain (optional)
- Enable auto-deploy on GitHub push
- Set up monitoring and alerts
- Consider upgrading to paid plan for production use

## Support

For issues, check:
- Render documentation: https://render.com/docs
- MongoDB Atlas documentation: https://docs.atlas.mongodb.com
- GitHub Actions for CI/CD setup

