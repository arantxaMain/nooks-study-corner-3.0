// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/index.css'
import App from './App.tsx'
import UserPage from './pages/UserPage.tsx'
import Layout from './components/Layout.tsx'
import { ThemeProvider } from './contexts/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
