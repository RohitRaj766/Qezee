import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupRequest } from '../../../actions/index';
import './Signup.scss'
import pagePhoto from '../../assets/images/pagephoto.svg';
import header from '../../assets/images/header.svg';

const Signup = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    course: '',
    branch: '',
    university: '',
    college: '',
    enrollment: '',
  });

  const dispatch = useDispatch();
  const signupMessage = useSelector((state) => state.auth.signupMessage);
  const error = useSelector((state) => state.auth.error);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupRequest(userData));
  };

  return (
    <div className='main'>

      <div className='boxContainer'>
        <p>Challenge Your Knowledge!</p>
        {/* <img src={header} alt="" className='headerImage' /> */}
        <div className='formContainer'>
          <form onSubmit={handleSubmit}>
            <div className='smallForm'>
              <input className="smallInputField" type="text" name="firstname" value={userData.firstname} onChange={handleChange} placeholder="First Name" required />
              <input className="smallInputField" type="text" name="lastname" value={userData.lastname} onChange={handleChange} placeholder="Last Name" required />
            </div>
            <input className="inputField" type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
            <input className="inputField" type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" required />
            <div className="smallForm">
              <input className="smallInputField" type="text" name="course" value={userData.course} onChange={handleChange} placeholder="Course" required />
              <input className="smallInputField" type="text" name="branch" value={userData.branch} onChange={handleChange} placeholder="Branch" required />
            </div>
            <input className="inputField" type="text" name="university" value={userData.university} onChange={handleChange} placeholder="University" required />
            <input className="inputField" type="text" name="college" value={userData.college} onChange={handleChange} placeholder="College" required />
            <input className="inputField" type="text" name="enrollment" value={userData.enrollment} onChange={handleChange} placeholder="Enrollment" required />
          </form>
        </div>
        <button type="submit">Signup</button>
        {signupMessage && <p>{signupMessage}</p>}
        {error && <p>{error}</p>}
      </div>

      <div>
        <img src={pagePhoto} alt="pagePhoto" />
      </div>
      
    </div>


  );
};

export default Signup;
