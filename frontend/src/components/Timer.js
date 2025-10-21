import React, { useState, useEffect } from 'react';

const Timer = ({ duration = 30, onTimeUp, isActive = true, onTick }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        
        // Call onTick callback if provided
        if (onTick) {
          onTick(newTime);
        }

        if (newTime <= 0) {
          clearInterval(timer);
          if (onTimeUp) {
            onTimeUp();
          }
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp, onTick]);

  const percentage = (timeLeft / duration) * 100;
  const isLowTime = timeLeft <= 10;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Time Remaining</span>
        <span className={`text-lg font-bold ${isLowTime ? 'text-danger-600' : 'text-gray-900'}`}>
          {timeLeft}s
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ease-linear ${
            isLowTime ? 'bg-danger-500' : 'bg-primary-600'
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {isLowTime && (
        <p className="text-xs text-danger-600 mt-1 animate-pulse">
          ⚠️ Time running out!
        </p>
      )}
    </div>
  );
};

export default Timer;