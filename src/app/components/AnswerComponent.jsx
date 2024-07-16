"use client";
import React from 'react'
import '../styles/style.css';
export const AnswerComponent = ({
  option,
  optionIndex,
  questionNumber,
  handleAnswerChange,
  userAnswer,
  correctAnswer,
  showResults,
}) => {
  const isSelected = userAnswer === (optionIndex + 1).toString();
  const isCorrect = correctAnswer === (optionIndex + 1).toString();
  const labelClassNames = `
    block mb-2 lg:md:px-10 sm:px-4 pxSM border py-1 rounded-lg mx-2 text-gray-700 text-xl 
    ${isSelected ? (showResults ? (isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white") : "bg-green-500") : ""}
  `;

  return (
    <label key={optionIndex} className={labelClassNames}>
      <input
        type="checkbox"
        name={`q${questionNumber}`}
        value={(optionIndex + 1).toString()}
        onChange={() => handleAnswerChange(questionNumber, (optionIndex + 1).toString())}
        checked={isSelected}
        className="h-4 w-4 border-gray-300 hidden"
        disabled={showResults}
      />
      {`${optionIndex + 1}. ${option}`}
    </label>
  );
};
