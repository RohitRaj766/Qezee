import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupRequest } from '../../../actions/index';
import OtpVerification from '../../components/modal/OtpVerification';
import './Signup.scss';
import pagePhoto from '../../assets/images/pagephoto.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    course: '',
    branch: '',
    university: '',
    college: '',
    enrollment: '',
    password: '',
    confirmpassword: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [errorValidator, setErrorValidator] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  let signupMessage = useSelector((state) => state.auth.signupMessage);
  const sError = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (signupMessage === "OTP sent to email") {
      setOtpSent(true);
    }
  }, [signupMessage]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setErrorValidator("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let key in userData) {
      if (!userData[key]) {
        setErrorValidator("All fields are required");
        return;
      }
    }

    const sanitizedUserData = {};
    for (let key in userData) {
      sanitizedUserData[key] = userData[key].trim();
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(sanitizedUserData.email)) {
      setErrorValidator("Please enter a valid email address");
      return;
    }

    if (sanitizedUserData.password.length < 6) {
      setErrorValidator("Password must be at least 6 characters long");
      return;
    }

    const hasAlphabet = /[A-Za-z]/.test(sanitizedUserData.password);
    const hasNumber = /\d/.test(sanitizedUserData.password);

    if (!hasAlphabet || !hasNumber) {
      setErrorValidator("Password must contain at least one alphabet and one numeric value");
      return;
    }

    if (sanitizedUserData.password !== sanitizedUserData.confirmpassword) {
      setErrorValidator("Passwords do not match");
      return;
    }

    dispatch(signupRequest(sanitizedUserData));
  };

  const handleCloseModal = () => {
    setOtpSent(false);
    setUserData({
      firstname: '',
      lastname: '',
      email: '',
      course: '',
      branch: '',
      university: '',
      college: '',
      enrollment: '',
      password: '',
      confirmpassword: '',
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className='mainSignup'>
      <div className='boxContainer'>
        <p className='signupheading'>Challenge Your Knowledge!</p>
        <div className='formContainer'>
          <form>
            <div className='smallForm'>
              <input className="smallInputField" type="text" name="firstname" value={userData.firstname} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="First Name*" required />
              <input className="smallInputField" type="text" name="lastname" value={userData.lastname} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Last Name*" required />
            </div>
            <input className="inputField" type="email" name="email" value={userData.email} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Email*" required />
            <div className="smallForm">
              <input className="smallInputField" type="text" name="course" value={userData.course} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Course*" required />
              <input className="smallInputField" type="text" name="branch" value={userData.branch} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Branch*" required />
            </div>
            <input className="inputField" type="text" name="university" value={userData.university} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="University*" required />
            <input className="inputField" type="text" name="college" value={userData.college} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="College*" required />
            <input className="inputField" type="text" name="enrollment" value={userData.enrollment} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Enrollment*" required />
            <div className="passwordField">
              <input
                className="inputField"
                type={showPassword ? "text" : "password"}
                name="password"
                value={userData.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Password*"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={toggleShowPassword}
                className="passwordToggleIcon"
              />
            </div>
            <div className="passwordField">
              <input
                className="inputField"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmpassword"
                value={userData.confirmpassword}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Confirm Password*"
                required
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={toggleShowConfirmPassword}
                className="passwordToggleIcon"
              />
            </div>
          </form>
        </div>
        {signupMessage && <p className='successMessage'>{signupMessage}</p>}
        {errorValidator && <p className='errorMessage'>{errorValidator}</p>}
        {sError && <p className='errorMessage'>{sError}</p>}
        <button onClick={handleSubmit}>SIGN UP</button>
      </div>
      <div>
        <img src={pagePhoto} alt="pagePhoto" />
      </div>
      {otpSent && <OtpVerification userEmail={userData.email} onClose={handleCloseModal} />}
    </div>
  );
};

export default Signup;
