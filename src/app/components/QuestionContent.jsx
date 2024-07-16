// components/QuestionContent.js
import React from 'react';

const QuestionContent = ({ question, questionNumber }) => {
  return (
    <div>
      <h1 className="mb-2 text-gray-700 ml-4 lg:text-2xl sm:xl mt-4">
        {question.type}
      </h1>
      <div className="container">
        <div className="flex justify-center">
          <img
            src={question.content}
            alt={`Câu hỏi ${questionNumber}`}
            className="mb-2 lg:p-4 sm:p-0 bg-slate-100 lg:w-10/12 sm:w-full rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionContent;
