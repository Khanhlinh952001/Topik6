'use client'
/// src/Game.js
import React, { useState, useEffect } from 'react';
import vocabulary from '../../components/vocabulary'; // Import danh sách từ vựng

const Game = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [usedWords, setUsedWords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [aiWord, setAIWord] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * vocabulary.length);
    const initialWord = vocabulary[randomIndex].word;
    setCurrentWord(initialWord);
    setUsedWords([initialWord]);
    setAIWord('');
    setErrorMessage('');
    setPlayerScore(0);
    setAiScore(0);
    setGameOver(false);
  };

  const getLastChar = (word) => {
    return word.charAt(word.length - 1);
  };

  const runAI = () => {
    const unusedWords = vocabulary.filter(word => !usedWords.includes(word.word));
    let aiNextWord = '';

    for (let word of unusedWords) {
      if (word.word.charAt(0) === getLastChar(currentWord)) {
        aiNextWord = word.word;
        break;
      }
    }

    if (!aiNextWord) {
      setAIWord('');
      setErrorMessage('AI không thể tiếp tục, AI thua cuộc!');
      setGameOver(true);
      return;
    }

    setAIWord(aiNextWord);
    setUsedWords([...usedWords, aiNextWord]);
    setAiScore(aiScore + 1);
  };

  const handlePlayerWord = (playerWord) => {
    if (gameOver) {
      setErrorMessage('Trò chơi đã kết thúc, hãy bắt đầu lại!');
      return;
    }

    const lastChar = getLastChar(currentWord);
    if (playerWord.charAt(0) !== lastChar) {
      setErrorMessage(`Từ "${playerWord}" phải bắt đầu bằng chữ cái cuối cùng của từ "${currentWord}".`);
      return;
    }

    if (usedWords.includes(playerWord)) {
      setErrorMessage(`Từ "${playerWord}" đã được sử dụng.`);
      return;
    }

    setCurrentWord(playerWord);
    setUsedWords([...usedWords, playerWord]);
    setErrorMessage('');

    setPlayerScore(playerScore + 1);
  };

  useEffect(() => {
    if (currentWord !== '') {
      runAI(); // Chạy AI sau khi người chơi nhập từ hợp lệ
    }
  }, [currentWord]);

  useEffect(() => {
    if (gameOver) {
      if (playerScore > aiScore) {
        setErrorMessage('Chúc mừng, bạn đã thắng!');
      } else if (aiScore > playerScore) {
        setErrorMessage('Bạn đã thua, hãy thử lại!');
      } else {
        setErrorMessage('Trận đấu kết thúc với kết quả hòa nhau!');
      }
    }
  }, [gameOver, playerScore, aiScore]);

  return (
    <div>
      <h1>Trò chơi nối từ tiếng Hàn</h1>
      <p>Từ hiện tại: {currentWord}</p>
      <p>AI đưa ra từ tiếp theo: {aiWord}</p>
      <p>Điểm của bạn: {playerScore}</p>
      <p>Điểm của AI: {aiScore}</p>
      <p>{errorMessage}</p>
      <input type="text" onChange={(e) => handlePlayerWord(e.target.value)} />
      <button onClick={startGame}>Bắt đầu lại</button>
    </div>
  );
};

export default Game;
