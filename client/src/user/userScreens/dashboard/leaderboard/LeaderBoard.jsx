import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboardRequest } from '../../../../actions';
import './LeaderBoard.scss';
import first from '../../../assets/images/first.svg';
import second from '../../../assets/images/second.svg';
import third from '../../../assets/images/third.svg';

const images = [first, second, third];
const getImage = (rank) => images[rank] || null;

const PlayerCard = ({ rank, player }) => (
  <div className={`playerCard ${rank === 0 ? 'grandmaster' : rank === 1 ? 'master' : 'sergeant'}`}>
    <div className="upper">
      <img src={getImage(rank)} alt="" />
      <p className="title">{player?.reputation}</p>
    </div>
    <div className="lower">
      <p className="name">{player?.firstname + " " + player?.lastname}</p>
      <p className="points">{player?.totalCorrect} pts</p>
      <p className="enrollment">{player?.enrollment}</p>
    </div>
  </div>
);

const Leaderboard = () => {
  const [Flag, setFlag] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.leaderboardData);
  const LoggedInUser = useSelector((state) => state.auth.user.LoggedInUser);

  useEffect(() => {
    dispatch(fetchLeaderboardRequest());
  }, [dispatch]);

  useEffect(() => {
    const allowedRanks = [1, 2, 3];
    if (LoggedInUser && allowedRanks.includes(LoggedInUser.globalrank)) {
      setFlag(false);
    }
  }, [LoggedInUser]);

  return (
    <div className="leaderboardContainer">
      <div className="standings">
        <div className="cardContainer">
          {data && data.length > 0 ? (
            data.slice(0, 3).map((player, index) => {
              const adjustedIndex = index === 0 ? 1 : index === 1 ? 0 : index;
              return <PlayerCard key={player.enrollment} rank={adjustedIndex} player={data[adjustedIndex]} />;
            })
          ) : (
            <p>No leaderboard data available. Please participate in quizzes to gain insights.</p>
          )}
        </div>
      </div>
      <div className="scores">
        <div className="scoreContainer">
          {Flag && LoggedInUser ? (
            <>
              <h1>Your Global Rank</h1>
              <thead className='tablehead'>
                <tr className='head'>
                  <th>Rank</th>
                </tr>
                <tr className="header">
                  <th>Name</th>
                  <th>Points</th>
                  <th>Enrollment</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                <tr className='tablerow'>
                  <td>
                    <tr className='play play2'>
                      <td className='curr-rank'>{LoggedInUser?.globalrank || '-'}</td>
                    </tr>
                  </td>
                  <td>
                    <tr className='player player2'>
                      <td className='curr-rank'>{LoggedInUser ? `${LoggedInUser.firstname} ${LoggedInUser.lastname}` : '-'}</td>
                      <td className='curr-rank'>{LoggedInUser?.totalquestions?.correct || 0} pts</td>
                      <td className='curr-rank'>{LoggedInUser?.enrollment || '-'}</td>
                      <td className='curr-rank'>{LoggedInUser?.reputation || '-'}</td>
                    </tr>
                  </td>
                </tr>
              </tbody>
            </>
          ) : null}
          <table>
            <h1>Top Performance</h1>
            <thead className='tablehead'>
              <tr className='head'>
                <th>Rank</th>
              </tr>
              <tr className="header">
                <th>Name</th>
                <th>Points</th>
                <th>Enrollment</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr className='tablerow'>
                <td>
                  {data && data.length > 3 ? (
                    data.slice(3).map((player, index) => (
                      <tr key={player.enrollment} className="play">
                        <td>{index + 4}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="1">-</td>
                    </tr>
                  )}
                </td>
                <td>
                  {data && data.length > 3 ? (
                    data.slice(3).map((player, index) => (
                      <tr key={player.enrollment} className="player">
                        <td>{player.firstname + " " + player.lastname}</td>
                        <td>{player.totalCorrect} pts</td>
                        <td className='curr-rank'>{player.enrollment}</td>
                        <td>{player.reputation || '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No top performers available.</td>
                    </tr>
                  )}
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
