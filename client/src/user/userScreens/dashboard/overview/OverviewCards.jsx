import React, { useState } from 'react';
import './OverviewCards.scss';
import trophy from '../../../assets/images/trophy.svg';
import badge from '../../../assets/images/badge.svg';
import leftArrow from '../../../assets/images/leftArrow.svg';
import rightArrow from '../../../assets/images/righArrow.svg';

const upcomingQuizzes = [
    { topic: "C programming", date: "24/8/24" },
    { topic: "JavaScript Basics", date: "1/9/24" },
    { topic: "Python for Data Science", date: "15/9/24" },
    { topic: "HTML & CSS", date: "29/9/24" },
    { topic: "React.js Essentials", date: "12/10/24" },
    { topic: "Node.js Fundamentals", date: "26/10/24" },
    { topic: "Database Management", date: "9/11/24" },
    { topic: "Machine Learning", date: "23/11/24" },
    { topic: "Cyber Security Basics", date: "7/12/24" },
    { topic: "Artificial Intelligence", date: "21/12/24" }
];

const badges = [
    { badge: 5 },
    { badge: 4 },
    { badge: 1 },
];

const OverviewCards = () => {
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);

    const handleNextQuiz = () => {
        setCurrentQuizIndex((prevIndex) => (prevIndex + 1) % upcomingQuizzes.length);
    };

    const handlePreviousQuiz = () => {
        setCurrentQuizIndex((prevIndex) => (prevIndex - 1 + upcomingQuizzes.length) % upcomingQuizzes.length);
    };

    const handleNextBadge = () => {
        setCurrentBadgeIndex((prevIndex) => (prevIndex + 1) % badges.length);
    };

    const handlePreviousBadge = () => {
        setCurrentBadgeIndex((prevIndex) => (prevIndex - 1 + badges.length) % badges.length);
    };

    const currentQuiz = upcomingQuizzes[currentQuizIndex];
    const currentBadgeCount = badges[currentBadgeIndex].badge;

    return (
        <div className="cardmain">
            <div className="upcoming">
                <button onClick={handlePreviousQuiz}><img src={leftArrow} className='arrows' alt="Previous" /></button>
                <img src={trophy} alt="Trophy" />
                <div className="info1">
                    <h2>Upcoming Quiz</h2>
                    <p>Topic - {currentQuiz.topic}</p>
                    <p>Date - {currentQuiz.date}</p>
                </div>
                <button onClick={handleNextQuiz}><img src={rightArrow} className='arrows' alt="Next" /></button>
            </div>
            <div className="badge">
                <button onClick={handlePreviousBadge}><img src={leftArrow} className='arrows' alt="Previous" /></button>
                <div className="info2">
                    <h2>Badge Collection</h2>
                    <div className="badgeContainer">
                        {Array.from({ length: currentBadgeCount }).map((_, index) => (
                            <img key={index} src={badge} alt="Badge" />
                        ))}
                    </div>
                </div>
                <button onClick={handleNextBadge}><img src={rightArrow} className='arrows' alt="Next" /></button>
            </div>
        </div>
    );
}

export default OverviewCards;
