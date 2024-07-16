import React from 'react';
import { Card } from '@mui/material';

const ScoreTracking = ({
  showTracking,
  timeLeft,
  questionsSet,
  answers,
  handleJumpToQuestion,
  handleSubmit,
  score ,
  showResults,
  answeredQuestions,
  questions,
}) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="pb-10 bg-white container mx-auto">
      {showTracking && (
        <div className="text-center">
          <h5 className="text-lg font-medium text-gray-700">Bảng theo dõi:</h5>
          <span className="text-gray-500">{formatTime(timeLeft)} phút</span>
          <ul className="list-none flex flex-wrap">
            {questionsSet.map((question, index) => (
              <li key={question.id} className="m-1 w-3/12">
                <Card className={`border-b p-1 ${answers[question.id] ? 'bg-green-500' : ''}`}>
                  <button
                    className="text-black rounded"
                    onClick={() => handleJumpToQuestion(question.id)}
                  >
                    <span className="ml-1">{question.id}</span>
                    {answers[question.id] ? (
                      <span className="font-bold ml-1 bg-green-500 text-white py-2 px-3 rounded-sm ">
                         {answers[question.id]}
                      </span>
                    ) : (
                      <span className="font-bold text-gray-400 ml-2 rounded-sm ">?</span>
                    )}
                  </button>
                  {index % 5 === 0 && <br />}
                </Card>
              </li>
            ))}
          </ul>
          <button className="bg-blue-500 text-white px-6 py-3 rounded mt-4 mr-10" onClick={handleSubmit}>
            Kiểm Tra Đáp Án
          </button>
        </div>
      )}

     {showResults && (
        <div className="flex justify-center text-center pb-10">
          <div>
            <h1 className="text-xl mb-4 mt-8 pt-4 text-gray-500">
              Chúc mừng bạn: <span className="text-2xl font-bold text-green-600">{score}</span> Điểm
            </h1>
            <h5 className="text-gray-900">Kiểm Tra đáp án</h5>
            <p className="text-gray-400 text-sm">Xanh là đúng</p>
            <p className="text-gray-400 text-sm">Đỏ là sai</p>
            <ul className="list-none flex flex-wrap">
              {answeredQuestions && answeredQuestions.map((questionNumber, index) => (
                <li key={questionNumber} className="m-1 w-3/12">
                  <Card className="border-b p-1">
                    <div className="flex">
                      <button
                        className="text-black w-20 flex justify-between rounded"
                        onClick={() => handleJumpToQuestion(questionNumber)}
                      >
                        <span className="mr-1">{questionNumber}</span>
                        <span
                          className={`${
                            answers[questionNumber] ===
                            questions.find((q) => q.id === questionNumber)?.correctAnswer
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          } text-white px-2 rounded font-normal`}
                        >
                          {answers[questionNumber]}
                        </span>
                      </button>
                    </div>
                  </Card>
                  {index % 5 === 4 && <br />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreTracking;
