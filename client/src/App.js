import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './user/userScreens/signup/Signup';
import Login from './user/userScreens/login/Login';
import Leaderboard from './user/userScreens/dashboard/LeaderBoard';
import Edit from './user/userScreens/dashboard/Edit';
import Mocktest from './user/userScreens/dashboard/Mocktest';
import Overview from './user/userScreens/dashboard/Overview';
import QuizList from './user/userScreens/dashboard/Quizzes';

import Header from './user/components/header/Header';
import PrivateRoute from './user/components/PrivateRoute';
import Dashboard from './user/userScreens/dashboard/Dashboard';
import NotFound from './NotFound';
import { useSelector } from 'react-redux';
import DashboardHeader from './user/userScreens/dashboard/DashboardHeader';
import Page from './Page';

const App = () => {
  const isAuth = useSelector((state)=>state.auth.isAuthenticated)
  return (
    <Router>
     {/* {!isAuth && <Header />}  */}
     {/* {<DashboardHeader />}  */}
      <Routes>
        <Route path="/" element={<Page/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route element = {<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="edit" element={<Edit />} />
          <Route path="mocktest" element={<Mocktest />} />
          <Route path="overview" element={<Overview />} />
          <Route path="quizzes" element={<QuizList />} />
        </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
