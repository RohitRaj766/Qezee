import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './common/Sidebar';
import DashboardHeader from './common/DashboardHeader';

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <DashboardHeader />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
