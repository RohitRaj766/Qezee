import React, { useState, useEffect } from 'react';
import logout from '../../../../user/assets/images/logout.svg';
import { useDispatch, useSelector } from 'react-redux';
import { createQuizRequest, adminLogoutRequest } from '../../../../actions/index';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateQuiz.scss';

function CreateQuiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.adminauth.error);
  const message = useSelector((state) => state.adminauth.message);
  
  const [questions, setQuestions] = useState([
    { question: '', options: { a: '', b: '', c: '', d: '' }, answer: null }
  ]);

  const [quizTitle, setQuizTitle] = useState(''); 
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [quizStatus, setQuizStatus] = useState('inactive'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }else if(message?.message){
      toast.success(message?.message);
    }
  }, [error,message]);

  const handleLogout = () => {
    dispatch(adminLogoutRequest());
    navigate('/admin/login');
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, optionKey, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optionKey] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, selectedOptionKey) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answer = selectedOptionKey; 
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: { a: '', b: '', c: '', d: '' }, answer: null }]);
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

    if (questions.length < 1) {
      toast.error('Provide at least 1 question to upload the quiz.');
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
      for (const key in question.options) {
        if (!question.options[key]) {
          toast.error(`Option ${key.toUpperCase()} for question ${i + 1} is required.`);
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
        correctAnswer: question.answer
      }))
    };

    dispatch(createQuizRequest(createQuizData));
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
              {Object.entries(q.options).map(([key, value]) => (
                <div key={key} className="option">
                  <input
                    type="radio"
                    name={`question-${qIndex}`} 
                    checked={q.answer === key}
                    onChange={() => handleAnswerChange(qIndex, key)}
                  />
                  <label>{key.toUpperCase()}.</label>
                  <input
                    type="text"
                    placeholder={`Option ${key.toUpperCase()}`} 
                    value={value}
                    onChange={(e) => handleOptionChange(qIndex, key, e.target.value)}
                  />
                </div>
              ))}
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

      <ToastContainer />

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
