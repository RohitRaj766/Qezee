import React, { useState } from 'react';
import logout from '../../../../user/assets/images/logout.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../../../actions/index';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import './CreateQuiz.scss';

function CreateQuiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.adminauth.admin);
  
  // State to manage questions
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], answer: null } // Added answer state
  ]);

  // State for start and end date-time
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  // State for quiz status
  const [isActive, setIsActive] = useState(true); // Default to Active

  const handleLogout = () => {
    dispatch(logoutRequest());
    navigate('/admin-login');
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, selectedOptionIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answer = selectedOptionIndex; // Store the selected answer index
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: null }]);
  };

  // Toggle function for active/inactive state
  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className='container'>
      <div className='nav'>
        <div className='nav-title'>
          <h1>CREATE QUIZ</h1>
        </div>
        <img className='logout' src={logout} alt='' onClick={handleLogout} />
      </div>

      <div className="quiz-details">
        <div className="title-status">
          <input type="text" placeholder='Quiz Title' className='quiz-title' />
        </div>

        <div className="time">
          <div>
            <label>Start Date:</label>
            <DatePicker
              selected={startDateTime}
              onChange={(date) => setStartDateTime(date)}
              showTimeSelect
              dateFormat="Pp" // Formats the date and time
              timeFormat="HH:mm"
            />
          </div>
          <div>
            <label>End Date:</label>
            <DatePicker
              selected={endDateTime}
              onChange={(date) => setEndDateTime(date)}
              showTimeSelect
              dateFormat="Pp" // Formats the date and time
              timeFormat="HH:mm"
            />
          </div>
          <button onClick={toggleActive} className='status'> 
            {isActive ? 'Active' : 'Inactive'}
          </button>
        </div>
      </div>

      <div className="questions-container">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question-container">
            <input
              type="text"
              placeholder={`Question ${qIndex + 1}`} // Updated placeholder to include question number
              className='question'
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            />

            <div className='options'>
              {q.options.map((option, oIndex) => (
                <div key={oIndex} className="option">
                  <input
                    type="radio"
                    name={`question-${qIndex}`} // Group radio buttons by question index
                    checked={q.answer === oIndex} // Check if this option is selected
                    onChange={() => handleAnswerChange(qIndex, oIndex)} // Handle answer selection
                  />
                  <input
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="add-counter">
        <p>Total Questions: {questions.length}</p>
        <button onClick={addQuestion}>Add</button>
      </div>

      <div className='upload'>
        <button>Upload</button>
      </div>
    </div>
  );
}

export default CreateQuiz;
