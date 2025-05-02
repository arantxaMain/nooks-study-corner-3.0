import { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/pages/LoginPage.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    }
    if (name.length < 2) {
      showError('El nombre debe tener al menos 2 caracteres');
      return false;
    }
    if (!email.trim()) {
      showError('El email es requerido');
      return false;
    }
    if (!email.includes('@')) {
      showError('Por favor, introduce un email válido');
      return false;
    }
    if (!password) {
      showError('La contraseña es requerida');
      return false;
    }
    if (password.length < 6) {
      showError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (!confirmPassword) {
      showError('Por favor, confirma tu contraseña');
      return false;
    }
    if (password !== confirmPassword) {
      showError('Las contraseñas no coinciden');
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
      Swal.fire({
        title: '¡Bienvenido!',
        text: 'Registro completado correctamente',
        icon: 'success',
        confirmButtonText: '¡Vamos!',
        confirmButtonColor: '#88c9bf',
        background: '#fff5e6',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-confirm'
        }
      }).then(() => {
        navigate('/user');
      });
    } catch {
      showError('Error al registrarse. Por favor, inténtalo de nuevo.');
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
          </div>

          <div className="login-input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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