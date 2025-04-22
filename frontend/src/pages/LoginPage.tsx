import { useState } from 'react';
import '../styles/pages/LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica de login
    console.log('Login con:', email);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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