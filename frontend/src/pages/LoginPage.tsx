import { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/LoginPage.css';
import { ErrorMessage } from '../components/ErrorMessage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!email.includes('@')) {
      newErrors.email = 'Por favor, introduce un email válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(name, email);
      navigate('/user');
    } catch {
      setErrors({ submit: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.' });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          {errors.submit && <ErrorMessage message={errors.submit} />}
          <div className="login-header">
            <h1>¡Hola!</h1>
            <p>Inicia sesión para continuar</p>
          </div>

          <div className="login-input-group">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors(prev => ({ ...prev, name: '' }));
                }
              }}
              placeholder="Canela"
              required
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="login-input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors(prev => ({ ...prev, email: '' }));
                }
              }}
              placeholder="m@example.com"
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>

          <div className="login-register">
            <p>¿No tienes una cuenta?</p>
            <a href="/register">Regístrate</a>
          </div>

        </form>
      </div>
    </div>
  );
}