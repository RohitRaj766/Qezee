import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { ATTEMPTED_QUIZ_LIST_REQUEST } from '../../../actions/index'; 
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import './Viewboard.scss';

const ViewBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const attemptedQuizzes = useSelector(state => state.auth.attemptedQuizzes);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [quizzesPerPage] = useState(5);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [titleFilter, setTitleFilter] = useState('');

  useEffect(() => {
    dispatch({ type: ATTEMPTED_QUIZ_LIST_REQUEST });
  }, [dispatch]);

  const filteredQuizzes = attemptedQuizzes.filter(quiz => {
    const quizDate = new Date(quiz.date);
    const titleMatch = quiz.title.toLowerCase().includes(titleFilter.toLowerCase());
    return (!startDate || quizDate >= startDate) &&
           (!endDate || quizDate <= endDate) &&
           titleMatch;
  });

  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = filteredQuizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage);

  return (
    <div className="ViewBoardContainer">
      <h1>Quiz Viewboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="no-quizzes-message">Error: {error}</p>}
    
      {/* Filter Section */}
      <div className="filter-section">
        <div className="date-picker">
          <label className="date-heading">Filter By Date</label>
          <div className="date-container">
            <div>
              <label>Start Date:</label>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div>
              <label>End Date:</label>
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>
          </div>
        </div>
    
        <div>
          <label>Filter by Title:</label>
          <input 
            type="text" 
            value={titleFilter} 
            onChange={(e) => setTitleFilter(e.target.value)} 
            placeholder="Enter quiz title"
          />
        </div>
      </div>
  
      <table>
        <thead className="adminTableHeader">
          <tr className="adminTableRow">
            <th>Title</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentQuizzes.map((quiz) => (
            <tr key={quiz.id} className="adminQuiz">
              <td>{quiz.title}</td>
              <td>{new Date(quiz.date).toLocaleDateString()}</td>
              <td>
                <button 
                  onClick={() => navigate('/open-leaderboard', { state: { userAttemptedList: quiz.userAttemptedList } })}
                >
                  Open Leaderboard
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
  
      {filteredQuizzes.length === 0 && <p className="no-quizzes-message">No quizzes found for the selected date range and title.</p>}
    </div>
  );
};

export default ViewBoard;
