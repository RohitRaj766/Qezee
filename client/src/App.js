import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Signup from "./user/userScreens/signup/Signup";
import Login from "./user/userScreens/login/Login";
import Leaderboard from "./user/userScreens/dashboard/leaderboard/LeaderBoard";
import Edit from "./user/userScreens/dashboard/edit/Edit";
import Mocktest from "./user/userScreens/dashboard/mocktest/Mocktest";
import Overview from "./user/userScreens/dashboard/overview/Overview";
import QuizList from "./user/userScreens/dashboard/quiz/Quizzes";
import Loader from "./user/components/loader/Loader";
import { PrivateRoute, AdminPrivateRoute } from './user/components/PrivateRoute';
import Dashboard from "./user/userScreens/dashboard/Dashboard";
import QuizPage from "./user/userScreens/dashboard/quiz/QuizPage";
import Not404Page from "./user/components/Not404Page";
import AdminLoginForm from "./admin/adminScreens/adminLogin/AdminLoginForm";
import { verifyTokenHandelRefreshRequest } from "./actions/index";
import OpenViewBoard from "./admin/adminScreens/eachquizleaderboard/ViewBoard";
import OpenLeaderBoard from "./admin/adminScreens/eachquizleaderboard/LeaderBoard";
import NoInternetModal from "./user/components/NoInternet";
import Forgot from "./user/userScreens/forgot/Forgot";
import ResetPassword from "./user/userScreens/forgot/ResetPassword";
import AdminDashboard from './admin/adminScreens/adminDashboard/AdminDashboard'
import CreateQuiz from "./admin/adminScreens/adminDashboard/createQuiz/CreateQuiz";
// import AdminSidebar from "./admin/adminScreens/adminDashboard/adminSidebar/AdminSidebar";
import HandleUser from "./admin/adminScreens/adminDashboard/handleUser/HandleUser";

const AppContent = () => {
  const isLoad = useSelector((state) => state.auth.isLoading);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1260);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1260);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isDesktop) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', fontSize:'30px' }}>
        <h1 style={{color:'red'}}>Please open this app on a desktop or laptop.</h1>
      </div>
    );
  }

  return (
    <>
      {isLoad && <Loader />}
      {isOffline &&  <NoInternetModal isVisible={isOffline} onClose={() => {setIsOffline(false); window.location.reload();}} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/open-viewboard" element={<OpenViewBoard />} />
        <Route path="/open-leaderboard" element={<OpenLeaderBoard />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="edit" element={<Edit />} />
            <Route path="mocktest" element={<Mocktest />} />
            <Route path="overview" element={<Overview />} />
            <Route path="quizzes" element={<QuizList />} />
            <Route path="quizzes/quizpage" element={<QuizPage/>} />
          </Route>
        </Route>
        <Route path="/not-found" element={<Not404Page/>} />
        <Route path="*" element={<Navigate to="/not-found" />} />
        <Route path="/admin" element={<AdminLoginForm />} />
        <Route path="/admin/login" element={<AdminLoginForm />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route path="create-quiz" element={<CreateQuiz/>} />
            <Route path="handle-user" element={<HandleUser/>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyTokenHandelRefreshRequest());
  }, [dispatch]);
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
