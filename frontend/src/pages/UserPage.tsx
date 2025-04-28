import '../styles/App.css';
import '../styles/pages/UserPage.css';
import { useAuth } from '../contexts/AuthProvider';

export default function UserPage() {
    const { user } = useAuth();
    const logout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    };

    if (!user) {
        return <div>Error: No se encontraron datos del usuario.</div>;
    }

    return (
        <>
            <div className="user-container">
                <h2>Bienvenido, {user.name}</h2>
                <button className='logout-button' onClick={logout}>Cerrar Sesión</button>
                <p>Aquí irá la info del usuario 🐾</p>
            </div>
        </>
    )
}
