import { useEffect, useState } from 'react';
import '../styles/components/DayNightCycle.css';

export default function DayNightCycle() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const calculateRotation = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      return ((hours - 8 + minutes / 60) * 15);
    };

    setRotation(calculateRotation());

    const interval = setInterval(() => {
      setRotation(calculateRotation());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="day-night-cycle">
      <div 
        className="orbit" 
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="moon"></div>
        <div className="sun"></div>
      </div>
    </div>
  );
}