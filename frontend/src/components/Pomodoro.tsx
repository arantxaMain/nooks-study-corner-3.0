import React from 'react';
import { useTimer } from '../hooks/useTimer';
import '../styles/components/Pomodoro.css';

const Pomodoro: React.FC = () => {
  const { timeLeft, isActive, isPaused, startTimer, pauseTimer, resetTimer, formatTime, isWorkTime } = useTimer();

  return (
    <div>
      <button className='pomodoro-reset' onClick={resetTimer}>
        <span className="material-symbols pomodoro-reset-icon">refresh</span>
      </button>
      <div className="pomodoro-time">
        <h2 className="pomodoro-time-text">{formatTime(timeLeft)}</h2>
      </div>
      <div className="pomodoro-controls">
        {isPaused ? (
          <button onClick={startTimer}>
            <span className="material-symbols pomodoro-control-icon">play_arrow</span>
          </button>
        ) : isActive ? (
          <button onClick={pauseTimer}>
            <span className="material-symbols pomodoro-control-icon">pause</span>
          </button>
        ) : (
          <button onClick={startTimer}>
            <span className="material-symbols pomodoro-control-icon">play_arrow</span>
          </button>
        )}
      </div>
      <p className="pomodoro-status">
        {isWorkTime ? 'Tiempo de trabajo' : 'Tiempo de descanso'}
      </p>
    </div>
  );
};

export default Pomodoro;
