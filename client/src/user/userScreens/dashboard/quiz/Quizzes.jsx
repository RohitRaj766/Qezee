import React from 'react'
import './Quizzes.scss'

const quizzes = [
  { title: 'C-Programming', date: '12/2/24', time: '5:00pm' },
  { title: 'Java Basics', date: '13/2/24', time: '6:00pm' },
  { title: 'Python Fundamentals', date: '14/2/24', time: '7:00pm' },
  { title: 'Web Development', date: '15/2/24', time: '8:00pm' },
  { title: 'Data Structures', date: '16/2/24', time: '9:00pm' },
  { title: 'Algorithms', date: '17/2/24', time: '10:00am' },
  { title: 'Databases', date: '18/2/24', time: '11:00am' },
  { title: 'Networking', date: '19/2/24', time: '12:00pm' },
  { title: 'Machine Learning', date: '20/2/24', time: '1:00pm' },
  { title: 'Artificial Intelligence', date: '21/2/24', time: '2:00pm' }
];

const QuizList = () => {
  return (
    <div className="quizContainer">
      <h1>QUIZZES</h1>
      <div className="quizWrapper">
        <div className="liveQuizContainer">
          <h2>Live Quizzes</h2>
          <div className="liveQuizList">
            {quizzes.map((quiz, index) => (
              <div className="quiz" key={index}>
                <p>{quiz.title}</p>
                <p>Date: {quiz.date}</p>
                <p>Time: {quiz.time}</p>
                <button>START</button>
              </div>
            ))}
          </div>
        </div>
        <div className="divider"></div>
        <div className="prevQuizContainer">
          <h2>Previous Quizzes</h2>
          <div className="prevQuizList">
            {quizzes.map((quiz, index) => (
              <div className="quiz" key={index}>
                <p>{quiz.title}</p>
                <p>Date: {quiz.date}</p>
                <p>Time: {quiz.time}</p>
                <span>Expired</span> {/* Replace button with text */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizList
