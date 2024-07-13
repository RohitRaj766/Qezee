import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboardRequest } from '../../../../actions';
import { getLeaderboardLoading, getLeaderboardData, getLeaderboardError } from '../../../../selectors';
import './LeaderBoard.scss'
import first from '../../../assets/images/first.svg';
import second from '../../../assets/images/second.svg';
import third from '../../../assets/images/third.svg';

const Leaderboard = () => {
  // const dispatch = useDispatch();
  // const loading = useSelector(getLeaderboardLoading);
  // const data = useSelector(getLeaderboardData);
  // const error = useSelector(getLeaderboardError);

  // useEffect(() => {
  //   dispatch(fetchLeaderboardRequest());
  // }, [dispatch]);

  return (
    <div className="leaderboardContainer">
      <div className="standings">
        <h1>LEADER BOARD</h1>
        <div className="cardContainer">

          <div className="master">
            <div className="upper">
              <img src={second} alt="" />
              <p className='title'>Master</p>
            </div>
            <div className="lower">
              <div className="lowerleft">
                <p className='name'>Mohit</p>
                <p className="points">468 pts</p>
              </div>
              <p className="enrollment">Aju/220501</p>
            </div>
          </div>

          <div className="grandmaster">
            <div className="upper">
              <img src={first} alt="" />
              <p className='title'>Grand Master</p>
            </div>

            <div className="lower">
              <div className="lowerleft">
                <p className='name'>Mohit</p>
                <p className="points">468 pts</p>
              </div>
              <p className="enrollment">Aju/220501</p>
            </div>
          </div>

          <div className="sergeant">
            <div className="upper">
              <img src={third} alt="" />
              <p className='title'>Sergeant</p>
            </div>
            <div className="lower">
              <div className="lowerleft">
                <p className='name'>Mohit</p>
                <p className="points">468 pts</p>
              </div>
              <p className="enrollment">Aju/220501</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Leaderboard;

    // <div>
    //   {loading && <p>Loading...</p>}
    //   {error && <p>Error: {error}</p>}
    //   {data && (
    //     <ul>
    //       {data.map((user, index) => (
    //         <li key={index}>{user.firstname}: {user.totalCorrect} {user.reputation}</li>
    //       ))}
    //     </ul>
    //   )}
    // </div>