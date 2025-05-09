import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthProvider';

interface TimerContextType {
  timeLeft: number;
  isActive: boolean;
  isPaused: boolean;
  progress: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  formatTime: (seconds: number) => string;
  isWorkTime: boolean;
  workDuration: number;
  breakDuration: number;
}

export const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { user } = useAuth();
  const defaultWorkDuration = (user?.workDuration || 25 * 60);
  const defaultBreakDuration = (user?.breakDuration || 5 * 60);
  
  const [timeLeft, setTimeLeft] = useState(defaultWorkDuration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);

  const currentDuration = isWorkTime ? defaultWorkDuration : defaultBreakDuration;
  const progress = ((currentDuration - timeLeft) / currentDuration) * 100;

  useEffect(() => {
    let interval: number;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (isWorkTime) {
        alert('Hora de procrastinar legalmente');
      } else {
        alert('¡De vuelta al trabajo!');
      }
      togglePhase();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const togglePhase = () => {
    setIsWorkTime((prev) => !prev);
    setTimeLeft(!isWorkTime ? defaultWorkDuration : defaultBreakDuration);
  };

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsActive(false);
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(defaultWorkDuration);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(isWorkTime ? defaultWorkDuration : defaultBreakDuration);
    }
  }, [user?.workDuration, user?.breakDuration]);

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        isActive,
        isPaused,
        progress,
        startTimer,
        pauseTimer,
        resetTimer,
        formatTime,
        isWorkTime,
        workDuration: defaultWorkDuration,
        breakDuration: defaultBreakDuration,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
