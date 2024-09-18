import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../../../actions/index';
import './AdminLoginForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AdminLoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard/overview');
    }
  }, [isAuthenticated, navigate]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="AdminloginMain">
      <div className="AdminloginBoxContainer">
        <h1>Admin Panel</h1>
        <div className='AdminloginFormContainer'>
          <form>
            <input
              className="AdminloginInputField"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="User Id*"
              required
            />
            <div className="AdminpasswordField">
              <input
                className="AdminloginInputField"
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Password*"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={toggleShowPassword}
                className='Adminshowpassword'
              />
            </div>
          </form>
        </div>
        {error && <p className='errorMessage'>{error}</p>}
        <button onClick={handleSubmit} type="button">LOGIN</button>
        <p>Forgot? Click here</p>
      </div>
    </div>
  );
};

export default AdminLoginForm;