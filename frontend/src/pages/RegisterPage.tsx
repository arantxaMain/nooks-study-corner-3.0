import { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/pages/LoginPage.css';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('otro');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register } = useAuth();

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
    console.log('Iniciando validación...');
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

    console.log('Errores encontrados:', newErrors);
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('¿El formulario es válido?', isValid);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Iniciando envío del formulario...');

    const isValid = validateForm();
    console.log('Resultado de la validación:', isValid);

    if (!isValid) {
      console.log('Formulario inválido, deteniendo envío');
      return;
    }

    try {
      console.log('Intentando registrar usuario...');
      await register(name, email, password, gender);
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
      });
    } catch (error) {
      console.error('Error durante el registro:', error);
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
              placeholder="canela@nook.com"
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
            <select 
              id='gender' 
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value='otro'>Otro</option>
              <option value='hombre'>Hombre</option>
              <option value='mujer'>Mujer</option>
            </select>
          </div>

          <button type="submit" className="login-button">
            Registrarse
          </button>

          <div className="login-register">
            <p>¿Ya tienes una cuenta?</p>
            <Link to="/login">Inicia sesión</Link>
          </div>
            
          <p className="login-terms">
            Al continuar, confirmas tu compromiso de por vida con Tom Nook y sus métodos de financiación creativa.
          </p>
        </form>
      </div>
    </div>
  );
}