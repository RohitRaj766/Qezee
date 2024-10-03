import React, { useState, useEffect } from "react";
import "./Testpage.scss";
import ModalResult from "../../common/ModalResult";
import ModalConfirm from "../../common/ModalConfirm";
import QuizSection from "./QuizSection";
import Header from "./Header";

const questions = [
  {
    question: "What is the output of printf('%d', 10 + 20); in C?",
    options: ["1020", "30", "Error", "None of the above"],
    correctAnswer: 1,
  },
  {
    question: "Which data structure uses LIFO (Last In First Out) principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: 1,
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n^2)", "O(log n)", "O(1)"],
    correctAnswer: 2,
  },
  {
    question: "Which of the following is not a programming language?",
    options: ["Python", "HTML", "Java", "C++"],
    correctAnswer: 1,
  },
  {
    question: "Who is known as the father of the C programming language?",
    options: [
      "James Gosling",
      "Bjarne Stroustrup",
      "Dennis Ritchie",
      "Guido van Rossum",
    ],
    correctAnswer: 2,
  },
  {
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Strong Question Language",
      "Structured Question Language",
      "Standard Query Language",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which data structure uses FIFO (First In First Out) principle?",
    options: ["Stack", "Queue", "Array", "Tree"],
    correctAnswer: 1,
  },
  {
    question: "What is the time complexity of bubble sort in the worst case?",
    options: ["O(n)", "O(n^2)", "O(log n)", "O(n log n)"],
    correctAnswer: 1,
  },
  {
    question: "Which programming language is primarily used for web development?",
    options: ["Python", "JavaScript", "C", "C++"],
    correctAnswer: 1,
  },
  {
    question: "What is the main purpose of an operating system?",
    options: [
      "To manage computer hardware and software resources",
      "To perform arithmetic operations",
      "To connect to the internet",
      "To write code",
    ],
    correctAnswer: 0,
  },
  {
    question: "What does DSA stand for in computer science?",
    options: [
      "Data Structure Algorithm",
      "Digital System Architecture",
      "Dynamic Software Analysis",
      "Data Science and Analysis",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which of the following is a linear data structure?",
    options: ["Tree", "Graph", "Array", "Heap"],
    correctAnswer: 2,
  },
  {
    question: "Which of the following is not an OOP concept?",
    options: ["Inheritance", "Encapsulation", "Polymorphism", "Compilation"],
    correctAnswer: 3,
  },
  {
    question: "What is the primary function of a compiler?",
    options: [
      "To convert high-level language code to machine code",
      "To execute programs",
      "To manage system resources",
      "To debug code",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which algorithm is used to find the shortest path in a graph?",
    options: [
      "Binary Search",
      "Bubble Sort",
      "Dijkstra's Algorithm",
      "Depth-First Search",
    ],
    correctAnswer: 2,
  },
  {
    question: "Which of the following is a non-linear data structure?",
    options: ["Array", "Stack", "Queue", "Tree"],
    correctAnswer: 3,
  },
  {
    question: "What is the use of the 'break' statement in C?",
    options: [
      "To exit a loop or switch statement",
      "To continue to the next iteration of a loop",
      "To define a function",
      "To declare a variable",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which of the following sorting algorithms has the best average time complexity?",
    options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
    correctAnswer: 1,
  },
  {
    question: "What is the main characteristic of a stack data structure?",
    options: ["FIFO", "LIFO", "Random Access", "Sequential Access"],
    correctAnswer: 1,
  },
  {
    question: "Which programming language is known for its simplicity and readability?",
    options: ["C", "C++", "Java", "Python"],
    correctAnswer: 3,
  },
];





const Testpage = (props) => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalvisible, setIsModalVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const shuffledQuestions = shuffleArray(
      questions.map((q) => {
        const shuffledOptions = shuffleArray(q.options);
    const correctAnswerIndex = shuffledOptions.indexOf(q.options[q.correctAnswer]);
        return {
          ...q,
          options:shuffledOptions,
          correctAnswer:correctAnswerIndex, 
        };
      })
    );
  
    setShuffledQuestions(shuffledQuestions);
  }, []);

  const shuffleArray = (array) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const handleSubmit = () => {
    setIsModalVisible(true);
  };

  const handleConfirmSubmit = () => {
    setIsModalVisible(false);
    setShowResult(true);
    setIsModalOpen(true);
  };

  const calculateScore = () => {
    return shuffledQuestions.reduce((score, question, index) => {
      const userAnswer =parseInt(answers[index],10);
      if (userAnswer === question.correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsModalOpen(false);
    props.testStarted(false);
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
  };

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>;
  }

 



  return (
    <div className="testpage">
      <Header/>
      <p className="heading">MOCK-TEST</p>
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
          content="Are you sure you want to submit your test?"
          handleConfirmTest={handleConfirmSubmit}
          onClose={() => setIsModalVisible(false)}
        />
      )}

      {showResult && isModalOpen && (
        <ModalResult
          heading="Result"
          totalscore={`Your score is ${calculateScore()} out of ${
            questions.length
          }`}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Testpage;
