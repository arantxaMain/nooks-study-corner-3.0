import '../styles/App.css';
import '../styles/pages/UserPage.css';
import { useAuth } from '../contexts/AuthProvider';

export default function UserPage() {
    const { user, logout } = useAuth();

    if (!user) {
        return <div>Error: No se encontraron datos del usuario.</div>;
    }

    return (
        <div className="user-container">
            <div className='user-content' >
                <div className='title'>
                    <h2>Bienvenido, {user.name}</h2>
                    <button className='logout-button' onClick={logout}>Cerrar Sesión</button>
                </div>
                <p>Aquí irá la info del usuario 🐾</p>
            </div>
        </div>
    )
}
