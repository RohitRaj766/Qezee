import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './common/Sidebar';
import DashboardHeader from './common/DashboardHeader';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <DashboardHeader />
      <div style={{ marginLeft: '200px', padding: '20px', flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
