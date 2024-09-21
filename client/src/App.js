import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Signup from "./user/userScreens/signup/Signup";
import Login from "./user/userScreens/login/Login";
import Leaderboard from "./user/userScreens/dashboard/leaderboard/LeaderBoard";
import Edit from "./user/userScreens/dashboard/edit/Edit";
import Mocktest from "./user/userScreens/dashboard/mocktest/Mocktest";
import Overview from "./user/userScreens/dashboard/overview/Overview";
import QuizList from "./user/userScreens/dashboard/quiz/Quizzes";
import Loader from "./user/components/loader/Loader";
import Header from "./user/components/header/Header";
import { PrivateRoute, AdminPrivateRoute } from './user/components/PrivateRoute';
import Dashboard from "./user/userScreens/dashboard/Dashboard";
import QuizPage from "./user/userScreens/dashboard/quiz/QuizPage";
import Not404Page from "./user/components/Not404Page";
import AdminLoginForm from "./admin/adminScreens/adminLogin/AdminLoginForm";
import { verifyTokenHandelRefreshRequest } from "./actions/index";

const AppContent = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const isLoad = useSelector((state) => state.auth.isLoading);
  const location = useLocation();
  const isNotFoundRoute = location.pathname === "/not-found";

  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {isLoad && <Loader />}
      {isNotFoundRoute && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="edit" element={<Edit />} />
            <Route path="mocktest" element={<Mocktest />} />
            <Route path="overview" element={<Overview />} />
            <Route path="quizzes" element={<QuizList />} />
            <Route path="quizzes/quizpage" element={<QuizPage />} />
          </Route>
        </Route>
        <Route path="/not-found" element={<Not404Page />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
        <Route path="/admin" element={<AdminLoginForm />} />
        <Route path="/admin/login" element={<AdminLoginForm />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin-dashboard" element={<Dashboard />}>
          
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
