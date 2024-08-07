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
          <li>Rule 1: Lorem ipsum dolor sit amet.</li>
          <li>Rule 2: Consectetur adipiscing elit.</li>
          <li>Rule 3: Integer nec odio. Praesent libero.</li>
          <li>Rule 4: Sed cursus ante dapibus diam.</li>
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
