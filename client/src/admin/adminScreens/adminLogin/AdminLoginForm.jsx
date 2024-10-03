import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLoginRequest } from '../../../actions/index';
import './AdminLoginForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../../user/components/loader/Loader';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const AdminLoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.adminauth.error);
  const isAuthenticated = useSelector((state) => state.adminauth.isAuthenticated);
  const isLoading = useSelector((state) => state.adminauth.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin-dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Show error message as a toast
  useEffect(() => {
    if (error) {
      toast.error(error); // Show the error message
    }
  }, [error]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLoginRequest(credentials));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="AdminloginMain">
        <div className="AdminloginBoxContainer">
          <h1>Admin Panel</h1>
          <div className='AdminloginFormContainer'>
            <form>
              <input
                className="AdminloginInputField"
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="User Id"
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
                  placeholder="Password"
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
          <button onClick={handleSubmit} type="button">LOGIN</button>
          {/* <p>Forgot? Click here</p> */}
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer here */}
    </>
  );
};

export default AdminLoginForm;
