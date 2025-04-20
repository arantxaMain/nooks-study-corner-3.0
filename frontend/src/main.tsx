import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <header className="header">
      <h1>Nook's Study Corner</h1>
      <span className="material-symbols-rounded">
        account_circle
      </span>
    </header>
    <App />
    <footer className="footer">
      <div className="footer-text">
        <p>Alarm.wav by Tempouser -- https://freesound.org/s/162851/ -- License: Attribution NonCommercial 3.0</p>
      </div>
    </footer>
  </StrictMode>,
)
