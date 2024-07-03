import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Header.scss";
import logoImage from "../../assets/images/logo.svg";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <div className="main">
          <div className="leftside">
            <div className="logo">
              <img src={logoImage} alt="logo" />
            </div>
            <p className="text">
              <span className="Q">Q</span>uizee
            </p>
          </div>

          <div className="rightside">
            <button className="login" onClick={() => navigate('/login')}>LOGIN</button>
            <button className="signup" onClick={() => navigate('/signup')}>SIGN UP</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;


