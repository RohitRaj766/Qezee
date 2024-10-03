import React, { useState } from 'react';
import logout from '../../../../user/assets/images/logout.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../../../actions/index';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateQuiz.scss';

function CreateQuiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.adminauth.admin);

  const arrOptions = ["a", "b", "c", "d"];

  
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], answer: null } 
  ]);

  const [quizTitle, setQuizTitle] = useState(''); 
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [quizStatus, setQuizStatus] = useState('inactive'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

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
    toast.success('New question added successfully!');
  };

  const openDeleteModal = (index) => {
    setQuestionToDelete(index);
    setIsModalOpen(true);
  };

  const deleteQuestion = () => {
    if (questionToDelete !== null) {
      const newQuestions = questions.filter((_, qIndex) => qIndex !== questionToDelete);
      setQuestions(newQuestions);
      toast.success('Question deleted successfully!');
      setQuestionToDelete(null);
    }
    setIsModalOpen(false);
  };

  const handleUpload = () => {
    if (!quizTitle) {
      toast.error('Quiz title is required.');
      return;
    }

    if (!startDateTime || !endDateTime) {
      toast.error('Both start and end times must be set.');
      return;
    }

    const oneHourDifference = new Date(startDateTime.getTime() + 60 * 60 * 1000);
    if (endDateTime < oneHourDifference || endDateTime <= startDateTime) {
      toast.error('Start time must be at least 1 hour before end time.');
      return;
    }

    if (questions.length < 0) {
      toast.error('Provide at least 20 questions to upload the quiz.');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.question) {
        toast.error(`Question ${i + 1} is required.`);
        return;
      }
      if (question.answer === null) {
        toast.error(`Please select an answer for question ${i + 1}.`);
        return;
      }
      for (let j = 0; j < question.options.length; j++) {
        if (!question.options[j]) {
          toast.error(`Option ${j + 1} for question ${i + 1} is required.`);
          return;
        }
      }
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
          correctAnswer: question.answer !== null ? arrOptions[question.answer] : null
      }))
    };

    console.log(createQuizData);
    toast.success('Quiz uploaded successfully!'); 
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
              {q.options.map((option, oIndex) => {
                const letter = String.fromCharCode(65 + oIndex); // Convert index to letter (A, B, C, D)
                return (
                  <div key={oIndex} className="option">
                    <input
                      type="radio"
                      name={`question-${qIndex}`} 
                      checked={q.answer === oIndex}
                      onChange={() => handleAnswerChange(qIndex, oIndex)}
                    />
                    <label>{letter}.</label> {/* Label for the letter */}
                    <input
                      type="text"
                      placeholder={`Option ${letter}`} // Update placeholder to show letter
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>

            <button className="delete-button" onClick={() => openDeleteModal(qIndex)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="add-counter">
        <p>Total Questions: {questions.length}</p>
        <button onClick={addQuestion}>Add</button>
      </div>

      <div className='upload'>
        <button onClick={handleUpload}>Upload</button> 
      </div>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this question?</p>
            <div className="modal-actions">
              <button onClick={deleteQuestion}>Yes, Delete</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateQuiz;
