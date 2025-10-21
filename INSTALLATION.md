# Conservation Geography Quiz Platform - Installation Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas account) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** (optional, for version control) - [Download here](https://git-scm.com/)

## 🚀 Quick Start

### 1. Extract Questions from PDF

First, you need to extract the 120 questions from your PDF file:

1. Open `CG_Assignment 1_merged.pdf`
2. Select all text (Ctrl+A) and copy (Ctrl+C)
3. Create a new file called `pdf-content.txt` in the project root
4. Paste the content and save the file
5. Run the extraction script:
   ```bash
   node extract-questions.js
   ```

### 2. Automated Setup

Run the setup script to install all dependencies:

```bash
node setup.js
```

This will:
- Install root dependencies
- Install backend dependencies
- Install frontend dependencies
- Check project structure
- Provide next steps

### 3. Manual Setup (Alternative)

If you prefer manual setup:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS (with Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `backend/.env` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/conservation-quiz
   ```

### 5. Environment Configuration

Ensure these files exist with correct values:

**backend/.env:**
```
MONGODB_URI=mongodb://localhost:27017/conservation-quiz
PORT=5000
NODE_ENV=development
```

**frontend/.env:**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Conservation Geography Quiz Platform
REACT_APP_VERSION=1.0.0
```

## 🏃‍♂️ Running the Application

### Start Both Frontend and Backend
```bash
npm run dev
```

This starts:
- Backend server on http://localhost:5000
- Frontend application on http://localhost:3000

### Start Services Separately

**Backend only:**
```bash
npm run server
# or
cd backend && npm run dev
```

**Frontend only:**
```bash
npm run client
# or
cd frontend && npm start
```

## 🧪 Testing the Application

1. Open your browser and go to http://localhost:3000
2. You should see the Conservation Geography Quiz homepage
3. Click "Start Quiz" to begin
4. Test the quiz functionality:
   - Answer questions
   - Check timer functionality
   - Navigate between questions
   - Complete the quiz and save your score
5. Check the leaderboard to see saved scores

## 📊 API Endpoints

The backend provides these endpoints:

- `GET /api/health` - Health check
- `POST /api/scores` - Save quiz results
- `GET /api/scores` - Get all scores with pagination
- `GET /api/scores/leaderboard` - Get top 10 scores
- `DELETE /api/scores/:id` - Delete a score

## 🔧 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running. Check the service status and start if needed.

**2. Port Already in Use**
```
Error: listen EADDRINUSE :::5000
```
**Solution:** Kill the process using the port or change the port in `backend/.env`.

**3. Questions Not Loading**
```
Error loading questions
```
**Solution:** Ensure `frontend/src/data/questions.json` exists and contains valid JSON.

**4. CORS Errors**
**Solution:** Ensure the backend CORS configuration includes your frontend URL.

### Checking Logs

**Backend logs:**
```bash
cd backend
npm run dev
```

**Frontend logs:**
Check the browser console (F12) for any JavaScript errors.

### Database Issues

**Check MongoDB connection:**
```bash
# Connect to MongoDB shell
mongo
# or for newer versions
mongosh

# List databases
show dbs

# Use your database
use conservation-quiz

# Check collections
show collections
```

## 📱 Production Deployment

### Backend Deployment (Heroku example)

1. Create a Heroku app
2. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set NODE_ENV=production
   ```
3. Deploy:
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Frontend Deployment (Netlify example)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `build` folder to Netlify
3. Set environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
   ```

## 🔄 Updating Questions

To update the quiz questions:

1. Modify `questions.json` in the project root
2. Copy the updated file to `frontend/src/data/questions.json`
3. Restart the frontend application

## 📞 Support

If you encounter any issues:

1. Check this troubleshooting guide
2. Verify all prerequisites are installed
3. Ensure all environment variables are set correctly
4. Check that MongoDB is running and accessible
5. Review the console logs for specific error messages

## 🎯 Next Steps

After successful installation:

1. **Add All 120 Questions:** Extract and format all questions from your PDF
2. **Customize Styling:** Modify Tailwind CSS classes to match your preferences
3. **Add Features:** Consider adding user authentication, question categories, or difficulty levels
4. **Deploy:** Deploy to production for public access
5. **Monitor:** Set up logging and monitoring for production use

Happy quizzing! 🌍📚