import React, { useState, useEffect, useRef } from 'react';
import { useTimer } from '../hooks/useTimer';
import '../styles/components/Pomodoro.css';
import alarm from '../assets/alarm.mp3';



const Pomodoro: React.FC = () => {
  const { timeLeft, isActive, isPaused, startTimer, pauseTimer, resetTimer, formatTime, isWorkTime } = useTimer();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [endTime, setEndTime] = useState<Date | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(alarm);
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      audioRef.current?.play();
    }
  }, [timeLeft, isActive]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isActive && !isPaused) {
      const now = new Date();
      const end = new Date(now.getTime() + timeLeft * 1000);
      setEndTime(end);
    }
  }, [isActive, isPaused]);

  return (
    <div className='pomodoro-container'>
      <button className='pomodoro-reset' onClick={resetTimer}>
        <span className="material-symbols-rounded pomodoro-reset-icon">refresh</span>
      </button>
      <div className="pomodoro-time">
        <h2 className="pomodoro-time-text">{formatTime(timeLeft)}</h2>
      </div>
      <div className="pomodoro-controls">
        {isPaused ? (
          <button onClick={startTimer}>
            <span className="material-symbols-rounded pomodoro-control-icon">play_arrow</span>
          </button>
        ) : isActive ? (
          <button onClick={pauseTimer}>
            <span className="material-symbols-rounded pomodoro-control-icon">pause</span>
          </button>
        ) : (
          <button onClick={startTimer}>
            <span className="material-symbols-rounded pomodoro-control-icon">play_arrow</span>
          </button>
        )}
      </div>
      <div className="pomodoro-status">
        {isWorkTime ? 
          (isActive ? 
            <>
              <p>Son las {currentTime.getHours()}:{String(currentTime.getMinutes()).padStart(2, '0')}</p>
              <p className="fade-in-delayed">Terminarás la sesión a las {endTime?.getHours()}:{String(endTime?.getMinutes() || 0).padStart(2, '0')}</p>
            </>
            :
            <>
            <p>Son las {currentTime.getHours()}:{String(currentTime.getMinutes()).padStart(2, '0')}</p>
            <p className="fade-out-delayed">Terminarás la sesión a las {endTime?.getHours()}:{String(endTime?.getMinutes() || 0).padStart(2, '0')}</p>
            </>
            
          )
          : (isActive ?
              <>
                <p>Son las {currentTime.getHours()}:{String(currentTime.getMinutes()).padStart(2, '0')}</p>
                <p className="fade-in-delayed">Volverás al trabajo a las {endTime?.getHours()}:{String(endTime?.getMinutes() || 0).padStart(2, '0')}</p>
              </>
              :
              <>
              <p>Son las {currentTime.getHours()}:{String(currentTime.getMinutes()).padStart(2, '0')}</p>
              <p className="fade-out-delayed">Volverás al trabajo a las {endTime?.getHours()}:{String(endTime?.getMinutes() || 0).padStart(2, '0')}</p>
              </>
            )}
      </div>
    </div>
  );
};

export default Pomodoro;
