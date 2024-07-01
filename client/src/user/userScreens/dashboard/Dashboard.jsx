import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '200px', padding: '20px', flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
