import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../../actions/index';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <div style={{ width: '200px', background: '#f0f0f0', padding: '10px' }}>
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><Link to="/dashboard/leaderboard"><button>Leaderboard</button></Link></li>
          <li><Link to="/dashboard/edit"><button>Edit</button></Link></li>
          <li><Link to="/dashboard/mocktest"><button>Mocktest</button></Link></li>
          <li><Link to="/dashboard/overview"><button>Overview</button></Link></li>
          <li><Link to="/dashboard/quizzes"><button>Quizzes</button></Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
