import '../styles/App.css';
import '../styles/pages/UserPage.css';
import { useAuth } from '../contexts/AuthProvider';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeProvider';
import PreferencesTab from '../components/PreferencesTab';
import StatsTab from '../components/StatsTab';

export default function UserPage() {
    const { user, logout } = useAuth();
    console.log(user);
    const [activeTab, setActiveTab] = useState('stats');
    const { theme } = useTheme();
    
    return (
        <div className="user-container">
            <div className='user-content'>
                <div className='title'>
                    <h2>
                        {user?.gender === 'hombre' ? 'Bienvenido,' : user?.gender === 'mujer' ? 'Bienvenida, ' : 'Bienvenidx, '}
                        {user?.name}{' '}
                        {theme === 'dark' ? '🍵' : '☕'}
                    </h2>
                    <button className='logout-button' onClick={logout}>Cerrar Sesión</button>
                </div>

                <div className="tabs">
                    <button
                        className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
                        onClick={() => setActiveTab('preferences')}
                    >
                        Preferencias
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
                        onClick={() => setActiveTab('stats')}
                    >
                        Estadísticas
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'stats' ? <StatsTab /> : <PreferencesTab />}
                </div>
            </div>
        </div>
    );
}
