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
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    branch: '',
    university: '',
    college: '',
    enrollment: '',
    oldpassword: '',
    newpassword: '',
    confirmpassword: ''
  });
  const [errorValidator, setErrorValidator] = useState('');

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedUserData = {};
    for (let key in formData) {
      sanitizedUserData[key] = formData[key].trim();
    }

    if (sanitizedUserData.newpassword.length < 6) {
      setErrorValidator("Password must be at least 6 characters long");
      return;
    }

    const hasAlphabet = /[A-Za-z]/.test(sanitizedUserData.newpassword);
    const hasNumber = /\d/.test(sanitizedUserData.newpassword);

    if (!hasAlphabet || !hasNumber) {
      setErrorValidator("Password must contain at least one alphabet and one numeric value");
      return;
    }

    if (sanitizedUserData.newpassword !== sanitizedUserData.confirmpassword) {
      setErrorValidator("Passwords do not match");
      return;
    }

    // Submit the form or handle further actions
    console.log('Form submitted successfully', sanitizedUserData);
    setErrorValidator('');
  };

  return (
    <div className="editMain">
      <h1>EDIT PROFILE</h1>
      <div className="editMainContainer">
        <div className="updateContainer">
          <div className="updateform">
            <form onSubmit={handleSubmit}>
              <div className="smallForm">
                <input
                  className="smallInputField"
                  type="text"
                  name="firstname"
                  placeholder="First Name*"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  required
                />
                <input
                  className="smallInputField"
                  type="text"
                  name="lastname"
                  placeholder="Last Name*"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  required
                />
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
                <input
                  className="smallInputField"
                  type="text"
                  name="course"
                  placeholder="Course*"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                />
                <input
                  className="smallInputField"
                  type="text"
                  name="branch"
                  placeholder="Branch*"
                  value={formData.branch}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                className="inputField"
                type="text"
                name="university"
                placeholder="University*"
                value={formData.university}
                onChange={handleInputChange}
                required
              />
              <input
                className="inputField"
                type="text"
                name="college"
                placeholder="College*"
                value={formData.college}
                onChange={handleInputChange}
                required
              />
              <input
                className="inputField"
                type="text"
                name="enrollment"
                placeholder="Enrollment*"
                value={formData.enrollment}
                onChange={handleInputChange}
                required
              />
            </form>
          </div>
          <button type="submit" onClick={handleSubmit}>UPDATE</button>
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
                  value={formData.oldpassword}
                  onChange={handleInputChange}
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
                  value={formData.newpassword}
                  onChange={handleInputChange}
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
                  value={formData.confirmpassword}
                  onChange={handleInputChange}
                  required
                />
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  onClick={toggleShowConfirmPassword}
                  className="passwordToggleIcon"
                />
              </div>
              {errorValidator && <p className="error">{errorValidator}</p>}
            </form>
          </div>
          <button type="submit" onClick={handleSubmit}>CHANGE</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
