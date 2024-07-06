import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../../../actions/index';
import './Login.scss';
import pagePhoto from '../../assets/images/pagephoto.svg';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(credentials));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="loginMain">
      <div className="loginBoxContainer">
        <h1>Back in the Game! Let's Quiz!</h1>
        <div className='loginFormContainer'>
          <form>
            <input className="loginInputField" type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Email*" required />
            <input className="loginInputField" type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password*" required />
          </form>
        </div>
        <button onClick={handleSubmit} type="submit">Login</button>
        <p>forgot ? <a href="#">click here</a></p>
        {error && <p>{error}</p>}
      </div>
      <div className='backgroundImage'>
        <img src={pagePhoto} alt="" />
      </div>
    </div>
  );
};

export default Login;

