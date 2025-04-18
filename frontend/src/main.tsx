import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <header className="header">
      <h1>Nook's Study Corner</h1>
    </header>
      <App />
    <footer className="footer">
      <div className="footer-text">
        <p>
          This is a personal website for Nook's study corner.
          <br />
          All the content on this website is my own work.
          <br />
          If you want to use any of the content on this website, please contact me.
          <br />
          <br />
          <a href="#">Github</a>
        </p>
      </div>
    </footer>
  </StrictMode>,
)
