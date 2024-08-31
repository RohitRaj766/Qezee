import { useState } from 'react';
import Testpage from './testpage/Testpage';
import ModalConfirm from '../common/ModalConfirm';
import './Mocktest.scss';

const Mocktest = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isTestStart, setIsTestStart] = useState(false);
  const [flag, setflag] = useState(false);
  

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleStartClick = () => {
    if (isChecked) {
      setflag(true)
    }
  };
  const handleCloseModal = () => {
    setflag(false);
  };

  const handleConfirmTest = () => {
    setflag(false);
    setIsTestStart(true);
    setIsChecked(false)
  };

  return (
    <div className="mocktest-container">
      <div className="rules-box">
        <h2>Basic Rules</h2>
        <ul>
          <li>Rule 1: Select only one answer per question.</li>
          <li>Rule 2: Complete the quiz within the allotted time.</li>
          <li>Rule 3: Answers cannot be changed once submitted.</li>
          <li>Rule 4: Use of external resources are prohibited.</li>
          <li>Rule 5: No limit to attempt this mocktest.</li>
          <li>Rule 6: Maintain honesty and integrity throughout the quiz.</li>
        </ul>
      </div>
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          I agree to the rules
        </label>
      </div>
      <button
        className="start-button"
        onClick={handleStartClick}
        disabled={!isChecked}
      >
        Start
      </button>
      {flag && 
      <ModalConfirm onClose={handleCloseModal}
             heading = "Confirmation"
             content="Are you sure, You want to take MockTest ?"
             handleConfirmTest = {handleConfirmTest}
      />}
      {isTestStart && <Testpage testStarted = {setIsTestStart}/>}
    </div>
  );
};

export default Mocktest;
