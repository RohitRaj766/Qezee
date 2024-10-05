import React, { useState, useEffect } from 'react';
import './OverviewCards.scss';
import trophy from '../../../assets/images/trophy.svg';
import badge1 from '../../../assets/images/badge1.svg';
import badge2 from '../../../assets/images/badge2.svg';
import badge3 from '../../../assets/images/badge3.svg';
import badge4 from '../../../assets/images/badge4.svg';
import badge5 from '../../../assets/images/badge5.svg';
import { useSelector } from 'react-redux';
import ConfettiExplosion from 'react-confetti-explosion';

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

const badgeImages = [
    null,
    badge1,
    badge2,
    badge3,
    badge4,
    badge5
];

const getBadges = (correctAnswers) => {
    if (correctAnswers >= 200) return 5;
    if (correctAnswers >= 100) return 4;
    if (correctAnswers >= 60) return 3;
    if (correctAnswers >= 30) return 2;
    return 1;
};

const correctAnswersNeeded = [0, 15, 30, 60, 100, 200];

const OverviewCards = () => {
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [badgeCount, setBadgeCount] = useState(0);
    const [prevBadgeCount, setPrevBadgeCount] = useState(0);
    const [celebrate, setCelebrate] = useState(false);
    const [hasCelebrated, setHasCelebrated] = useState(false);
    const user = useSelector(state => state.auth.user.LoggedInUser);
    const totalQuestions = user?.totalquestions || { correct: 0 }; 

    useEffect(() => {
        const newBadgeCount = getBadges(totalQuestions.correct);
        setPrevBadgeCount(badgeCount);
        setBadgeCount(newBadgeCount);

        if (newBadgeCount > prevBadgeCount && newBadgeCount > 0 && prevBadgeCount === 0 && !hasCelebrated) {
            setCelebrate(true);
            setHasCelebrated(true);
        }
    }, [totalQuestions.correct, hasCelebrated]);

    useEffect(() => {
        const quizInterval = setInterval(() => {
            if (!isPaused) {
                setCurrentQuizIndex(prevIndex => (prevIndex + 1) % upcomingQuizzes.length);
            }
        }, 2000);

        return () => clearInterval(quizInterval);
    }, [isPaused]);

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);
    const handleDotClickQuiz = (index) => {
        setCurrentQuizIndex(index);
        setIsPaused(true);
    };

    const currentQuiz = upcomingQuizzes[currentQuizIndex];

    const nextBadgeThreshold = badgeCount < 5 ? correctAnswersNeeded[badgeCount + 1] : null;
    const answersNeeded = nextBadgeThreshold ? nextBadgeThreshold - totalQuestions.correct : null;

    return (
        <div className="cardmain" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {celebrate && (
                <ConfettiExplosion
                    duration={3000}
                    particleCount={100}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    onComplete={() => setCelebrate(false)}
                />
            )}
            <div className="upcomingWrapper">
                <div className="upcoming">
                    <img src={trophy} alt="Trophy" />
                    <div className="info1">
                        <h2>Upcoming Quiz</h2>
                        <p>Topic - {currentQuiz.topic}</p>
                    </div>
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
                    <div className="info2">
                    <h2 style={{ marginTop: badgeCount ? "-15px" : "100" }}>Badge Collection</h2>
                        <div className="badgeContainer">
                            {Array.from({ length: badgeCount }).map((_, index) => (
                                <img key={index} src={badgeImages[index + 1]} alt={`Badge ${index + 1}`} />
                            ))}
                        </div>
                        {badgeCount < 5 && (
                            <p style={{padding:"0", marginBottom:'-15px',color:'green'}}>You need {answersNeeded} more correct answers for the next badge!</p>
                        )}
                        {badgeCount === 5 && (
                          <p style={{ padding: "0", marginBottom: '-15px', color: 'green' }}>
                              Congratulations! You've earned all your badges.
                         </p>
                         )}
                    </div>
                </div>
                <div className="dotnav">
                    {Array.from({ length: badgeCount }).map((_, index) => (
                        <span 
                            key={index} 
                            className={`dot ${index === badgeCount - 1 ? 'active' : ''}`} 
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OverviewCards;
