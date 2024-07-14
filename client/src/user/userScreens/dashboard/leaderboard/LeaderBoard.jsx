import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboardRequest } from '../../../../actions';
import { getLeaderboardLoading, getLeaderboardData, getLeaderboardError } from '../../../../selectors';
import './LeaderBoard.scss'
import first from '../../../assets/images/first.svg';
import second from '../../../assets/images/second.svg';
import third from '../../../assets/images/third.svg';

const players = [
  { name: 'Rohit', points: 120, enrollment: 'Aju/220501' },
  { name: 'Deepak', points: 420, enrollment: 'Aju/220502' },
  { name: 'Mohit', points: 240, enrollment: 'Aju/220503' },
  { name: 'Ankit', points: 340, enrollment: 'Aju/220504' },
  { name: 'Suman', points: 150, enrollment: 'Aju/220505' },
  { name: 'Neha', points: 270, enrollment: 'Aju/220506' },
  { name: 'Arjun', points: 300, enrollment: 'Aju/220507' },
  { name: 'Nikita', points: 590, enrollment: 'Aju/220508' },
  { name: 'Amit', points: 220, enrollment: 'Aju/220509' },
  { name: 'Vikram', points: 260, enrollment: 'Aju/220510' },
];

const sortedPlayers = players.sort((a, b) => b.points - a.points);

const getTitle = (rank) => {
  if (rank === 1) return 'Grand Master';
  if (rank === 2) return 'Master';
  if (rank === 3) return 'Sergeant';
  return 'Warrior';
};

const getImage = (rank) => {
  if (rank === 1) return first;
  if (rank === 2) return second;
  if (rank === 3) return third;
  return null;
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
              <img src={getImage(2)} alt="" />
              <p className="title">Master</p>
            </div>
            <div className="lower">
              <p className="name">{sortedPlayers[1].name}</p>
              <p className="points">{sortedPlayers[1].points} pts</p>
              <p className="enrollment">{sortedPlayers[1].enrollment}</p>
              <p className="name">{sortedPlayers[1].name}</p>
              <p className="points">{sortedPlayers[1].points} pts</p>
              <p className="enrollment">{sortedPlayers[1].enrollment}</p>
              <p className="name">{sortedPlayers[1].name}</p>
              <p className="points">{sortedPlayers[1].points} pts</p>
              <p className="enrollment">{sortedPlayers[1].enrollment}</p>
            </div>
          </div>

          <div className="grandmaster">
            <div className="upper">
              <img src={getImage(1)} alt="" />
              <p className="title">Grand Master</p>
            </div>
            <div className="lower">
                  <p className="name">{sortedPlayers[0].name}</p>
                  <p className="points">{sortedPlayers[0].points} pts</p>
                  <p className="enrollment">{sortedPlayers[0].enrollment}</p>
                  <p className="name">{sortedPlayers[0].name}</p>
                  <p className="points">{sortedPlayers[0].points} pts</p>
                  <p className="enrollment">{sortedPlayers[0].enrollment}</p>
                  <p className="name">{sortedPlayers[0].name}</p>
                  <p className="points">{sortedPlayers[0].points} pts</p>
                  <p className="enrollment">{sortedPlayers[0].enrollment}</p>
            </div>
          </div>

          <div className="sergeant">
            <div className="upper">
              <img src={getImage(3)} alt="" />
              <p className="title">Sergeant</p>
            </div>
            <div className="lower">
              <p className="name">{sortedPlayers[2].name}</p>
              <p className="points">{sortedPlayers[2].points} pts</p>
              <p className="enrollment">{sortedPlayers[2].enrollment}</p>
              <p className="name">{sortedPlayers[2].name}</p>
              <p className="points">{sortedPlayers[2].points} pts</p>
              <p className="enrollment">{sortedPlayers[2].enrollment}</p>
              <p className="name">{sortedPlayers[2].name}</p>
              <p className="points">{sortedPlayers[2].points} pts</p>
              <p className="enrollment">{sortedPlayers[2].enrollment}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="scores">
        <h1>Top Performance</h1>
        <div className="scoreContainer">
          {sortedPlayers.slice(3).map((player, index) => (
            <div
              key={index}
              className="player"
              style={{
                backgroundColor: index % 2 === 0 ? 'rgba(245, 180, 0, 0.3)' : 'rgba(60, 94, 223, 0.3)',
              }}
            >
              <p>{index + 4}.</p> {/* Rank starts from 4 */}
              <p>{player.name}</p>
              <p>{player.points} pts</p>
              <p>{getTitle(index + 4)}</p> {/* Rank starts from 4 */}
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