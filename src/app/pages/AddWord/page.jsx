"use client";
"use client";
import React, { useState, useRef } from "react";
import { ref, set } from "firebase/database";
import { database } from "@/app/firebase/firebase";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const AddWord = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const vietInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "word") {
      setWord(value);
    } else if (name === "meaning") {
      setMeaning(value);
    }
  };

  const handleAddWord = async () => {
    const formData = new FormData();
    formData.append("entry.1942885652", word);
    formData.append("entry.404995386", meaning);
    try {
      await fetch(
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd6UXVyfJqrfXYEqmaz5Sf0_UlBhajFbhes6YujvcguoKgZiw/formResponse",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
        }
      );
      NotificationManager.success("Từ vựng đã được thêm thành công!");
      setWord("");
      setMeaning("");
    } catch (error) {
      NotificationManager.error("Có lỗi xảy ra khi thêm từ vựng.");
    }
  };

  const handleHanInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      vietInputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <NotificationContainer />
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Thêm từ vựng mới</h2>
        <div className="mb-4">
          <input
            type="text"
            name="word"
            value={word}
            onChange={handleInputChange}
            onKeyDown={handleHanInputKeyDown}
            placeholder={"Nhập từ tiếng Hàn"}
            className="w-full border border-gray-300 px-3 py-2 text-gray-800 rounded-md mb-2"
          />
          <input
            type="text"
            name="meaning"
            value={meaning}
            onChange={handleInputChange}
            placeholder={"Nhập nghĩa tiếng Việt"}
            className="w-full border border-gray-300 px-3 py-2 text-gray-800 rounded-md"
            ref={vietInputRef}
          />
        </div>
        <button
          onClick={handleAddWord}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Thêm từ vựng
        </button>
      </div>
    </div>
  );
};

export default AddWord;
