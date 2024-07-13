import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboardRequest } from '../../../../actions';
import { getLeaderboardLoading, getLeaderboardData, getLeaderboardError } from '../../../../selectors';
import './LeaderBoard.scss'
import first from '../../../assets/images/first.svg';
import second from '../../../assets/images/second.svg';
import third from '../../../assets/images/third.svg';

const players = [
  { rank: 5, name: 'Rohit', points: 120, title: 'Warrior' },
  { rank: 2, name: 'Deepak', points: 420, title: 'Warrior' },
  { rank: 3, name: 'Mohit', points: 240, title: 'Warrior' },
  { rank: 4, name: 'Ankit', points: 340, title: 'Master' },
  { rank: 1, name: 'Suman', points: 150, title: 'Master' },
  { rank: 6, name: 'Neha', points: 270, title: 'Grand Master' },
  { rank: 7, name: 'Arjun', points: 300, title: 'Sergeant' },
  { rank: 8, name: 'Nikita', points: 190, title: 'Sergeant' },
  { rank: 9, name: 'Amit', points: 220, title: 'Grand Master' },
  { rank: 10, name: 'Vikram', points: 260, title: 'Warrior' },
];

const sortedPlayers = players.sort((a, b) => b.points - a.points);

const getTitle = (rank) => {
  if (rank === 1) return 'Grand Master';
  if (rank === 2) return 'Master';
  if (rank === 3) return 'Sergeant';
  return 'Warrior';
};

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
              <p className="title">Master</p>
            </div>
            <div className="lower">
              <div className="lowerleft">
                <p className="name">Mohit</p>
                <p className="points">468 pts</p>
              </div>
              <p className="enrollment">Aju/220501</p>
            </div>
          </div>

          <div className="grandmaster">
            <div className="upper">
              <img src={first} alt="" />
              <p className="title">Grand Master</p>
            </div>
            <div className="lower">
              <div className="lowerleft">
                <p className="name">Mohit</p>
                <p className="points">468 pts</p>
              </div>
              <p className="enrollment">Aju/220501</p>
            </div>
          </div>

          <div className="sergeant">
            <div className="upper">
              <img src={third} alt="" />
              <p className="title">Sergeant</p>
            </div>
            <div className="lower">
              <div className="lowerleft">
                <p className="name">Mohit</p>
                <p className="points">468 pts</p>
              </div>
              <p className="enrollment">Aju/220501</p>
            </div>
          </div>
        </div>
      </div>

      <div className="scores">
        <h1>Top Performance</h1>
        <div className="scoreContainer">
          {sortedPlayers.map((player, index) => (
            <div
              key={index}
              className="player"
              style={{
                backgroundColor: index % 2 === 0 ? 'rgba(245, 180, 0, 0.3)' : 'rgba(60, 94, 223, 0.3)',
              }}
            >
              <p>{index + 1}.</p>
              <p>{player.name}</p>
              <p>{player.points} pts</p>
              <p>{getTitle(index + 1)}</p>
            </div>
          ))}
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