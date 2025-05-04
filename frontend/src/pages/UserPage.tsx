import '../styles/App.css';
import '../styles/pages/UserPage.css';
import { useAuth } from '../contexts/AuthProvider';
import { useState } from 'react';

const StatsTab = () => {
    return (
        <div className="stats-container">
            <h3>Estadísticas</h3>
            <p>Aquí se mostrarán las estadísticas del usuario</p>
            {/* Aquí irán las estadísticas cuando se implementen */}
        </div>
    );
};

const PreferencesTab = () => {
    return (
        <div className="preferences-container">
            <h3>Preferencias</h3>
            <p>Aquí se mostrarán las preferencias del usuario</p>
            {/* Aquí irán las preferencias cuando se implementen */}
        </div>
    );
};

export default function UserPage() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('stats');

    if (!user) {
        return <div>Error: No se encontraron datos del usuario.</div>;
    }

    return (
        <div className="user-container">
            <div className='user-content'>
                <div className='title'>
                    <h2>Bienvenido, {user.name}</h2>
                    <button className='logout-button' onClick={logout}>Cerrar Sesión</button>
                </div>

                <div className="tabs">
                    <button
                        className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
                        onClick={() => setActiveTab('stats')}
                    >
                        Estadísticas
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
                        onClick={() => setActiveTab('preferences')}
                    >
                        Preferencias
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'stats' ? <StatsTab /> : <PreferencesTab />}
                </div>
            </div>
        </div>
    );
}
