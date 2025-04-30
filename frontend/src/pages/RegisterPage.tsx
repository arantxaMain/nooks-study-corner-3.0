import { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!email.includes('@')) {
        setError('Por favor, introduce un email válido');
        return;
      }

      login(name, email);
      navigate('/user');
    } catch {
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-header">
            <h1>¡Hola!</h1>
            <p>Regístrate para continuar</p>
          </div>

          <div className="login-input-group">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Canela"
              required
            />
            {error && <span className="error-message">{error}</span>}
          </div>

          <div className="login-input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              required
            />
            {error && <span className="error-message">{error}</span>}
          </div>

          <div className="login-input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="********"
              required
            />
          </div>

          <div className="login-input-group select-group">
            <label htmlFor='gender'>Género</label>
            <select id='gender' required>
              <option value='otro'>Otro</option>
              <option value='hombre'>Hombre</option>
              <option value='mujer'>Mujer</option>
            </select>
          </div>

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>

          <div className="login-register">
            <p>¿Ya tienes una cuenta?</p>
            <a href="/login">Inicia sesión</a>
          </div>
            
          <p className="login-terms">
            Al continuar, confirmas tu compromiso de por vida con Tom Nook y sus métodos de financiación creativa.
          </p>
        </form>
      </div>
    </div>
  );
}