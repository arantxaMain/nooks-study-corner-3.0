import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import BackgroundMusic from './components/BackgroundMusic.tsx'
import TimerProgress from './components/TimerProgress'
import { TimerProvider } from './contexts/TimerProvider'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <BackgroundMusic />
    <TimerProvider>
      <TimerProgress />
    </TimerProvider>
  </StrictMode>,
)
