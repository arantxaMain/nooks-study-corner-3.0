import { useEffect, useState, useRef } from 'react';
import { playlist } from '../lib/playlist';
import '../styles/components/BackgroundMusic.css';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());  
  const [music, setMusic] = useState(playlist[currentHour] || playlist[0]);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHour = new Date().getHours();
      if (newHour !== currentHour) {
        setCurrentHour(newHour);
        setMusic(playlist[newHour] || playlist[0]);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [currentHour]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} loop autoPlay>
        <source src={music} type="audio/mpeg" />
      </audio>
      
      <button onClick={toggleMute} className="mute-button">
        <span className="material-symbols-rounded">
          {isMuted ? 'volume_off' : 'volume_up'}
        </span>
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="volume-slider"
      />
    </div>
  );
}
