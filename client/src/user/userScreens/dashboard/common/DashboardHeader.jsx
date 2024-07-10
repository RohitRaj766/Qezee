import React from 'react'
import './main.scss'
import profilepic from "../../../assets/images/profilepic.svg";
import logout from "../../../assets/images/logout.svg";

const DashboardHeader = () => {
  return (
    <div className='headerContainer'>
      <div className="headerWrapper">
        <div className='contents'>
            <div className="userInfo">
                <div className="name">Name</div>
                <div className="branch">Branch</div>
            </div>
            <img className='profile' src={profilepic} alt="" />
            <img className='logout' src={logout} alt="" />
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader