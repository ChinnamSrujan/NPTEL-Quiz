import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveScore } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [userName, setUserName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    // Get results from sessionStorage
    const storedResults = sessionStorage.getItem('quizResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // Redirect to home if no results found
      navigate('/');
    }
  }, [navigate]);

  const handleSaveScore = async (e) => {
    e.preventDefault();
    if (!userName.trim() || isSaving || isSaved) return;

    setIsSaving(true);
    setSaveError('');

    try {
      await saveScore({
        name: userName.trim(),
        score: results.score,
        percentage: results.percentage,
        timeTaken: results.timeTaken,
        totalQuestions: results.totalQuestions
      });
      setIsSaved(true);
    } catch (error) {
      setSaveError('Failed to save score. Please try again.');
      console.error('Error saving score:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return { message: "Outstanding! 🏆", color: "text-yellow-600", bg: "bg-yellow-50" };
    if (percentage >= 80) return { message: "Excellent work! 🌟", color: "text-green-600", bg: "bg-green-50" };
    if (percentage >= 70) return { message: "Good job! 👍", color: "text-blue-600", bg: "bg-blue-50" };
    if (percentage >= 60) return { message: "Not bad! 📚", color: "text-purple-600", bg: "bg-purple-50" };
    return { message: "Keep studying! 💪", color: "text-orange-600", bg: "bg-orange-50" };
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (!results) {
    return <LoadingSpinner size="xl" text="Loading results..." />;
  }

  const performance = getPerformanceMessage(results.percentage);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Results Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mb-4">
          <span className="text-3xl">🎯</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
            {results.totalQuestions === 20 && '🚀 Quick Quiz'}
            {results.totalQuestions === 50 && '📚 Standard Quiz'}
            {results.totalQuestions === 80 && '🎯 Extended Quiz'}
            {results.totalQuestions === 120 && '🏆 Complete Quiz'}
          </span>
          <span className="text-sm text-gray-500">
            {results.totalQuestions} Questions
          </span>
        </div>
        <p className="text-gray-600">Here are your results</p>
      </div>

      {/* Score Card */}
      <div className="card p-8 mb-8">
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-primary-600 mb-2">
            {results.percentage}%
          </div>
          <div className="text-xl text-gray-600 mb-4">
            {results.score} out of {results.totalQuestions} correct
          </div>
          <div className={`inline-block px-4 py-2 rounded-full ${performance.bg} ${performance.color} font-medium`}>
            {performance.message}
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{results.score}</div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{results.totalQuestions - results.score}</div>
            <div className="text-sm text-gray-600">Incorrect Answers</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{formatTime(results.timeTaken)}</div>
            <div className="text-sm text-gray-600">Total Time</div>
          </div>
        </div>

        {/* Save Score Form */}
        {!isSaved ? (
          <form onSubmit={handleSaveScore} className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                Save your score to the leaderboard
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                maxLength={50}
                required
              />
            </div>
            {saveError && (
              <p className="text-danger-600 text-sm mb-4">{saveError}</p>
            )}
            <button
              type="submit"
              disabled={!userName.trim() || isSaving}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Score'}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-success-50 text-success-700 rounded-lg mb-4">
              <span className="mr-2">✅</span>
              Score saved successfully!
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link
          to="/quiz"
          className="btn-primary px-8 py-3"
          onClick={() => sessionStorage.removeItem('quizResults')}
        >
          <span className="mr-2">🔄</span>
          Retake Quiz
        </Link>
        <Link
          to="/leaderboard"
          className="btn-secondary px-8 py-3"
        >
          <span className="mr-2">🏆</span>
          View Leaderboard
        </Link>
        <Link
          to="/"
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          Back to Home
        </Link>
      </div>

      {/* Performance Tips */}
      <div className="mt-12 card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Analysis</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Strengths</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {results.percentage >= 80 && <li>• Excellent overall knowledge</li>}
              {results.percentage >= 70 && <li>• Good understanding of core concepts</li>}
              {results.timeTaken < 2400 && <li>• Efficient time management</li>}
              <li>• Completed all {results.totalQuestions} questions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Areas for Improvement</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {results.percentage < 70 && <li>• Review conservation geography fundamentals</li>}
              {results.percentage < 80 && <li>• Practice more challenging questions</li>}
              {results.timeTaken > 3000 && <li>• Work on answering questions more quickly</li>}
              <li>• Retake the quiz to improve your score</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;