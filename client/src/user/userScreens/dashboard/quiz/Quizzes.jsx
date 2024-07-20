import React from 'react'
import './Quizzes.scss'

const quizzes = [
  { title: 'C-Programming', date: '12/2/24', startTime: '5:00pm', expiryTime: '6:00pm' },
  { title: 'Java Basics', date: '13/2/24', startTime: '6:00pm', expiryTime: '7:00pm' },
  { title: 'Python Fundamentals', date: '14/2/24', startTime: '7:00pm', expiryTime: '8:00pm' },
  { title: 'Web Development', date: '15/2/24', startTime: '8:00pm', expiryTime: '9:00pm' },
  { title: 'Data Structures', date: '16/2/24', startTime: '9:00pm', expiryTime: '10:00pm' },
  { title: 'Algorithms', date: '17/2/24', startTime: '10:00am', expiryTime: '11:00am' },
  { title: 'Databases', date: '18/2/24', startTime: '11:00am', expiryTime: '12:00pm' },
  { title: 'Networking', date: '19/2/24', startTime: '12:00pm', expiryTime: '1:00pm' },
  { title: 'Machine Learning', date: '20/2/24', startTime: '1:00pm', expiryTime: '2:00pm' },
  { title: 'Artificial Intelligence', date: '21/2/24', startTime: '2:00pm', expiryTime: '3:00pm' }
];

const QuizList = () => {
  return (
    <div className="quizContainer">
      <h1>QUIZZES</h1>
      <div className="quizWrapper">
        <div className="liveQuizContainer">
          <h2>Live Quizzes</h2>
          <div className="liveQuizList">
          <table>
            <thead className='tableHeader'>
              <tr className='tableRow'>
                <th>Name</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>Expiry Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.slice(3).map((quiz, index) => (
                <tr key={index} className='quiz'>
                  <td>{quiz.title}</td>
                  <td>{quiz.date}</td>
                  <td>{quiz.startTime}</td>
                  <td>{quiz.expiryTime}</td>
                  <td><button>Start</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <div className="divider"></div>

        <div className="prevQuizContainer">
          <h2>Previous Quizzes</h2>
          <div className="prevQuizList">
          <table>
            <thead className='tableHeader'>
              <tr className='tableRow'>
                <th>Name</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>Expiry Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.slice(3).map((quiz, index) => (
                <tr key={index} className='quiz'>
                  <td>{quiz.title}</td>
                  <td>{quiz.date}</td>
                  <td>{quiz.startTime}</td>
                  <td>{quiz.expiryTime}</td>
                  <td><span>Expired</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizList


