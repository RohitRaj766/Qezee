import React from 'react';
import './otpVerification.scss';

const OtpVerification = (props) => {
  const { userEmail, onClose } = props;

  const handleClose = () => {
    onClose(); // Call onClose function passed from props to close the modal and handle navigation
    // You can add additional logic here to navigate back to the signup page if needed
  };

  return (
    <div className='modalBackground'>
      <div className='modalContentHolder'>
        <button className='closeButton' onClick={handleClose}>X</button>
        <h1>OTP Verification</h1>
        <div className='inputFields'>
          <input className="otpInputField" type="email" value={userEmail} readOnly />
          <input className='otpInputField' type="text" placeholder="Enter OTP" />
        </div>
        <button className='verifyOtp'>Verify</button>
      </div>
    </div>
  );
};

export default OtpVerification;
