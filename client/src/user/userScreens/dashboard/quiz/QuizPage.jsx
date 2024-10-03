import React from 'react';
import Header from '../mocktest/testpage/Header';
import QuizSection from '../mocktest/testpage/QuizSection';
import ModalConfirm from '../common/ModalConfirm';
import ModalResult from '../common/ModalResult';
import "./QuizPage.scss";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { submitResultRequest, userAttemptRequest } from '../../../../actions';
import Loader from '../../../components/loader/Loader';



const QuizPage = (props) => {
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalvisible, setIsModalVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);
    const quizQuestion=useSelector(state=>state.auth.quizData);
    const quizQuestionList=useSelector(state=>state.auth.quizData);
    const userData=useSelector(state=>state.auth.user.LoggedInUser);
    const quizError=useSelector(state=>state.auth.quizError);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const shuffleObjectEntries = (obj) => {
      const entries = Object.entries(obj);
      const shuffledEntries = shuffleArray(entries);
      return Object.fromEntries(shuffledEntries);
    };

    
    useEffect(() => {
      if (quizQuestion && quizQuestion.questions) {
        const shuffled = shuffleArray(
          quizQuestion.questions.map(q => ({
            ...q,
            options: shuffleObjectEntries(q.options),
          }))
        );
        setShuffledQuestions(shuffled);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizQuestion]);

    const shuffleArray = (array) => {
      return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    };
  
    const handleSubmit = () => {
      setIsModalVisible(true);
    };
  
    let notattempted = shuffledQuestions.length - Object.keys(answers).length;
    let wrong = shuffledQuestions.length - notattempted;
    const handleConfirmSubmit = () => {
      setIsModalVisible(false);
      setShowResult(true);
      setIsModalOpen(true);

      const score=calculateScore();
      const scoreData={
        quizId: quizQuestion._id,
        quizStatus:"completed",
        quizTopic: quizQuestion.title,
        correct: score,
        wrong: wrong,
        notattempted: notattempted
      };
      
      const attemptData={
        quizId: quizQuestionList._id,
        userId: userData._id,
        name: userData.firstname +" "+ userData.lastname,
        enrollment: userData.enrollment,
        correct: score,
        wrong: wrong,
        notattempted: notattempted
      };

      dispatch(submitResultRequest(scoreData));
      dispatch(userAttemptRequest(attemptData));
    };
  
    const calculateScore = () => {
      return shuffledQuestions.reduce((score, question, index) => {
        if (answers[index] === question.correctAnswer) {
          wrong = wrong - 1; 
          return score + 1;
        }
        return score;
      }, 0);
    };
  
    const handleCloseModal = () => {
      setIsModalVisible(false);
      setIsModalOpen(false);
    navigate('/dashboard/quizzes');
    
    };
  
    const handleQuestionClick = (index) => {
      setCurrentQuestion(index);
    };
  
    if (shuffledQuestions.length === 0) {
      return <div><Loader/></div>;
    }

    if (quizError) {
      return <div>Error: {quizError}</div>;
    }

    if (!shuffledQuestions.length) {
      return <div>No Questions Available</div>;
    }
  
  return (
    <div className="quizpage">
    <Header/>
    <p className="heading">{quizQuestion.title}</p>
    <QuizSection
      shuffledQuestions={shuffledQuestions}
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}
      answers={answers}
      setAnswers={setAnswers}
      setShowResult={setShowResult}
      setIsModalOpen={setIsModalOpen}
      timeLeft={timeLeft}
      setTimeLeft={setTimeLeft}
      handleQuestionClick={handleQuestionClick}
      handleSubmit={handleSubmit}
    />
    {isModalvisible && (
      <ModalConfirm
        heading="Confirmation"
        content="Are you sure you want to submit your quiz?"
        handleConfirmTest={handleConfirmSubmit}
        onClose={() => setIsModalVisible(false)}
      />
    )}
    {showResult && isModalOpen && (
      <ModalResult
        heading="Result"
        totalscore={`Your score is ${calculateScore()} out of ${
          shuffledQuestions.length
        }`}
        onClose={handleCloseModal}
      />
    )}
  </div>
  )
}

export default QuizPage