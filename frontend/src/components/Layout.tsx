// src/components/Layout.tsx
import { ReactNode } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { Link, useLocation } from 'react-router-dom'
import BackgroundMusic from './BackgroundMusic'
import TimerProgress from './TimerProgress'
import AlarmSound from './AlarmSound'

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const isHomePage = useLocation().pathname === '/'
    return (
        <>
            <header className="header">
                <h1>Nook's Study Corner</h1>
                {isHomePage ?
                    <Link to="/user" className="material-symbols-rounded">
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
                <BackgroundMusic />
                <AlarmSound />
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
