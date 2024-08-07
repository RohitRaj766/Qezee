import React, { useState, useEffect } from "react";
import QuestionTracker from "./QuestionTracker";
// import ModalResult from "../../common/ModalResult";
// import ModalConfirm from "../../common/ModalConfirm";
import "./QuizSection.scss"; 

const QuizSection = ({
  shuffledQuestions,
  currentQuestion,
  setCurrentQuestion,
  answers,
  setAnswers,
  setShowResult,
  setIsModalOpen,
  handleQuestionClick,
  handleSubmit
}) => {
    const [timeLeft, setTimeLeft] = useState(600);
  const optionLabels = ["a", "b", "c", "d"];

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleOptionChange = (option) => {
    setAnswers({
      ...answers,
      [currentQuestion]: option,
    });
  };

  const clearSelection = () => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      delete updatedAnswers[currentQuestion];
      return updatedAnswers;
    });
  };
    //Timer
    useEffect(() => {
        if (timeLeft > 0) {
          const timerId = setInterval(() => {
            setTimeLeft((prevTime) => {
              if (prevTime <= 1) {
                clearInterval(timerId);
                setShowResult(true);
                setIsModalOpen(true);
                return 0;
              }
              return prevTime - 1;
            });
          }, 1000);
          return () => clearInterval(timerId);
        }
      }, [timeLeft]);
    
      const timeFormat = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
    
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(secs).padStart(2, "0")}`;
      };

  return (
    <div className="quiz-section">
      <div className="quiz">
        <p className="timer">Timer : {timeFormat(timeLeft)}</p>

        <div className="question-container">
          <h2>{`Q${currentQuestion + 1}) ${
            shuffledQuestions[currentQuestion].question
          }`}</h2>
        {Object.entries(shuffledQuestions[currentQuestion].options).map(([key, value], index) => (
            <div key={key}>
              <label className="custom-radio">
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={key}
                  checked={answers[currentQuestion] === key}
                  onChange={() => handleOptionChange(key)}
                />
                <span className="custom-radio__label">{`${optionLabels[index]}) ${value}`}</span>
              </label>
            </div>
          ))}
          {answers[currentQuestion] && (
            <button
              className={`btn-clearSelection ${
                answers[currentQuestion] ? "visible" : ""
              }`}
              onClick={clearSelection}
            >
              Clear Selection
            </button>
          )}
        </div>

        <div className="buttons-container">
          <div className="top">
            <button onClick={handlePrevious} disabled={currentQuestion === 0}>
              Prev Ques
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestion === shuffledQuestions.length - 1}
            >
              Next Ques
            </button>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      <QuestionTracker
        shuffledQuestions={shuffledQuestions}
        answers={answers}
        handleQuestionClick={handleQuestionClick}
      />
    </div>
  );
};

export default QuizSection;
