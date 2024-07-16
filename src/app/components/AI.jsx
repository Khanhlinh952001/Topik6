// src/AI.js
import React from 'react';

const AI = ({ initialWord, words }) => {
  const getRandomWord = (wordList) => {
    // Lấy một từ ngẫu nhiên từ danh sách từ vựng ban đầu
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };

  const getNextWord = (currentWord) => {
    // Tìm từ bắt đầu bằng chữ cái cuối cùng của từ hiện tại
    const lastChar = currentWord[currentWord.length - 1];
    for (let word of words) {
      if (word[0] === lastChar) {
        return word;
      }
    }
    // Nếu không tìm thấy từ thích hợp, AI sẽ chọn một từ ngẫu nhiên từ danh sách ban đầu
    const randomWord = getRandomWord(initialWord);
    return randomWord;
  };

  // Lấy từ tiếp theo ban đầu
  const initialAIWord = getRandomWord(initialWord);

  const aiWord = getNextWord(initialAIWord);

  return (
    <div>
      {aiWord && (
        <div>
          <h3>AI đưa ra từ tiếp theo:</h3>
          <p>{aiWord}</p>
        </div>
      )}
    </div>
  );
};

export default AI;

