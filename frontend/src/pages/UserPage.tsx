import '../styles/App.css';
import { useAuth } from '../contexts/AuthProvider';

export default function UserPage() {
    const { user } = useAuth();

    if (!user) {
        return <div>Error: No se encontraron datos del usuario.</div>;
    }

    return (
        <div className="user-container">
            <h2>Bienvenido, {user.name}</h2>
            <p>Aquí irá la info del usuario 🐾</p>
        </div>
    )
}
  