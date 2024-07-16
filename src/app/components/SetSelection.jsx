"use client";
import React, { useState } from "react";

const SetSelection = ({ onSelectSet }) => {
  const [selectedSet, setSelectedSet] = useState(1);

  return (
    <div className="bg-[#e1e8f0] h-screen lg:block text-align bg-gradient-to-r from-pink-500 to-violet-500">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-8 rounded">
          <h1 className="text-3xl font-bold mb-4 text-black mx-4">Chọn Bộ Đề Trước Khi Thi</h1>
          <div className="flex justify-around">
            <select
              className="border rounded-md text-gray-700 h-10 mt-8 bg-slate-300 p-2"
              onChange={(e) => setSelectedSet(Number(e.target.value))}
            >
              <option value={1}>Bộ đề 83</option>
              <option value={2}>Bộ đề 1</option>
              <option value={3}>Bộ đề 2</option>
              <option value={4}>Bộ đề 3</option>
              <option value={5}>Bộ đề 4</option>
              <option value={6}>Bộ đề 5</option>
              <option value={7}>Bộ đề 6</option>
              <option value={8}>Bộ đề 7</option>
              <option value={9}>Bộ đề 91</option>
            </select>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded mt-4 ml-8"
              onClick={() => onSelectSet(selectedSet)}
            >
              Bắt đầu Thi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetSelection;
