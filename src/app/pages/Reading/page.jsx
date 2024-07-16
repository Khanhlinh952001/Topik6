"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import Reading from "../../../json/Reading.json";
import SetSelection from "../../components/SetSelection";
import { AnswerComponent } from "../../components/AnswerComponent";
import QuestionContent from "../../components/QuestionContent";
import TestingLayout from "../../layouts/TestingLayout";
import '../../styles/style.css'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const ReadingTest = () => {
  const [selectedSet, setSelectedSet] = useState(null);
  const [answers, setAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
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

  const calculateScore = () => {
    const scorePerQuestion = 2;
    return answeredQuestions.reduce((totalScore, questionNumber) => {
      const userAnswer = answers[questionNumber];
      const correctAnswer = questions.find(
        (q) => q.id === questionNumber
      )?.correctAnswer;
      const isCorrect = userAnswer === correctAnswer;

      return totalScore + (isCorrect ? scorePerQuestion : 0);
    }, 0);
  };

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
  // console.log(answeredQuestions)


  const handleSubmit = () => {
    setShowResults(true);
    setShowTracking(false);

    const incorrectQuestions = answeredQuestions.filter((questionNumber) => {
      const userAnswer = answers[questionNumber];
      const correctAnswer = questions.find(
        (q) => q.id === questionNumber
      )?.correctAnswer;
      return userAnswer !== correctAnswer;
    });

    const scores = calculateScore();
    
    setScore(scores);
    NotificationManager.success(`Số điểm của bạn là ${scores}`, 'Kết quả');
  };

  const handleJumpToQuestion = (questionNumber) => {
    const element = document.getElementById(`question${questionNumber}`);
    element.scrollIntoView({ behavior: "smooth" });
  };

  if (!selectedSet) {
    return <SetSelection onSelectSet={setSelectedSet} />;
  }

  return (
   <TestingLayout
    scoreTrackingProps={{
      showTracking,
      timeLeft,
      questionsSet,
      answers,
      handleJumpToQuestion,
      handleSubmit,
      score,
      showResults,
      questions
    }}
    answeredQuestions={answeredQuestions}
    selectedSet={selectedSet}
  >
    <NotificationContainer />
      <div className=" lg:md:mt-32 sm:mt-40 bg-slate-200 w-full topSM">
        {questionsSet.map((question) => {
          const questionNumber = question.id;
          const userAnswer = answers[questionNumber];
          const isIncorrect =
            userAnswer && userAnswer !== question.correctAnswer;

          return (
            <Card
              key={questionNumber}
              id={`question${questionNumber}`}
              className="mb-6 bg-slate-300 rounded-xl"
            >
              <QuestionContent question={question} questionNumber={questionNumber} />

              <div className="my-4 flex justify-center items-center">
                {question.options.map((option, index) => (
                  <AnswerComponent
                    key={index}
                    option={option}
                    optionIndex={index}
                    questionNumber={questionNumber}
                    handleAnswerChange={(qn, selectedAnswer) =>
                      handleAnswerChange(qn, selectedAnswer)
                    }
                    userAnswer={userAnswer}
                    correctAnswer={question.correctAnswer}
                    showResults={showResults}
                  />
                ))}
              </div>

              {showResults && isIncorrect && (
                <div className="flex mb-2 justify-center">
                  <div>
                    <Card className="flex justify-center mb-1">
                      Đáp án đúng:{" "}
                      <span className="text-xl ml-1 text-blue-500">
                        {question.correctAnswer}
                      </span>
                    </Card>
                    <p className="text-gray-400 text-md">
                      Hướng dẫn giải: {question.solution}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </TestingLayout>
  );
};

export default ReadingTest;

