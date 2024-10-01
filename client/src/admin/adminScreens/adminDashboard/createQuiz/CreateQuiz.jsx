import React from 'react'
import logout from '../../../../user/assets/images/logout.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../../../actions/index';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import './CreateQuiz.scss'

function CreateQuiz() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state)=>state.adminauth.admin)

  const handleLogout = () => {
    dispatch(logoutRequest());
    navigate('/admin-login');
  };

  return (
    <div>

    <div className='nav'>
      <div className='nav-title'>
        <h1>CREATE QUIZ</h1>
      </div>
      <img className='logout' src={logout} alt='' onClick={handleLogout} />
    </div>

    <div className="quiz-details">

      <div className="title-status">
        <input type="text" placeholder='Quiz Title' />
        <button>Active </button>  {/* Add a toggle thing which shows active by default and when clicked changes to inactive */}
      </div>
      
      <div className="time">
        <div>
          <label>Start Date:</label>
          <DatePicker/>
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker/>
        </div>

      </div>

    </div>

    <div className="questions-container">

      <input type="text" placeholder='Question'/>

      <div className='options'>

        <div className='options1'>
          <input type="text" placeholder='option 1'/>
          <input type="text" placeholder='option 3'/>
        </div>

        <div className="options2">
          <input type="text" placeholder='option 2'/>
          <input type="text" placeholder='option 4'/>
        </div>
        
      </div>
    </div>

    <div className="add-counter">
      <p>Total Questions: 1</p>
      <button>Add</button>
    </div>

    <div className='upload'>
      <button>Upload</button>
    </div>

    </div>
  )
}

export default CreateQuiz