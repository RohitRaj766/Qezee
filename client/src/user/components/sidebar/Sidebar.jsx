import React, { useState } from "react";
import './Sidebar.scss'
import logoimage from '../../assets/images/logo.svg'
import overviewimage from "../../assets/images/overview.svg";
import mocktestimage from "../../assets/images/mocktest.svg";
import quizzesimage from "../../assets/images/quizzes.svg";
import leaderboardimage from "../../assets/images/leaderboard.svg";
import editprofileimage from "../../assets/images/editprofile.svg";


const Sidebar = () => {
    const [selectedItem, setSelectedItem] = useState(0); 

    const handleClick = (index) => {
        setSelectedItem(index);
    };

    const selectorsData = [
        { image: overviewimage, text: 'OVERVIEW' },
        { image: mocktestimage, text: 'MOCK TEST' },
        { image: quizzesimage, text: 'QUIZZES' },
        { image: leaderboardimage, text: 'LEADER BOARD' },
        { image: editprofileimage, text: 'EDIT PROFILE' }
    ];

    return (
        <>
            <div className="main">
                <div className="header">
                    <div className="image"><img src={logoimage} alt="" /></div>
                    <p className="text"><span className="Q">Q</span>ezee</p>
                </div>

                {selectorsData.map((item, index) => (
                    <div 
                        key={index} 
                        className={`selectors ${selectedItem === index ? 'selected' : ''}`} 
                        onClick={() => handleClick(index)}
                    >
                        <img src={item.image} className="image" alt="" />
                        <p className="text">{item.text}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Sidebar;

