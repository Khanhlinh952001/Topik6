'use client'
import React, { useState, useRef } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { database } from '@/firebase'; // Import Firebase database instance
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { renderRandomNumbers } from '@/app/utils/randomUtils';
import KeyboardEventHandler from 'react-keyboard-event-handler';

function AddWord() {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [isKoreanKeyboard, setIsKoreanKeyboard] = useState(true);

  const hanInputRef = useRef(null);
  const vietInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'word') {
      setWord(value);
    } else if (name === 'meaning') {
      setMeaning(value);
    }
  };

  const handleAddWord = () => {
    const wordsRef = ref(database, '/vocabulary');

    // Tạo đối tượng từ vựng mới
    const newWord = {
      word: word,
      meaning: meaning
    };

    // Thêm từ vựng vào Firebase
    set(ref(database, 'vocabulary/' + renderRandomNumbers()), newWord)
      .then(() => {
        NotificationManager.success('Thêm từ vựng thành công', 'Thành công');
        // Xóa nội dung trong input sau khi thêm thành công
        setWord('');
        setMeaning('');
      })
      .catch((error) => {
        console.error('Lỗi khi thêm từ vựng: ', error);
        NotificationManager.error('Đã xảy ra lỗi khi thêm từ vựng', 'Lỗi');
      });
  };

  const toggleKeyboardLayout = () => {
    setIsKoreanKeyboard((prevIsKoreanKeyboard) => !prevIsKoreanKeyboard);
  };

  const handleHanInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      vietInputRef.current.focus(); // Focus on Vietnamese input field
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
            ref={hanInputRef}
            placeholder={isKoreanKeyboard ? 'Nhập từ tiếng Hàn' : 'Nhập từ tiếng Việt'}
            className="w-full border border-gray-300 px-3 py-2 text-gray-800 rounded-md mb-2"
          />
          <input
            type="text"
            name="meaning"
            value={meaning}
            onChange={handleInputChange}
            ref={vietInputRef}
            placeholder={isKoreanKeyboard ? 'Nhập nghĩa tiếng Việt' : 'Nhập nghĩa tiếng Hàn'}
            className="w-full border border-gray-300 px-3 py-2 text-gray-800 rounded-md"
          />
        </div>
        <button
          onClick={handleAddWord}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Thêm từ vựng
        </button>
        <KeyboardEventHandler
          handleKeys={['shift+alt']}
          onKeyEvent={toggleKeyboardLayout}
        />
      </div>
    </div>
  );
}

export default AddWord;
