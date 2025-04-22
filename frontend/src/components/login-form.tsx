import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import '../styles/components/LoginForm.css';

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    login(email);
    navigate('/user');
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-header">
            <span className="material-symbols-rounded">timer</span>
            <h1>Nook's Study Corner</h1>
            <p>Inicia sesión para continuar</p>
          </div>

          <div className="login-input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>

          <div className="login-divider">
            <span>O</span>
          </div>

          <div className="login-social-buttons">
            <button type="button" className="social-button">
              <span className="material-symbols-rounded">mail</span>
              Continuar con Google
            </button>
          </div>

          <p className="login-terms">
            Al continuar, aceptas nuestros{" "}
            <a href="#">Términos de Servicio</a> y{" "}
            <a href="#">Política de Privacidad</a>
          </p>
        </form>
      </div>
    </div>
  );
}