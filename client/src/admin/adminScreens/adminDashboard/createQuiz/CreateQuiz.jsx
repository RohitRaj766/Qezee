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
  
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], answer: null } 
  ]);

  const [quizTitle, setQuizTitle] = useState(''); 
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [quizStatus, setQuizStatus] = useState('active'); 
  const [errorMessage, setErrorMessage] = useState('');

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
    newQuestions[qIndex].answer = selectedOptionIndex; 
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: null }]);
  };

  const handleUpload = () => {
 
    if (!startDateTime || !endDateTime) {
      setErrorMessage('Both start and end times must be set.');
      return;
    }

    const oneHourDifference = new Date(startDateTime.getTime() + 60 * 60 * 1000);
    if (endDateTime < oneHourDifference || endDateTime <= startDateTime) {
      setErrorMessage('Start time must be at least 1 hour before end time.');
      return;
    }

    const createQuizData = {
      title: quizTitle,
      date: startDateTime,
      startTime: startDateTime,
      expireTime: endDateTime,
      quizStatus: quizStatus, 
      questions: questions.map(question => ({
          question: question.question,
          options: question.options,
          correctAnswer: question.answer 
      }))
    };

    console.log(createQuizData);
    setErrorMessage(''); 
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
          <input 
            type="text" 
            placeholder='Quiz Title' 
            className='quiz-title' 
            value={quizTitle} 
            onChange={(e) => setQuizTitle(e.target.value)} 
          />
        </div>

        <div className="time">
          <div>
            <label>Start Date:</label>
            <DatePicker
              selected={startDateTime}
              onChange={(date) => {
                setStartDateTime(date);
                if (date) {
                  setEndDateTime(new Date(date.getTime() + 60 * 60 * 1000));
                }
              }}
              showTimeSelect
              dateFormat="Pp" 
              timeFormat="HH:mm"
            />
          </div>
          <div>
            <label>End Date:</label>
            <DatePicker
              selected={endDateTime}
              onChange={(date) => setEndDateTime(date)}
              showTimeSelect
              dateFormat="Pp" 
              timeFormat="HH:mm"
            />
          </div>
          <div>
            <label>Status:</label>
            <select value={quizStatus} onChange={(e) => setQuizStatus(e.target.value)} className='status-dropdown'>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="questions-container">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question-container">
            <input
              type="text"
              placeholder={`Question ${qIndex + 1}`} 
              className='question'
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            />

            <div className='options'>
              {q.options.map((option, oIndex) => (
                <div key={oIndex} className="option">
                  <input
                    type="radio"
                    name={`question-${qIndex}`} 
                    checked={q.answer === oIndex}
                    onChange={() => handleAnswerChange(qIndex, oIndex)}
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
        {errorMessage && <p className="error-message">{errorMessage}</p>} 
        <button onClick={handleUpload}>Upload</button> 
      </div>
    </div>
  );
}

export default CreateQuiz;
