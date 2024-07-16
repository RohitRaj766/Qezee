import React, { useState } from 'react';
import './Edit.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import male from '../../../assets/images/male.svg';
import female from '../../../assets/images/female.svg';
import other from '../../../assets/images/other.svg';

const Edit = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [gender, setGender] = useState('');

  const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className="editMain">
      <h1>EDIT PROFILE</h1>
      <div className="editMainContainer">
        <div className="updateContainer">
          <div className="updateform">
            <form>
              <div className="smallForm">
                <input className="smallInputField" type="text" name="firstname" placeholder="First Name*" required />
                <input className="smallInputField" type="text" name="lastname" placeholder="Last Name*" required />
              </div>

              <div className="genderField">
                <label>
                  <input
                    type="radio"
                    value="male"
                    checked={gender === 'male'}
                    onChange={handleGenderChange}
                  />
                  <img src={male} alt="Male" className='maleIcon' />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="female"
                    checked={gender === 'female'}
                    onChange={handleGenderChange}
                  />
                  <img src={female} alt="Female" />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    value="other"
                    checked={gender === 'other'}
                    onChange={handleGenderChange}
                  />
                  <img src={other} alt="Other" />
                  Other
                </label>
              </div>
              <div className="smallForm">
                <input className="smallInputField" type="text" name="course" placeholder="Course*" required />
                <input className="smallInputField" type="text" name="branch" placeholder="Branch*" required />
              </div>
              <input className="inputField" type="text" name="university" placeholder="University*" required />
              <input className="inputField" type="text" name="college" placeholder="College*" required />
              <input className="inputField" type="text" name="enrollment" placeholder="Enrollment*" required />
            </form>
          </div>
          <button>UPDATE</button>
        </div>

        <div className="changeContainer">
          <div className="changeform">
            <form>
              <div className="passwordField">
                <input
                  className="inputField"
                  type={showOldPassword ? "text" : "password"}
                  name="oldpassword"
                  placeholder="Old Password*"
                  required
                />
                <FontAwesomeIcon
                  icon={showOldPassword ? faEyeSlash : faEye}
                  onClick={toggleShowOldPassword}
                  className="passwordToggleIcon"
                />
              </div>
              <div className="passwordField">
                <input
                  className="inputField"
                  type={showNewPassword ? "text" : "password"}
                  name="newpassword"
                  placeholder="New Password*"
                  required
                />
                <FontAwesomeIcon
                  icon={showNewPassword ? faEyeSlash : faEye}
                  onClick={toggleShowNewPassword}
                  className="passwordToggleIcon"
                />
              </div>
              <div className="passwordField">
                <input
                  className="inputField"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmpassword"
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
          <button>CHANGE</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
