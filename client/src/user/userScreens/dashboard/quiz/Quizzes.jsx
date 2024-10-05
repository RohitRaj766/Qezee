import React, { useEffect, useState } from "react";
import "./Quizzes.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuizListRequest,
  fetchQuizRequest,
  } from "../../../../actions/index";
import { useNavigate } from "react-router-dom";
import ModalConfirm from "../common/ModalConfirm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuizList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.auth.fetchedData);
  const userData = useSelector((state) => state.auth.user.LoggedInUser);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.fetchDataError);
  const [flag, setFlag] = useState(false);
  const [selectQuizTitle, setSelectQuizTitle] = useState("");
  const [isDataVisible, setIsDataVisible] = useState(false);
  useEffect(() => {
    dispatch(fetchQuizListRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      setIsDataVisible(true);
    }
  }, [isLoading]);

  const handleCloseModal = () => {
    setFlag(false);
  };

  const handleButtonClick = (id) => {
    const currentDateTime = new Date();
    const quizStartTime = adjustTime(quizzes.find(quiz => quiz._id === id).startTime);  
    if (currentDateTime >= quizStartTime) {
      setFlag(true);
      setSelectQuizTitle(id);
    } else {
      toast.error('Quiz not started yet. Please see the date & start time');
    }
  };

  const handleConfirmTest = () => {
    navigate("/dashboard/quizzes/quizpage");
    dispatch(fetchQuizRequest(selectQuizTitle));
    setFlag(false);
  };

  const adjustTime = (dateString, offsetHours = 0, offsetMinutes = 0) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + offsetHours);
    date.setMinutes(date.getMinutes() + offsetMinutes);
    return date;
  };

  const attemptedQuizzes = userData?.totalquizzes.map(quiz => quiz.quizId) || [];


const liveQuizzes = quizzes.filter(
  (quiz) => !attemptedQuizzes.includes(quiz._id)
);

const previousQuizzes = quizzes.filter(
  (quiz) => quiz.quizStatus === "completed" || quiz.quizStatus === "expired" || attemptedQuizzes.includes(quiz._id)
);

const updatedPreviousQuizzes = previousQuizzes.map((quiz) => {
  if (attemptedQuizzes.includes(quiz.title)) {
    return { ...quiz, quizStatus: "completed" };
  }
  return quiz;
});

  return (
    <div className="quizContainerMain">
      <ToastContainer/>
      {!isLoading && isDataVisible && (
        <div className="quizWrapper">
          <div className="QuizContainer">
            <h2>Live Quizzes</h2>
            <div className="QuizList">
              {error && <p>Error: {error}</p>}
              <table>
                <thead className="tableHeader">
                  <tr className="tableRow">
                    <th>Name</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>Expiry Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {liveQuizzes.map((quiz, index) => {
                    const quizDateAdjusted = adjustTime(quiz.date);
                    const startTimeAdjusted = adjustTime(quiz.startTime);
                    const expireTimeAdjusted = adjustTime(quiz.expireTime);
                    return (
                      <tr key={index} className="quiz">
                        <td>{quiz.title}</td>
                        <td>{quizDateAdjusted.toLocaleDateString()}</td>
                        <td>
                          {startTimeAdjusted.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true
                          })}
                        </td>
                        <td>
                          {expireTimeAdjusted.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true
                          })}
                        </td>
                        <td>
                          <button onClick={() => handleButtonClick(quiz._id)}>
                            Start
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {flag && (
              <ModalConfirm
                onClose={handleCloseModal}
                heading="Confirmation"
                content="Are you sure, You want to start Quiz ?"
                handleConfirmTest={handleConfirmTest}
              />
            )}
          </div>

          <div className="divider"></div>

          <div className="QuizContainer">
            <h2>Previous Quizzes</h2>
            <div className="QuizList">
              <table>
                <thead className="tableHeader">
                  <tr className="tableRow">
                    <th>Name</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>Expiry Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedPreviousQuizzes.map((quiz, index) => {
                    const quizDateAdjusted = adjustTime(quiz.date);
                    const startTimeAdjusted = adjustTime(quiz.startTime);
                    const expireTimeAdjusted = adjustTime(quiz.expireTime);

                    return (
                      <tr key={index} className="quiz">
                        <td>{quiz.title}</td>
                        <td>{quizDateAdjusted.toLocaleDateString()}</td>
                        <td>
                          {startTimeAdjusted.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true
                          })}
                        </td>
                        <td>
                          {expireTimeAdjusted.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true
                          })}
                        </td>
                        <td>
                          <button  onClick={() => navigate('/open-leaderboard', { state: { userAttemptedList: quiz.userAttemptedList } })}>
                            Rank
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )};
    </div>
  );
};

export default QuizList;
