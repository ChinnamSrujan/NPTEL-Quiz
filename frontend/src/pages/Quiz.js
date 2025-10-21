import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import LoadingSpinner from '../components/LoadingSpinner';
import { shuffleArray } from '../utils/helpers';
import questionsData from '../data/questions.json';

const Quiz = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [quizStartTime] = useState(Date.now());
  const [questionCount, setQuestionCount] = useState(120);

  // Initialize quiz with shuffled questions
  useEffect(() => {
    const initializeQuiz = () => {
      try {
        // Get question count from URL params
        const count = parseInt(searchParams.get('count')) || 120;
        const validCounts = [20, 50, 80, 120];
        const finalCount = validCounts.includes(count) ? count : 120;
        setQuestionCount(finalCount);

        // Shuffle questions for random order and limit to selected count
        const shuffledQuestions = shuffleArray([...questionsData]).slice(0, finalCount);
        setQuestions(shuffledQuestions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        setIsLoading(false);
      }
    };

    initializeQuiz();
  }, [searchParams]);

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = answers[currentQuestion?.id] !== undefined;
  const totalQuestions = questions.length;

  // Handle answer selection
  const handleAnswer = (selectedOption) => {
    if (isAnswered) return;

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedOption
    }));

    setShowResult(true);

    // Auto-advance after 2 seconds
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        handleNext();
      } else {
        finishQuiz();
      }
    }, 2000);
  };

  // Handle time up
  const handleTimeUp = () => {
    if (!isAnswered) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: null // Mark as unanswered
      }));
      setShowResult(true);

      setTimeout(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
          handleNext();
        } else {
          finishQuiz();
        }
      }, 1000);
    }
  };

  // Navigation functions
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      finishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowResult(false);
      setTimeLeft(30);
    }
  };

  // Calculate results and navigate to results page
  const finishQuiz = () => {
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    const timeTaken = Math.round((Date.now() - quizStartTime) / 1000);

    const results = {
      score,
      percentage,
      totalQuestions,
      timeTaken,
      answers,
      questions,
      questionCount
    };

    // Store results in sessionStorage for the results page
    sessionStorage.setItem('quizResults', JSON.stringify(results));
    navigate('/results');
  };

  // Calculate final score
  const calculateScore = () => {
    return questions.reduce((score, question) => {
      const userAnswer = answers[question.id];
      return userAnswer === question.answer ? score + 1 : score;
    }, 0);
  };

  // Handle quit quiz
  const handleQuit = () => {
    if (window.confirm('Are you sure you want to quit the quiz? Your progress will be lost.')) {
      navigate('/');
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="xl" text="Loading quiz questions..." />;
  }

  if (!currentQuestion) {
    return (
      <div className="text-center">
        <p className="text-red-600">Error loading questions. Please try again.</p>
        <button onClick={() => navigate('/')} className="btn-primary mt-4">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {questionCount === 20 && '🚀 Quick Quiz'}
                {questionCount === 50 && '📚 Standard Quiz'}
                {questionCount === 80 && '🎯 Extended Quiz'}
                {questionCount === 120 && '🏆 Complete Quiz'}
              </h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {questionCount} Questions
              </span>
            </div>
            <ProgressBar 
              current={currentQuestionIndex + 1} 
              total={totalQuestions}
            />
          </div>
          <div className="flex-shrink-0 lg:ml-6">
            <Timer
              duration={30}
              key={`${currentQuestion.id}-${timeLeft}`}
              onTimeUp={handleTimeUp}
              isActive={!showResult && !isAnswered}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        selectedAnswer={answers[currentQuestion.id]}
        showResult={showResult}
        isAnswered={isAnswered}
      />

      {/* Navigation Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <div className="flex space-x-3">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === totalQuestions - 1 && !isAnswered}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next →'}
          </button>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleQuit}
            className="btn-danger text-sm px-4 py-2"
          >
            Quit Quiz
          </button>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-6 text-sm text-gray-600">
          <span>
            Answered: {Object.keys(answers).length}/{totalQuestions}
          </span>
          <span>
            Remaining: {totalQuestions - Object.keys(answers).length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Quiz;