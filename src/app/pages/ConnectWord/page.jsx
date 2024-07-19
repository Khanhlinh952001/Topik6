"use client";
import React, { useState, useEffect, useMemo } from "react";
import useFirebaseData from "@/app/hooks/useFirebaseData";
import { IoMdAddCircleOutline } from "react-icons/io";
import Link from "next/link";
import FormDialog from "@/app/components/Dialog";
const Game = () => {
  const { data } = useFirebaseData();
  const vocabulary = useMemo(() => {
    return data ? Object.values(data) : [];
  }, [data]);
  const [notification, setNotification] = useState("");
  console.log(notification);

  const [currentWordObj, setCurrentWordObj] = useState({});
  const [inputText, setInputText] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [wordList, setWordList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    console.log("Vocabulary:", vocabulary); // Debugging log
    if (vocabulary.length > 0) {
      const initialWord = getRandomWord();
      console.log("Initial Word:", initialWord); // Debugging log
      setCurrentWordObj(initialWord);
      setWordList([initialWord]);
    }
  }, [vocabulary]);

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isLoading && !gameOver && !dialogOpen) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isLoading && !gameOver) {
      handleTimeout();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, isLoading, gameOver, dialogOpen]);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * vocabulary.length);
    return vocabulary[randomIndex];
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeLeft(60);

    if (gameOver) {
      setMessage("Hết giờ! Bắt đầu lượt mới...");
      return startNewRound();
    }

    const playerWord = inputText.trim();
    if (playerWord) {
      const wordExists = vocabulary.some((entry) => entry.word === playerWord);

      if (!wordExists) {
        setNotification("Từ bạn nhập không có trong từ vựng!");
        setDialogOpen(true);
        return;
      }

      const lastLetterCurrent = getLastLetter(currentWordObj.word);
      const firstLetterInput = getFirstLetter(playerWord);

      if (firstLetterInput === lastLetterCurrent) {
        setMessage("Chính xác!");
        setScore(score + 2);

        const playerWordObj = {
          word: playerWord,
          meaning: getMeaning(playerWord),
        };
        setWordList([...wordList, playerWordObj]);
        setCurrentWordObj(playerWordObj);

        setIsLoading(true);
        setTimeout(() => {
          const aiWordObj = getAITurn(playerWord);
          if (aiWordObj) {
            setWordList((prevList) => [...prevList, aiWordObj]);
            setCurrentWordObj(aiWordObj);
            setMessage("");
          } else {
            setMessage("AI không tìm thấy từ phù hợp!");
            setWin(true);
          }
          setIsLoading(false);
        }, 1000);
      } else {
        setMessage(
          `Sai rồi! Hãy nhập từ bắt đầu bằng chữ "${lastLetterCurrent}"`
        );
      }
    } else {
      setMessage("Hãy nhập ít nhất hai từ!");
    }

    setInputText("");
  };

  const handleTimeout = () => {
    setMessage("Hết giờ! Bạn đã thua cuộc.");
    setGameOver(true);
  };

  const getLastLetter = (word) => {
    return word.slice(-1);
  };

  const getFirstLetter = (word) => {
    return word[0];
  };

  const getAITurn = (currentWord) => {
    const possibleWords = vocabulary.filter((entry) => {
      const lastLetterCurrent = getLastLetter(currentWord);
      const firstLetterNext = getFirstLetter(entry.word);
      return lastLetterCurrent === firstLetterNext;
    });

    if (possibleWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * possibleWords.length);
      const aiWordObj = {
        ...possibleWords[randomIndex],
        meaning: possibleWords[randomIndex].meaning,
      };
      return aiWordObj;
    }

    return null;
  };

  const getMeaning = (word) => {
    const foundWord = vocabulary.find((entry) => entry.word === word);
    return foundWord ? foundWord.meaning : "";
  };

  const startNewRound = () => {
    setGameOver(false);
    setCurrentWordObj(getRandomWord());
    setWordList([]);
    setScore(0);
    setTimeLeft(60);
    setMessage("");
  };

  if (!currentWordObj.word) {
    return (
      <div className="h-screen bg-gradient-to-r from-pink-500 to-violet-500 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg text-center">
          <div className="relative flex justify-center items-center">
            <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
            <img
              src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
              className="rounded-full h-28 w-28"
            />
          </div>
        </div>
      </div>
    );
  }

  if (win) {
    return (
      <div className="h-screen bg-gradient-to-r from-pink-500 to-violet-500 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg text-center">
          <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Bạn Đã Chiến Thắng{" "}
          </h1>
          <h1 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            {score}
          </h1>
          {gameOver && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={startNewRound}
            >
              Bắt đầu lại
            </button>
          )}
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="h-screen bg-gradient-to-r from-pink-500 to-violet-500 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg text-center">
          <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Bạn Đã Thua{" "}
          </h1>
          <h1 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            {score}
          </h1>
          {gameOver && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={startNewRound}
            >
              Bắt đầu lại
            </button>
          )}
        </div>
      </div>
    );
  }
  const handleCloseDialog = () => {
    setDialogOpen(false);
    // Cộng 2 điểm cho người dùng
  };

  const handleDialogSubmit = (newWordData) => {
    // Xử lý dữ liệu từ dialog
    console.log("Thêm từ mới:", newWordData);
    setScore((prevScore) => prevScore + 2);

    // Reset thời gian còn lại
    setTimeLeft(60);
    setMessage("Chính xác!");
    handleCloseDialog();
  };
  return (
    <div className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center">
      <FormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleDialogSubmit}
        word={inputText} // Truyền từ cần thêm
      />
      <div className="fixed bottom-10 z-50 right-10">
        <Link href={"/pages/AddWord"}>
          <button>
            <IoMdAddCircleOutline className="text-5xl bg-blue-500 p-2 rounded-full" />
          </button>
        </Link>
      </div>
      <div className="bg-white p-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Game Nối Từ Tiếng Hàn
        </h1>
        <div className="text-gray-800 text-xl w-full flex justify-center">
          <p className="bg-green-500 text-white px-2 py-1 rounded-full">
            {timeLeft}s
          </p>
        </div>
        {isLoading ? (
          <p className="text-gray-500 mt-2">AI đang suy nghĩ...</p>
        ) : (
          <p className="text-gray-600 mb-4">
            Từ hiện tại: {currentWordObj.word} (
            {getMeaning(currentWordObj.word)})
          </p>
        )}
        <h1 className="text-gray-800">
          {" "}
          Bắt đầu bằng từ : {currentWordObj.word.slice(-1)}
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 text-gray-800 rounded-md mr-2"
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
              gameOver ? "bg-slate-800 text-black hover:bg-slate-800" : ""
            }`}
            disabled={isLoading || gameOver}
          >
            Đồng ý
          </button>
        </form>
        {message && <p className="text-red-500 mt-2">{message}</p>}
        <p className="text-green-500 mt-4">Điểm số: {score}</p>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Danh sách các từ đã nối:</h2>
          <ul className="list-disc list-inside">
            {wordList.map((wordObj, index) => (
              <li key={index} className="text-gray-700">
                {wordObj.word} ({getMeaning(wordObj.word)})
              </li>
            ))}
          </ul>
        </div>
        {gameOver && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={startNewRound}
          >
            Bắt đầu lại
          </button>
        )}
      </div>
    </div>
  );
};

export default Game;
