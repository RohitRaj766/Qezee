import React, { useState, useEffect } from 'react';
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
    { badge: 1 }
];

const OverviewCards = () => {
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const quizInterval = setInterval(() => {
            if (!isPaused) {
                setCurrentQuizIndex(prevIndex => (prevIndex + 1) % upcomingQuizzes.length);
            }
        }, 2000); 

        const badgeInterval = setInterval(() => {
            if (!isPaused) {
                setCurrentBadgeIndex(prevIndex => (prevIndex + 1) % badges.length);
            }
        }, 2000); 
        return () => {
            clearInterval(quizInterval);
            clearInterval(badgeInterval);
        };
    }, [isPaused]);

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    // const handleNextQuiz = () => {
    //     setCurrentQuizIndex((prevIndex) => (prevIndex + 1) % upcomingQuizzes.length);
    // };

    // const handlePreviousQuiz = () => {
    //     setCurrentQuizIndex((prevIndex) => (prevIndex - 1 + upcomingQuizzes.length) % upcomingQuizzes.length);
    // };

    // const handleNextBadge = () => {
    //     setCurrentBadgeIndex((prevIndex) => (prevIndex + 1) % badges.length);
    // };

    // const handlePreviousBadge = () => {
    //     setCurrentBadgeIndex((prevIndex) => (prevIndex - 1 + badges.length) % badges.length);
    // };

    const handleDotClickQuiz = (index) => {
        setCurrentQuizIndex(index);
        setIsPaused(true); // Optional: Pause auto-slide when dot is clicked
    };

    const handleDotClickBadge = (index) => {
        setCurrentBadgeIndex(index);
        setIsPaused(true); // Optional: Pause auto-slide when dot is clicked
    };

    const currentQuiz = upcomingQuizzes[currentQuizIndex];
    const currentBadgeCount = badges[currentBadgeIndex].badge;

    return (
        <div className="cardmain" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

            <div className="upcomingWrapper">
                <div className="upcoming">
                    {/* <button className='but_on' onClick={handlePreviousQuiz}><img src={leftArrow} className='arrows' alt="Previous" /></button> */}
                    <img src={trophy} alt="Trophy" />
                    <div className="info1">
                        <h2>Upcoming Quiz</h2>
                        <p>Topic - {currentQuiz.topic}</p>
                    </div>
                    {/* <button className='but_on' onClick={handleNextQuiz}><img src={rightArrow} className='arrows' alt="Next" /></button> */}
                </div>
                <div className="dotnav">
                    {upcomingQuizzes.map((_, index) => (
                        <span 
                            key={index} 
                            className={`dot ${index === currentQuizIndex ? 'active' : ''}`} 
                            onClick={() => handleDotClickQuiz(index)}
                        ></span>
                    ))}
                </div>
            </div>

            <div className="badgeWrapper">
                <div className="badge">
                    {/* <button className='but_on' onClick={handlePreviousBadge}><img src={leftArrow} className='arrows' alt="Previous" /></button> */}
                    <div className="info2">
                        <h2>Badge Collection</h2>
                        <div className="badgeContainer">
                            {Array.from({ length: currentBadgeCount }).map((_, index) => (
                                <img key={index} src={badge} alt="Badge" />
                            ))}
                        </div>
                    </div>
                    {/* <button className='but_on' onClick={handleNextBadge}><img src={rightArrow} className='arrows' alt="Next" /></button> */}
                </div>
                <div className="dotnav">
                    {badges.map((_, index) => (
                        <span 
                            key={index} 
                            className={`dot ${index === currentBadgeIndex ? 'active' : ''}`} 
                            onClick={() => handleDotClickBadge(index)}
                        ></span>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default OverviewCards;
