import { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/LoginPage.css';
import Swal from'sweetalert2';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const showError = (text: string) => {
    Swal.fire({
      title: '¡Ups!',
      text,
      icon: 'error',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#88c9bf',
      background: '#fff5e6',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        confirmButton: 'swal-custom-confirm'
      }
    });
  };

  const validateForm = () => {

    if (!name.trim()) {
      showError('El nombre es requerido');
      return false;
    } else if (name.length < 2) {
      showError('El nombre debe tener al menos 2 caracteres');
      return false;
    }

    if (!email.trim()) {
      showError('El email es requerido');
      return false;
    } else if (!email.includes('@')) {
      showError('El email debe contener un @');
      return false;
    }

    return true;
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
      showError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
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