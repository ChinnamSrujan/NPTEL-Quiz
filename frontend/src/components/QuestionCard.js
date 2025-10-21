import React, { useState, useEffect } from 'react';

const QuestionCard = ({ 
  question, 
  onAnswer, 
  selectedAnswer, 
  showResult, 
  isAnswered 
}) => {
  const [animateOptions, setAnimateOptions] = useState(false);

  useEffect(() => {
    setAnimateOptions(true);
    const timer = setTimeout(() => setAnimateOptions(false), 300);
    return () => clearTimeout(timer);
  }, [question.id]);

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    onAnswer(option);
  };

  const getOptionClass = (option) => {
    let baseClass = 'option-button';
    
    if (!showResult) {
      if (selectedAnswer === option) {
        baseClass += ' border-primary-500 bg-primary-50';
      }
      return baseClass;
    }

    // Show results
    if (option === question.answer) {
      baseClass += ' option-correct';
    } else if (selectedAnswer === option && option !== question.answer) {
      baseClass += ' option-incorrect';
    }

    return baseClass;
  };

  return (
    <div className="card p-6 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
            className={`${getOptionClass(option)} ${
              animateOptions ? 'animate-slide-up' : ''
            } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center">
              <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 mr-3">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-left">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {showResult && selectedAnswer && selectedAnswer !== question.answer && (
        <div className="mt-4 p-4 bg-success-50 border border-success-200 rounded-lg">
          <p className="text-sm text-success-800">
            <span className="font-medium">Correct Answer:</span> {question.answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;