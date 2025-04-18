import { useContext } from 'react';
import { TimerContext } from '../contexts/TimerProvider';  // Updated import path

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
