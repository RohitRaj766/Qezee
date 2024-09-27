import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Header.scss";
import logoImage from "../../assets/images/logo.svg";

const DropdownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 10 10"
    style={{ marginLeft: '5px', fill: '#F5B400' }} // Adjust fill color as needed
  >
    <path d="M0 3h10l-5 5z" />
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav>
        <div className="main">
          <div className="leftside">
            <div className="logo">
              <img src={logoImage} alt="logo" />
            </div>
            <p className="text">
              <span className="Q">Q</span>ezee
            </p>
          </div>

          <div className="rightside">
            <div className="dropdown" ref={dropdownRef}>
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                More <DropdownIcon />
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => { navigate('/admin/login'); setDropdownOpen(false); }}>Admin Login</button>
                  <button onClick={() => { navigate('/open-viewboard'); setDropdownOpen(false); }}>Open Viewboard</button>
                </div>
              )}
            </div>
            <button className="login" onClick={() => navigate('/login')}>LOGIN</button>
            <button className="signup" onClick={() => navigate('/signup')}>SIGN UP</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
