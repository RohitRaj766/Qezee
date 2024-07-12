import React, { useState } from 'react';
import './Testpage.scss';
import ModalResult from '../../common/ModalResult';

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter"
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
    correctAnswer: "Harper Lee"
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "HO"],
    correctAnswer: "H2O"
  },
  {
    question: "What is the speed of light?",
    options: ["299,792 km/s", "150,000 km/s", "1,080,000 km/s", "3,00,000 km/s"],
    correctAnswer: "299,792 km/s"
  }
];

const Testpage = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionChange = (option) => {
    setAnswers({
      ...answers,
      [currentQuestion]: option
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
    setIsModalOpen(true);
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      if (answers[index] === question.correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    props.testStarted(false);
  };

  return (
    <div className="testpage">
      <div className="question-container">
        <h2>{questions[currentQuestion].question}</h2>
        {questions[currentQuestion].options.map((option) => (
          <div key={option}>
            <label>
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={answers[currentQuestion] === option}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <button onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </button>
        {currentQuestion === questions.length - 1 ? (
          <button onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <button onClick={handleNext} disabled={!answers[currentQuestion]}>
            Next
          </button>
        )}
      </div>
      {showResult && isModalOpen && (
        <ModalResult
          heading="Result"
          totalscore={`Your score is ${calculateScore()} out of ${questions.length}`}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Testpage;
