import React from 'react'
import './OverviewCards.scss'
import trophy from '../../../assets/images/trophy.svg'
import badge from '../../../assets/images/badge.svg'
import leftArrow from '../../../assets/images/leftArrow.svg'
import rightArrow from '../../../assets/images/righArrow.svg'


const OverviewCards = () => {
  return (
    <div className="cardmain">
        
        <div className="upcoming">
            <button><img src={leftArrow} alt="" /></button>
            <img src={trophy} alt="" />
            <div className="info1">
                <h2>Upcoming Quiz</h2>
                <p>Topic - C programming</p>
                <p>Date - 24/8/24</p>
            </div>
            <button><img src={rightArrow} alt="" /></button>
        </div>

        <div className="badge">
            <button>Left</button>
            <div className="info2">
                <h2>Badge Collection</h2>
                <div className="badgeContainer">
                    <img src={badge} alt="" />
                    <img src={badge} alt="" />
                    <img src={badge} alt="" />
                    <img src={badge} alt="" />
                    <img src={badge} alt="" />
                </div>
            </div>
            <button>Right</button>

        </div>
    </div>
  )
}

export default OverviewCards