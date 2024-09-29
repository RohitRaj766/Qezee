import React from 'react'
import logoImage from "../../../../assets/images/logo.svg";


const Header = () => {
  return (
    <div className="header">
    <div className="logo">
      <img src={logoImage} alt="logo" />
    </div>
    <p className="text">
      <span className="Q">Q</span>ezee
    </p>
  </div>
  )
}

export default Header