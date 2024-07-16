'use client'
import { useState, useEffect } from "react";
import Reading from "../../json/Reading.json";

const useQuiz = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedSet, setSelectedSet] = useState(null);
  const [answers, setAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questionsSet, setQuestionsSet] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showTracking, setShowTracking] = useState(true);
  const [score, setScore] = useState();
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    switch (selectedSet) {
      case 1:
        setQuestionsSet(Reading.Reading83);
        break;
      case 2:
        setQuestionsSet(Reading.De1);
        break;
      case 3:
        setQuestionsSet(Reading.De2);
        break;
      case 4:
        setQuestionsSet(Reading.De3);
        break;
      case 5:
        setQuestionsSet(Reading.De4);
        break;
      case 6:
        setQuestionsSet(Reading.De5);
        break;
      case 7:
        setQuestionsSet(Reading.De6);
        break;
      case 8:
        setQuestionsSet(Reading.De7);
        break;
      case 9:
        setQuestionsSet(Reading.De8);
        break;
      default:
        setQuestionsSet(Reading.Reading83);
    }
  }, [selectedSet]);

  useEffect(() => {
    setQuestions(questionsSet);
  }, [questionsSet]);

  const handleAnswerChange = (questionNumber, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionNumber]: selectedAnswer,
    }));

    if (!answeredQuestions.includes(questionNumber)) {
      setAnsweredQuestions((prevQuestions) => [
        ...prevQuestions,
        questionNumber,
      ]);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    setShowTracking(false);
    const scores = calculateScore(questions, answers, answeredQuestions);
    alert(scores);
    setScore(scores);
    setIsCorrect(
      answeredQuestions.filter((qn) => answers[qn] !== questions.find((q) => q.id === qn)?.correctAnswer).length === 0
    );
  };

  const handleJumpToQuestion = (questionNumber) => {
    const element = document.getElementById(`question${questionNumber}`);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return {
    expanded,
    setExpanded,
    selectedSet,
    setSelectedSet,
    answers,
    setAnswers,
    answeredQuestions,
    setAnsweredQuestions,
    showResults,
    setShowResults,
    isCorrect,
    setIsCorrect,
    elapsedTime,
    setElapsedTime,
    questionsSet,
    setQuestionsSet,
    questions,
    setQuestions,
    showTracking,
    setShowTracking,
    score,
    setScore,
    timeLeft,
    setTimeLeft,
    handleAnswerChange,
    handleSubmit,
    handleJumpToQuestion,
  };
};

export default useQuiz;
