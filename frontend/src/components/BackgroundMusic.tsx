import { useEffect, useState, useRef } from 'react';
import { playlist } from '../lib/playlist';
import '../styles/components/BackgroundMusic.css';
import { useLocation } from 'react-router-dom';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [music, setMusic] = useState(playlist[currentHour] || playlist[0]);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const isHomePage = useLocation().pathname === '/'
  const isUserPage = useLocation().pathname === '/user'
  const isLoginPage = useLocation().pathname === '/login'

  useEffect(() => {
    const checkHour = () => {
      const now = new Date();
      const newHour = now.getHours();
      if (newHour !== currentHour) {
        setCurrentHour(newHour);
        setMusic(playlist[newHour] || playlist[0]);
        if (audioRef.current) {
          audioRef.current.load();
          audioRef.current.play();
        }
      }
      return now.getMinutes() === 0;
    };

    let interval: ReturnType<typeof setInterval>;

    if (new Date().getMinutes() === 0) {
      interval = setInterval(checkHour, 60000);
    } else {
      interval = setInterval(() => {
        if (checkHour()) {
          clearInterval(interval);
          interval = setInterval(checkHour, 60000);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [currentHour]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [music]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const adjustedVolume = isUserPage || isLoginPage ? volume / 8 : volume;
      audio.volume = isMuted ? 0 : adjustedVolume;
    }
  }, [volume, isMuted, isUserPage]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} loop autoPlay>
        <source src={music} type="audio/mpeg" />
      </audio>

    {isHomePage ?
        <div className="audio-controls">
          <button onClick={toggleMute} className="audio-button">
            <span className="material-symbols-rounded audio-icon">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>

          <div className="volume-control">
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
        </div>
        : null}
    </div>
  );
}
