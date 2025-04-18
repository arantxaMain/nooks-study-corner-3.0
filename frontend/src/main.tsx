import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import BackgroundMusic from './components/BackgroundMusic.tsx'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <BackgroundMusic />
  </StrictMode>,
)
