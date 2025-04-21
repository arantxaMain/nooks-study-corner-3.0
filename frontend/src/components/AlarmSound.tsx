import React, { useEffect, useRef } from 'react';
import { useTimer } from '../hooks/useTimer';
import alarm from '../assets/alarm.mp3';

const AlarmSound: React.FC = () => {
  const { timeLeft, isActive } = useTimer();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(alarm);
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      audioRef.current?.play();
    }
  }, [timeLeft, isActive]);

  return null;
};

export default AlarmSound;