import React, { useRef, useState } from 'react';
import '../styles/style.css';  // Đảm bảo bạn đã import file CSS
import { IoIosPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
const AudioPlayer = ({ audio }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="right-4 bottom-5 fixed z-50">
      {audio ? (
        <div>
          <audio ref={audioRef}>
            <source src={audio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <button
            className="bg-blue-600 text-white text-xl p-3 rounded-full"
            onClick={handlePlayPause}
          >
            {isPlaying ? <IoIosPause/> : <FaPlay className='text-md'/>}
          </button>
        </div>
      ) : (
        <p>No audio available</p>
      )}
    </div>
  );
};

export default AudioPlayer;
