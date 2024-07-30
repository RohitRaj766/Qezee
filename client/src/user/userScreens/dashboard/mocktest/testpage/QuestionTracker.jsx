// src/components/QuestionTracker.js

import React from 'react';
import './QuestionTracker.scss';

const QuestionTracker = ({ shuffledQuestions, answers, handleQuestionClick }) => {

  return (
    <div className="question-tracker">
      {[...Array(shuffledQuestions.length)].map((_, i) => (
        <div
          key={i}
          className={`question-number ${
            answers[i] ? 'attempted' : 'not-attempted'
          }`}
          onClick={() => handleQuestionClick(i)}
        >
          {i + 1}
        </div>
      ))}

      <div className="question-info">
        <div className="info-item left">
          <div className="circle attempted"></div>
          <span>attempted</span>
        </div>
        <div className="info-item right">
          <div className="circle not-attempted"></div>
          <span>not-attempted</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionTracker;
