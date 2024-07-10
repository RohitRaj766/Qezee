import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboardRequest } from '../../../../actions';
import { getLeaderboardLoading, getLeaderboardData, getLeaderboardError } from '../../../../selectors';

const Leaderboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLeaderboardLoading);
  const data = useSelector(getLeaderboardData);
  const error = useSelector(getLeaderboardError);

  useEffect(() => {
    dispatch(fetchLeaderboardRequest());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <ul>
          {data.map((user, index) => (
            <li key={index}>{user.firstname}: {user.totalCorrect} {user.reputation}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
