import React from 'react';
import { useLocation } from 'react-router-dom';
import './LeaderBoard.scss'

const OpenLeaderboard = () => {
  const location = useLocation();
  const userAttemptedList = location.state?.userAttemptedList || []; // Access the passed state

  // Sort userAttemptedList in descending order based on correctAnswers
  const sortedList = [...userAttemptedList].sort((a, b) => b.correctAnswers - a.correctAnswers);

  console.log("sortedList: ", sortedList)

  return (
    <div>
      <h1>Open Leaderboard</h1>
      {sortedList.length === 0 ? (
        <p>No attempts available.</p>
      ) : (
        <table>
          <thead className='AdminTableHeader'>
            <tr className='AdminTableRow'>
              <th>Name</th>
              <th>Enrollment</th>
              <th>Correct Answers</th>
              <th>Wrong Answers</th>
              <th>Not Attempted</th>
              <th>Total Questions</th>
            </tr>
          </thead>
          <tbody>
            {sortedList.map((attempt) => (
              <tr key={attempt.userId} className='AdminQuiz'>
                <td>{attempt.name}</td>
                <td>{attempt.enrollment}</td>
                <td>{attempt.correctAnswers}</td>
                <td>{attempt.wrongAnswers}</td>
                <td>{attempt.notattempted}</td>
                <td>{attempt.notattempted + attempt.wrongAnswers + attempt.correctAnswers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OpenLeaderboard;
