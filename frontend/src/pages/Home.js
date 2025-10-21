import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mb-4">
            <span className="text-3xl">🌍</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-shadow">
          Conservation Geography Quiz
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Test your knowledge of conservation geography with our comprehensive quiz featuring 120 carefully curated questions.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Quiz Lengths</h3>
          <p className="text-gray-600 text-sm">
            Choose from 20, 50, 80, or 120 questions based on your available time and goals.
          </p>
        </div>

        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⏱️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Timed Challenge</h3>
          <p className="text-gray-600 text-sm">
            30 seconds per question to test your quick thinking and knowledge recall.
          </p>
        </div>

        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏆</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Leaderboard</h3>
          <p className="text-gray-600 text-sm">
            Track your progress and compete with others on the global leaderboard.
          </p>
        </div>
      </div>

      {/* Quiz Instructions */}
      <div className="card p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quiz Rules</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Choose from 20, 50, 80, or 120 questions in random order
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                30 seconds per question with visual timer
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Navigate freely between questions
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Instant feedback on correct/incorrect answers
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Scoring</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-success-600 mr-2">•</span>
                1 point per correct answer
              </li>
              <li className="flex items-start">
                <span className="text-success-600 mr-2">•</span>
                Final percentage calculated automatically
              </li>
              <li className="flex items-start">
                <span className="text-success-600 mr-2">•</span>
                Results saved to leaderboard
              </li>
              <li className="flex items-start">
                <span className="text-success-600 mr-2">•</span>
                Retake anytime to improve your score
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quiz Options */}
      <div className="card p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Quiz Length</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Link
            to="/quiz?count=20"
            className="group p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-center"
          >
            <div className="text-3xl font-bold text-primary-600 mb-2">20</div>
            <div className="text-sm text-gray-600 mb-2">Questions</div>
            <div className="text-xs text-gray-500">~10 minutes</div>
            <div className="mt-3 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium group-hover:bg-blue-200">
              Quick Quiz
            </div>
          </Link>

          <Link
            to="/quiz?count=50"
            className="group p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-center"
          >
            <div className="text-3xl font-bold text-success-600 mb-2">50</div>
            <div className="text-sm text-gray-600 mb-2">Questions</div>
            <div className="text-xs text-gray-500">~25 minutes</div>
            <div className="mt-3 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium group-hover:bg-green-200">
              Standard Quiz
            </div>
          </Link>

          <Link
            to="/quiz?count=80"
            className="group p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-center"
          >
            <div className="text-3xl font-bold text-orange-600 mb-2">80</div>
            <div className="text-sm text-gray-600 mb-2">Questions</div>
            <div className="text-xs text-gray-500">~40 minutes</div>
            <div className="mt-3 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium group-hover:bg-orange-200">
              Extended Quiz
            </div>
          </Link>

          <Link
            to="/quiz?count=120"
            className="group p-6 border-2 border-primary-300 bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl hover:border-primary-500 hover:from-primary-100 hover:to-purple-100 transition-all duration-200 text-center relative"
          >
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
              FULL
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">120</div>
            <div className="text-sm text-gray-600 mb-2">Questions</div>
            <div className="text-xs text-gray-500">~60 minutes</div>
            <div className="mt-3 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium group-hover:bg-purple-200">
              Complete Quiz
            </div>
          </Link>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            💡 <strong>Tip:</strong> Start with a shorter quiz to get familiar with the format, then try the full 120-question challenge!
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <div className="flex justify-center space-x-4">
          <Link
            to="/leaderboard"
            className="inline-flex items-center px-6 py-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            <span className="mr-2">📊</span>
            View Leaderboard
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-16 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4">
            <div className="text-2xl font-bold text-primary-600">4</div>
            <div className="text-sm text-gray-600">Quiz Options</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-success-600">30s</div>
            <div className="text-sm text-gray-600">Per Question</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-purple-600">∞</div>
            <div className="text-sm text-gray-600">Retakes</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-orange-600">🏆</div>
            <div className="text-sm text-gray-600">Leaderboard</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;