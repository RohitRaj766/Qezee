import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './LeaderBoard.scss';

const OpenLeaderboard = () => {
  const location = useLocation();
  const userAttemptedList = useMemo(() => {
    return location.state?.userAttemptedList || [];
  }, [location.state]);
  
  const userId = location?.state?.currentUserID || 0;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [userExist, setUserExist] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userRank, setUserRank] = useState(null); 

  const filteredList = userAttemptedList.filter(attempt =>
    attempt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasRequiredParams = location.state?.userAttemptedList && location.state?.currentUserID;

  useEffect(() => {
    const user = userAttemptedList.find(user => user.userId === userId);

    if (user) {
      setUserData(user);
      setUserExist(true);
    } else {
      setUserExist(false);
      setUserData(null);
    }
  }, [userId, userAttemptedList]);

  const sortedList = filteredList.sort((a, b) => b.correctAnswers - a.correctAnswers);

  useEffect(() => {
    if (userData) {
      const rankIndex = sortedList.findIndex(attempt => attempt.userId === userData.userId);
      setUserRank(rankIndex + 1);
    }
  }, [userData, sortedList]);

  const totalPages = Math.ceil(sortedList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="table-container">
      <h1>Open Leaderboard</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSearchTerm('')}>Clear</button>
      </div>
      
     { hasRequiredParams && !userExist &&  <p style={{color:"red"}}>You have not attempted this quiz.</p>}
     {!hasRequiredParams &&  <p style={{color:"red"}}>Please log in for a better personalized experience. Click on rank button form dashboard quizzes tab.</p>}
      
      {sortedList.length === 0 ? (
        <p>No attempts available.</p>
      ) : (
        <table>
          {userExist && userData ? (
                <> 
            <thead className='AdminTableHeader'>
                <tr className='AdminTableRow'>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Enrollment</th>
                  <th>Correct Answers</th>
                  <th>Wrong Answers</th>
                  <th>Not Attempted</th>
                  <th>Total Questions</th>
                </tr>
              </thead>
              <tbody>
                <tr key={userData.userId} className='AdminQuiz' style={{backgroundColor:"rgb(34, 244, 209)"}}>
                  <td>{userRank}</td>
                  <td>{userData.name}</td>
                  <td>{userData.enrollment}</td>
                  <td>{userData.correctAnswers}</td>
                  <td>{userData.wrongAnswers}</td>
                  <td>{userData.notattempted}</td>
                  <td>{userData.notattempted + userData.wrongAnswers + userData.correctAnswers}</td>
                </tr>
              </tbody>
            </>
          ) : (
                ""
              )}
          <thead className='AdminTableHeader'>
           {!userExist && !userData && 
            <>
            <tr className='AdminTableRow'>
              <th>Rank</th>
              <th>Name</th>
              <th>Enrollment</th>
              <th>Correct Answers</th>
              <th>Wrong Answers</th>
              <th>Not Attempted</th>
              <th>Total Questions</th>
            </tr>
            </>
            }
          </thead>
          <tbody>
            {currentItems.map((attempt, index) => (
              <tr key={attempt.userId} className='AdminQuiz'>
                <td>{startIndex + index + 1}</td>
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
      <div className="pagination-controls">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            className="button"
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button 
            className="button"
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenLeaderboard;
