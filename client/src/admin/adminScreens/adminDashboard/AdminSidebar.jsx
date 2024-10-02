import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.scss';
import logoimage from '../../../user/assets/images/logo.svg';
import createquizimage from "../../../user/assets/images/quizzes.svg";
import handleuserimage from "../../../user/assets/images/editprofile.svg";

const AdminSidebar = () => {
  const [selectedItem, setSelectedItem] = useState(0); 

  const handleClick = (index) => {
    setSelectedItem(index);
  };

  const selectorsData = [
    { image: createquizimage, text: 'CREATE QUIZ', path: '/admin-dashboard/CreateQuiz' },
    { image: handleuserimage, text: 'HANDLE USER', path: '/admin-dashboard/AdminLeaderboard' },

  ];

  return (
    <div className="sidebarmain">
      <div className="header">
        <div className="image"><img src={logoimage} alt="logo" /></div>
        <p className="text"><span className="Q">Q</span>ezee</p>
      </div>
      {selectorsData.map((item, index) => (
        <React.Fragment key={index}>
          <Link to={item.path} style={{ textDecoration: 'none' }}>
            <div 
              className={`selectors ${selectedItem === index ? 'selected' : ''}`} 
              onClick={() => handleClick(index)}
            >
              <img src={item.image} className="image" alt={item.text} />
              <p className="text">{item.text}</p>
            </div>
          </Link>
         
          {index < selectorsData.length - 1 && <div className="spacing"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default AdminSidebar;
