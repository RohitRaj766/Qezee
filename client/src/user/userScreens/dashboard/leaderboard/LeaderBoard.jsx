import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboardRequest } from '../../../../actions';
import './LeaderBoard.scss';
import first from '../../../assets/images/first.svg';
import second from '../../../assets/images/second.svg';
import third from '../../../assets/images/third.svg';

const images = [first, second, third];
const getImage = (rank) => images[rank] || null;

const PlayerCard = ({ rank, player }) => (
  <div className={`playerCard ${rank === 1 ? 'grandmaster' : rank === 2 ? 'master' : 'sergeant'}`}>
    <div className="upper">
      <img src={getImage(rank)} alt="" />
      <p className="title">{player.reputation}</p>
    </div>
    <div className="lower">
      <p className="name">{player.firstname + " " + player.lastname}</p>
      <p className="points">{player.totalCorrect} pts</p>
      <p className="enrollment">{player.enrollment}</p>
    </div>
  </div>
);

const Leaderboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.leaderboardData);
  useEffect(() => {
    dispatch(fetchLeaderboardRequest());
  }, [dispatch]);

  return (
    <div className="leaderboardContainer">
      <div className="standings">
        <div className="cardContainer">
          {data.slice(0, 3).map((player, index) => (
            <PlayerCard key={player.enrollment} rank={index} player={player} />
          ))}
        </div>
      </div>
      <div className="scores">
        <h1>Top Performance</h1>
        <div className="scoreContainer">
        <table>
          <thead className='tablehead'>
            <tr className='head'>
            <th>Rank</th>
            </tr>
            <tr className="header">
              <th>Name</th>
              <th>Points</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            <tr className='tablerow'>
              <td>
                {data.slice(3).map((player, index) => (
                  <tr key={player.enrollment} className="play">
                    <td>{index + 4}</td>
                  </tr>
                ))}
              </td>

              <td>
                {data.slice(3).map((player, index) => (
                  <tr key={player.enrollment} className="player">
                    <td>{player.firstname + " " + player.lastname}</td>
                    <td>{player.totalCorrect} pts</td>
                    <td>{player.reputation}</td>
                  </tr>
                  ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default Leaderboard;