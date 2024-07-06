import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupRequest } from '../../../actions/index';
import OtpVerification from '../../components/modal/OtpVerification';
import validator from 'validator';
import './Signup.scss';
import pagePhoto from '../../assets/images/pagephoto.svg';

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

  const dispatch = useDispatch();
  const signupMessage = useSelector((state) => state.auth.signupMessage);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (signupMessage === "OTP sent to email") {
      setOtpSent(true); // Set otpSent to true when OTP is sent
    } else if (signupMessage) {
      alert(signupMessage); // Show signup message in an alert or toast
    }
  }, [signupMessage]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sanitize email and password
    const sanitizedEmail = validator.trim(userData.email);
    const sanitizedPassword = validator.trim(userData.password);
    const sanitizedConfirmPassword = validator.trim(userData.confirmpassword);

    // Validate email format
    if (!validator.isEmail(sanitizedEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    // Password validation
    if (sanitizedPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    const hasAlphabet = /[A-Za-z]/.test(sanitizedPassword);
    const hasNumber = /\d/.test(sanitizedPassword);

    if (!hasAlphabet || !hasNumber) {
      alert("Password must contain at least one alphabet and one numeric value");
      return;
    }

    if (sanitizedPassword !== sanitizedConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Update userData with sanitized values
    const sanitizedUserData = {
      ...userData,
      email: sanitizedEmail,
      password: sanitizedPassword,
      confirmpassword: sanitizedConfirmPassword,
    };

    dispatch(signupRequest(sanitizedUserData));
    // After dispatching, set otpSent to true to show the OTP verification modal
    setOtpSent(true);
  };

  const handleCloseModal = () => {
    setOtpSent(false); // Close the OTP verification modal
    // Additional logic to handle navigation back to the signup form if needed
  };

  return (
    <div className='main'>
      <div className='boxContainer'>
        <p>Challenge Your Knowledge!</p>
        <div className='formContainer'>
          <form onSubmit={handleSubmit}>
            <div className='smallForm'>
              <input className="smallInputField" type="text" name="firstname" value={userData.firstname} onChange={handleChange} placeholder="First Name*" required />
              <input className="smallInputField" type="text" name="lastname" value={userData.lastname} onChange={handleChange} placeholder="Last Name*" required />
            </div>
            <input className="inputField" type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email*" required />
            <div className="smallForm">
              <input className="smallInputField" type="text" name="course" value={userData.course} onChange={handleChange} placeholder="Course*" required />
              <input className="smallInputField" type="text" name="branch" value={userData.branch} onChange={handleChange} placeholder="Branch*" required />
            </div>
            <input className="inputField" type="text" name="university" value={userData.university} onChange={handleChange} placeholder="University*" required />
            <input className="inputField" type="text" name="college" value={userData.college} onChange={handleChange} placeholder="College*" required />
            <input className="inputField" type="text" name="enrollment" value={userData.enrollment} onChange={handleChange} placeholder="Enrollment*" required />
            <input className="inputField" type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password*" required />
            <input className="inputField" type="password" name="confirmpassword" value={userData.confirmpassword} onChange={handleChange} placeholder="Confirm Password*" required />
          </form>
        </div>
        <button type="submit" onClick={handleSubmit}>Sign up</button>
        {/* {signupMessage && <p>{signupMessage}</p>}
        {error && <p>{error}</p>} */}
      </div>

      <div>
        <img src={pagePhoto} alt="pagePhoto" />
      </div>
      {otpSent && <OtpVerification userEmail={userData.email} onClose={handleCloseModal} />}
    </div>
  );
};

export default Signup;
