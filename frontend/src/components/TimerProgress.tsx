import React from 'react';
import { Progress } from './Progress';
import { ProgressBackwards } from './ProgressBackwards';
import { useTimer } from '../hooks/useTimer';

const TimerProgress: React.FC = () => {
  const { progress } = useTimer();
  const { isWorkTime } = useTimer();

  if (isWorkTime) {
    return <Progress value={progress} />;   
  } else {
    return <ProgressBackwards value={progress} />;
  }

  
};

export default TimerProgress;