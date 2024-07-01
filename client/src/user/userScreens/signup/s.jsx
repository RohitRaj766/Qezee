import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupRequest } from '../../../actions/index';

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
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstname" value={userData.firstname} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="lastname" value={userData.lastname} onChange={handleChange} placeholder="Last Name" required />
        <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" required />
        <input type="text" name="course" value={userData.course} onChange={handleChange} placeholder="Course" required />
        <input type="text" name="branch" value={userData.branch} onChange={handleChange} placeholder="Branch" required />
        <input type="text" name="university" value={userData.university} onChange={handleChange} placeholder="University" required />
        <input type="text" name="college" value={userData.college} onChange={handleChange} placeholder="College" required />
        <input type="text" name="enrollment" value={userData.enrollment} onChange={handleChange} placeholder="Enrollment" required />
        <button type="submit">Signup</button>
      </form>
      {signupMessage && <p>{signupMessage}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
