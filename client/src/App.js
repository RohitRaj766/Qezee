import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Signup from "./user/userScreens/signup/Signup";
import Login from "./user/userScreens/login/Login";
import Leaderboard from "./user/userScreens/dashboard/leaderboard/LeaderBoard";
import Edit from "./user/userScreens/dashboard/edit/Edit";
import Mocktest from "./user/userScreens/dashboard/mocktest/Mocktest";
import Overview from "./user/userScreens/dashboard/overview/Overview";
import QuizList from "./user/userScreens/dashboard/quiz/Quizzes";
import Loader from "./user/components/loader/Loader";
import Header from "./user/components/header/Header";
import PrivateRoute from "./user/components/PrivateRoute";
import Dashboard from "./user/userScreens/dashboard/Dashboard";
import QuizPage from "./user/userScreens/dashboard/quiz/QuizPage";
import Not404Page from "./user/components/Not404Page";
import { verifyTokenHandelRefreshRequest } from "./actions/index";


const AppContent = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const isLoad = useSelector((state) => state.auth.isLoading);
  const location = useLocation();
  const isNotFoundRoute = location.pathname === "/not-found";
  return (
    <>
      {isLoad && <Loader />}
      {!isAuth && !isNotFoundRoute && <Header />}
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
            <Route path="quizzes/quizpage" element={<QuizPage/>} />
          </Route>
        </Route>
        <Route path="/not-found" element={<Not404Page />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
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
