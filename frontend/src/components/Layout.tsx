// src/components/Layout.tsx
import { ReactNode } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackgroundMusic from './BackgroundMusic'
import TimerProgress from './TimerProgress'
import AlarmSound from './AlarmSound'
import DayNightCycle from './DayNightCycle';
import '../styles/index.css';
import { useAuth } from '../contexts/AuthProvider'
import logo from '../assets/logo.png'

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const isHomePage = location.pathname === '/'
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleUserIconClick = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            navigate('/login');
        }
    };

    return (
        <>
            <DayNightCycle />
            <BackgroundMusic />
            <AlarmSound />
            <header className="header">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
                {isHomePage ?
                    <Link to="/user" className="material-symbols-rounded" onClick={handleUserIconClick}>
                        account_circle
                    </Link>
                    :
                    <Link to="/" className="material-symbols-rounded">
                        timer
                    </Link>}
            </header>

            <main>
                {children}
                <TimerProgress />
            </main>

            <footer className="footer">
                <div>
                    <ThemeToggle />
                </div>
                <div className="footer-text">
                    <p>Alarm.wav by Tempouser -- https://freesound.org/s/162851/ -- License: Attribution NonCommercial 3.0</p>
                </div>
                <div>
                </div>
            </footer>
        </>
    )
}
