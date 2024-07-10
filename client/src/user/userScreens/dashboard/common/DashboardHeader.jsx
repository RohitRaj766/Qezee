import React from 'react';
import './main.scss';
import profilepic from '../../../assets/images/profilepic.svg';
import logout from '../../../assets/images/logout.svg';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../../../actions/index';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutRequest());
    navigate('/login');
  };

  return (
    <div className='headerContainer'>
      <div className='headerWrapper'>
        <div className='contents'>
          <div className='userInfo'>
            <div className='name'>Name</div>
            <div className='branch'>Branch</div>
          </div>
          <img className='profile' src={profilepic} alt='' />
          <img className='logout' src={logout} alt='' onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
