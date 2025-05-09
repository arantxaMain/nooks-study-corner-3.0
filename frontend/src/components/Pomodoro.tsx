import React, { useState, useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { api } from '../services/api';
import '../styles/components/Pomodoro.css';

const Pomodoro: React.FC = () => {
  const { timeLeft, isActive, isPaused, startTimer, pauseTimer, resetTimer, formatTime, isWorkTime } = useTimer();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [studyTimeAccumulated, setStudyTimeAccumulated] = useState<number>(0);
  const [lastTimeCheck, setLastTimeCheck] = useState<number | null>(null);
  const [lastPauseTime, setLastPauseTime] = useState<number | null>(null);

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
    } else if (!isActive) {
      setEndTime(null);
    }
  }, [isActive, isPaused]);

  useEffect(() => {
    if (isWorkTime && isActive && !isPaused) {
      const interval = setInterval(() => {
        setStudyTimeAccumulated(prev => prev + 1);
      }, 60000); // Incrementar cada minuto
      return () => clearInterval(interval);
    }
  }, [isWorkTime, isActive, isPaused]);

  useEffect(() => {
    if (isWorkTime && isActive) {
      if (isPaused) {
        setLastPauseTime(timeLeft);
      } else if (lastPauseTime !== null) {
        const studiedMinutes = Math.ceil((lastPauseTime - timeLeft) / 60);
        if (studiedMinutes > 0) {
          const today = new Date().toISOString().split('T')[0];
          api.updateStudyMinutes(today, studiedMinutes);
        }
        setLastPauseTime(null);
      }
    }
  }, [isPaused, isWorkTime, isActive, timeLeft, lastPauseTime]);

  useEffect(() => {
    if (timeLeft === 0 && isWorkTime && isActive) {
      const today = new Date().toISOString().split('T')[0];
      const studiedMinutes = Math.ceil(studyTimeAccumulated);
      if (studiedMinutes > 0) {
        api.updateStudyMinutes(today, studiedMinutes);
        setStudyTimeAccumulated(0);
      }
    }
  }, [timeLeft, isWorkTime, isActive, studyTimeAccumulated]);

  const saveStudyTime = (minutes: number) => {
    if (minutes > 0) {
      const today = new Date().toISOString().split('T')[0];
      console.log('Intentando guardar tiempo de estudio...'); 
      console.log(`Minutos a guardar: ${minutes}`);
      console.log(`Fecha actual: ${today}`);
      api.updateStudyMinutes(today, minutes)
        .then(response => {
          console.log('Respuesta del servidor:', response);
        })
        .catch(error => {
          console.error('Error al guardar tiempo:', error);
        });
    } else {
      console.log('No se guardó tiempo porque los minutos son 0 o negativos:', minutes);
    }
  };

  useEffect(() => {
    if (isWorkTime && isActive && !isPaused) {
      console.log('Iniciando sesión de trabajo');
      setLastTimeCheck(timeLeft);
    } else if (isWorkTime && lastTimeCheck !== null) {
      const initialTime = lastTimeCheck;
      const currentTimeLeft = timeLeft;
      const elapsedSeconds = initialTime - currentTimeLeft;
      const studiedMinutes = Math.floor(elapsedSeconds / 60);
      
      console.log('Datos del cálculo:', {
        initialTime,
        currentTimeLeft,
        elapsedSeconds,
        studiedMinutes
      });

      if (studiedMinutes > 0) {
        saveStudyTime(studiedMinutes);
      }
      setLastTimeCheck(null);
    }
  }, [isWorkTime, isActive, isPaused]);

  const handleReset = () => {
    if (isWorkTime && lastTimeCheck !== null) {
      const initialTime = lastTimeCheck;
      const currentTimeLeft = timeLeft;
      const elapsedSeconds = initialTime - currentTimeLeft;
      const studiedMinutes = Math.floor(elapsedSeconds / 60);

      console.log('Datos del reset:', {
        initialTime,
        currentTimeLeft,
        elapsedSeconds,
        studiedMinutes
      });

      if (studiedMinutes > 0) {
        saveStudyTime(studiedMinutes);
      }
    }
    resetTimer();
    setLastTimeCheck(null);
  };

  return (
    <div className='pomodoro-container'>
      <button className='pomodoro-reset' onClick={handleReset}>
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
              {endTime && <p className="fade-in-delayed">Terminarás la sesión a las {endTime.getHours()}:{String(endTime.getMinutes()).padStart(2, '0')}</p>}
            </>
            :
            <>
              <p>Son las {currentTime.getHours()}:{String(currentTime.getMinutes()).padStart(2, '0')}</p>
              {endTime && <p className="fade-out-delayed">Terminarás la sesión a las {endTime.getHours()}:{String(endTime.getMinutes()).padStart(2, '0')}</p>}
            </>
          )
          : (isActive ?
              <>
                <p>Son las {currentTime.getHours()}:{String(currentTime.getMinutes()).padStart(2, '0')}</p>
                {endTime && <p className="fade-in-delayed">Volverás al trabajo a las {endTime.getHours()}:{String(endTime.getMinutes()).padStart(2, '0')}</p>}
              </>
              :
              <>
                <p>Son las {currentTime.getHours()}:{String(currentTime.getMinutes()).padStart(2, '0')}</p>
                {endTime && <p className="fade-out-delayed">Volverás al trabajo a las {endTime.getHours()}:{String(endTime.getMinutes()).padStart(2, '0')}</p>}
              </>
            )}
      </div>
    </div>
  );
};

export default Pomodoro;
