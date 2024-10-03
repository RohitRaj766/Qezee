import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './LeaderBoard.scss';

const OpenLeaderboard = () => {
  const location = useLocation();
  const userAttemptedList = location.state?.userAttemptedList || [];
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredList = userAttemptedList.filter(attempt =>
    attempt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedList = filteredList.sort((a, b) => b.correctAnswers - a.correctAnswers);

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
      {sortedList.length === 0 ? (
        <p>No attempts available.</p>
      ) : (
        <table>
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
        <div style={{ display: 'flex', alignItems: 'center', }}>
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
