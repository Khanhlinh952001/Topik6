"use client"
import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { generateRandomSixDigitNumber } from '../utils/randomUtils';
import { database } from '../firebase/firebase';
import { ref, set } from 'firebase/database';
import 'react-notifications/lib/notifications.css';

export default function FormDialog({ open, onClose, onSubmit, word }) {
  const [meaning, setMeaning] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newWord = {
      word: word,
      meaning: meaning
    };

    // Gửi dữ liệu đến Firebase
    set(ref(database, 'vocabulary/' + generateRandomSixDigitNumber()), newWord)
      .then(() => {
        NotificationManager.success('Thêm từ vựng thành công', 'Thành công');
        setMeaning(''); // Xóa trường nhập liệu
        onSubmit(newWord); // Gọi hàm onSubmit để xử lý dữ liệu mới
        onClose(); // Đóng dialog sau khi gửi dữ liệu
      })
      .catch((error) => {
        console.error('Lỗi khi thêm từ vựng: ', error);
        NotificationManager.error('Đã xảy ra lỗi khi thêm từ vựng', 'Lỗi');
      });
  };

  if (!open) return null;

  return (
    <>
      <NotificationContainer/> 
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Thêm Từ Vựng Mới
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
              onClick={onClose}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleFormSubmit} className="p-4">
            <div className="mb-4">
              <p className="  mb-2 text-gray-800">Xin lổi nhưng tôi chưa biết nghĩa của từ <span className='text-xl font-bold'>{word}</span> xin hãy dạy tôi  </p>
              <h2 className='text-lg text-green-700'>Cảm ơn bạn !</h2>
              <label htmlFor="meaning" className="block text-sm font-medium text-gray-900">
                Nghĩa
              </label>
              <input
                type="text"
                id="meaning"
                name="meaning"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nhập nghĩa của từ"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Thêm từ vựng
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
