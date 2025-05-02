import { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/LoginPage.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Por favor, confirma tu contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
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
      setErrors({ submit: 'Error al registrarse. Por favor, inténtalo de nuevo.' });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          {errors.submit && <span className="error-message">{errors.submit}</span>}
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

          <div className="login-input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors(prev => ({ ...prev, password: '' }));
                }
              }}
              placeholder="********"
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="login-input-group">
            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) {
                  setErrors(prev => ({ ...prev, confirmPassword: '' }));
                }
              }}
              placeholder="********"
              required
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
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