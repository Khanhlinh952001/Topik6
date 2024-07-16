// utils/calculateScore.js
export const calculateScore = (questions, answers, answeredQuestions) => {
    const scorePerQuestion = 2;
    return answeredQuestions.reduce((totalScore, questionNumber) => {
      const userAnswer = answers[questionNumber];
      const correctAnswer = questions.find((q) => q.id === questionNumber)?.correctAnswer;
      const isCorrect = userAnswer === correctAnswer;
  
      return totalScore + (isCorrect ? scorePerQuestion : 0);
    }, 0);
  };
  