import React, { useEffect,useState } from "react";
import "./Quizzes.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest, fetchQuizRequest } from "../../../../actions/index";
import { useNavigate } from "react-router-dom";
import ModalConfirm from "../common/ModalConfirm";
import Loader from "../../../components/loader/Loader";

const QuizList = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.auth.fetchedData);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.fetchDataError);
  const [flag, setFlag] = useState(false);


  // console.log("QUIZ kha hai ", quizzes);
  // console.log("QUIZ", typeof quizzes);
  // console.log("QUIZss", quizzes?.title);

  // console.log(
  //   "Quiz Titles:",
  //   quizzes?.data?.map((quiz) => quiz.title)
  // );

  // quizzes.forEach((quiz) => {
  //   console.log(quiz._id);
  // });

  const activeQuizzes = quizzes.filter((quiz) => quiz.quizStatus === "inactive");
  const inactiveQuizzes = quizzes.filter(
    (quiz) => quiz.quizStatus === "expired"
  );

  // console.log("ddd", activeQuizzes);
  // console.log("ddd2", inactiveQuizzes);

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  // const handleButtonClick = (quizId) => {
  //   navigate(`/quiz/${quizId}`); // Navigate to the quiz page with the quizId
  // };

  const handleCloseModal=()=>{
    setFlag(false);
  }

  const handleButtonClick = (title) => {
    
    setFlag(true); 
    dispatch(fetchQuizRequest(title))

  };

  const handleConfirmTest = () => {
       navigate('/dashboard/quizzes/quizpage');
    
    setFlag(false);
  };


  return (
    <div className="quizContainerMain">
      <div className="quizWrapper">
        <h1>QUIZZES</h1>
        <div className="QuizContainer">
          <h2>Live Quizzes</h2>
          <div className="QuizList">
            {isLoading && <Loader/>}
            {error && <p>Error: {error}</p>}
            <table>
              <thead className="tableHeader">
                <tr className="tableRow">
                  <th>Name</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>Expiry Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>

                {activeQuizzes.map((quiz, index) => (
                  <tr key={index} className='quiz'>
                    <td>{quiz.title}</td>
                    <td>{new Date(quiz.date).toLocaleDateString()}</td>
                    <td>{new Date(quiz.startTime).toLocaleTimeString()}</td>
                    <td>{new Date(quiz.expireTime).toLocaleTimeString()}</td>
                    {/* <td>{quiz.quizStatus}</td> */}
                    <td><button onClick={() => handleButtonClick(quiz.title)}>Start</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>   
          {flag && 
      <ModalConfirm onClose={handleCloseModal}
             heading = "Confirmation"
             content="Are you sure, You want to start Quiz ?"
             handleConfirmTest = {handleConfirmTest}
      />}

        </div>

        <div className="divider"></div>

        <div className="QuizContainer">
          <h2>Expired Quizzes</h2>
          <div className="QuizList">
            <table>
              <thead className="tableHeader">
                <tr className="tableRow">
                  <th>Name</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>Expiry Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inactiveQuizzes.map((quiz, index) => (
                  <tr key={index} className="quiz">
                    <td>{quiz.title}</td>
                    <td>{new Date(quiz.date).toLocaleDateString()}</td>
                    <td>{new Date(quiz.startTime).toLocaleTimeString()}</td>
                    <td>{new Date(quiz.expireTime).toLocaleTimeString()}</td>
                    <td>
                      <span>{quiz.quizStatus}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizList;
