import React, { useState } from 'react';
import './Edit.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Edit = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="editMain">
      <h1>EDIT PROFILE</h1>
      <div className='editMainContainer'>
        <div className="updateContainer">
          <div className="updateform">
            <form>
              <div className="smallForm">
                <input className="smallInputField" type="text" name="firstname" placeholder="First Name*" required />
                <input className="smallInputField" type="text" name="lastname" placeholder="Last Name*" required />
              </div>
              <input className="inputField" type="email" name="email" placeholder="Email*" required />
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
