import React from 'react';
import { useLocation } from 'react-router-dom';

const OpenLeaderboard = () => {
  const location = useLocation();
  const userAttemptedList = location.state?.userAttemptedList || []; // Access the passed state
  console.log("userAttemptedList  ", userAttemptedList)

  return (
    <div>
      <h1>Open Leaderboard</h1>
      {userAttemptedList.length === 0 ? (
        <p>No attempts available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Enrollment</th>
              <th>Correct Answers</th>
              <th>Wrong Answers</th>
              <th>Not Attempted</th>
              <th>Total Questions</th>
            </tr>
          </thead>
          <tbody>
            {userAttemptedList.map((attempt) => (
              <tr key={attempt.userId}>
               {/* You might want to format this to display a username instead */}
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
