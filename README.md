# Conservation Geography Quiz Platform

A complete MERN stack application for conducting Conservation Geography quizzes with 120 multiple-choice questions.

## Features

- 🎯 120 Conservation Geography questions
- ⏱️ 30-second timer per question
- 🔀 Randomized question order
- 📊 Real-time score tracking
- 💾 MongoDB integration for score storage
- 📱 Responsive design with Tailwind CSS
- ✅ Instant feedback with correct/incorrect highlighting

## Project Structure

```
conservation-geography-quiz-platform/
├── backend/                 # Node.js + Express.js API
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── config/             # Database configuration
│   └── server.js           # Main server file
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── data/           # Questions data
│   └── public/
└── questions.json          # Quiz questions data
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Quick Start

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd conservation-geography-quiz-platform
npm run install-deps
```

2. **Setup MongoDB:**
   - Install MongoDB locally or create a MongoDB Atlas account
   - Update the connection string in `backend/config/database.js`

3. **Environment Variables:**
   Create `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/conservation-quiz
PORT=5000
NODE_ENV=development
```

4. **Start the application:**
```bash
npm run dev
```

This will start both the backend server (port 5000) and React frontend (port 3000).

## API Endpoints

- `POST /api/scores` - Save quiz results
- `GET /api/scores` - Retrieve all scores
- `GET /api/questions` - Get all questions (optional)

## Usage

1. Open http://localhost:3000 in your browser
2. Click "Start Quiz" to begin
3. Answer questions within the 30-second timer
4. Navigate using Next/Previous buttons
5. View results and save your score
6. Retake the quiz anytime

## Technologies Used

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **Development:** Concurrently for running both servers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request