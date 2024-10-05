import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../../user/components/header/Header';
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
  const [originalRank, setOriginalRank] = useState(null);

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

  const sortedList = [...userAttemptedList].sort((a, b) => b.correctAnswers - a.correctAnswers);
  const filteredList = sortedList.filter(attempt =>
    attempt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (userData) {
      const rankIndex = sortedList.findIndex(attempt => attempt.userId === userData.userId);
      setOriginalRank(rankIndex + 1);
    }
  }, [userData, sortedList]);

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
    {!hasRequiredParams && <Header/>}
    
    <div className="table-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        <button style={{width:'110px', height:'35px'}} onClick={() => setSearchTerm('')}>Clear</button>
      </div>
      
      {hasRequiredParams && !userExist && <p style={{color:"red"}}>You have not attempted this quiz.</p>}
      {!hasRequiredParams && <p style={{color:"red"}}>Please log in for a better personalized experience. Click on rank button from dashboard quizzes tab.</p>}
      
      {filteredList.length === 0 ? (
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
                  <td>{originalRank}</td>
                  <td>{userData.name}</td>
                  <td>{userData.enrollment}</td>
                  <td>{userData.correctAnswers}</td>
                  <td>{userData.wrongAnswers}</td>
                  <td>{userData.notattempted}</td>
                  <td>{userData.notattempted + userData.wrongAnswers + userData.correctAnswers}</td>
                </tr>
              </tbody>
            </>
          ) : null}
          <thead className='AdminTableHeader'>
            {hasRequiredParams && !userExist &&
            <tr className='AdminTableRow'>
              <th>Rank</th>
              <th>Name</th>
              <th>Enrollment</th>
              <th>Correct Answers</th>
              <th>Wrong Answers</th>
              <th>Not Attempted</th>
              <th>Total Questions</th>
            </tr>
            }
          </thead>
          <tbody>
            {currentItems.map((attempt, index) => (
              <tr key={attempt.userId} className='AdminQuiz'>
                <td>{sortedList.findIndex(u => u.userId === attempt.userId) + 1}</td>
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
          <p style={{
            width: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
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
            </>
  );
};

export default OpenLeaderboard;
