import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ATTEMPTED_QUIZ_LIST_REQUEST } from '../../../actions/index'; // Adjust according to your structure
import DatePicker from 'react-datepicker'; // Import date picker
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for date picker

const ViewBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const attemptedQuizzes = useSelector(state => state.auth.attemptedQuizzes);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [quizzesPerPage] = useState(5);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [titleFilter, setTitleFilter] = useState(''); // State for title filter

  useEffect(() => {
    dispatch({ type: ATTEMPTED_QUIZ_LIST_REQUEST });
  }, [dispatch]);

  // Filter quizzes by date and title
  const filteredQuizzes = attemptedQuizzes.filter(quiz => {
    const quizDate = new Date(quiz.date);
    const titleMatch = quiz.title.toLowerCase().includes(titleFilter.toLowerCase());
    return (!startDate || quizDate >= startDate) && 
           (!endDate || quizDate <= endDate) && 
           titleMatch; // Include title filtering
  });

  // Pagination logic
  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = filteredQuizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage);

  return (
    <div>
      <h1>Leaderboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div>
        <label>Filter By Date</label><br />
        <label>Start Date:</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        
        <label>End Date:</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
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

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Score</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentQuizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td>{quiz.title}</td>
              <td>{quiz.score}</td>
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

      {/* Pagination Controls */}
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {filteredQuizzes.length === 0 && <p>No quizzes found for the selected date range and title.</p>}
    </div>
  );
};

export default ViewBoard;
