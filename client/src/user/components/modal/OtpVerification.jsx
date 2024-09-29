import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { verifyOtpRequest } from '../../../actions';
import { useNavigate } from 'react-router-dom';
import './otpVerification.scss';

const OtpVerification = (props) => {
  const { userEmail, onClose } = props;
  const [userData, setUserData] = useState({
    email: userEmail,
    otp: '',
  });

  const dispatch = useDispatch();
  const otpMSG = useSelector((state) => state.auth.otpMessage);
  const otpERROR = useSelector((state) => state.auth.otpError);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(verifyOtpRequest(userData));
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (otpMSG) {
      navigate('/login');
    }
  }, [otpMSG, navigate]);

  return (
    <div className='modalBackground'>
      <div className='modalContentHolder'>
        <button className='closeButton' onClick={handleClose}>X</button>
        <h1>OTP Verification</h1>
        <p>
          Do not close this modal until you submit the OTP! Please check your email and wait for 2 minutes. If closed by mistake, make sure to fill the form again and request a new OTP.
        </p>
        <div className='inputFields'>
          <input
            className='otpInputField'
            type='email'
            value={userData.email}
            readOnly
          />
          <input
            className='otpInputField'
            type='text'
            name='otp'
            placeholder='Enter OTP'
            value={userData.otp}
            onChange={handleChange}
          />
        </div>
        {otpMSG && <p className='successMessage'>{otpMSG}</p>}
        {otpERROR && <p className='errorMessage'>{otpERROR}</p>}
        <button className='verifyOtp' onClick={handleSubmit}>
          Verify
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
