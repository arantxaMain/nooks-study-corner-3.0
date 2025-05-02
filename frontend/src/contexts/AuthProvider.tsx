import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/user';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  register: (name: string, email: string, password: string, gender: string) => void;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const currentTheme = document.documentElement.getAttribute('data-theme');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = async (name: string, email: string, password: string, gender: string) => {
    try {
      const userData = await api.register({ name, email, password, gender });
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/user');
    } catch (error) {
      console.error('Error detallado durante el registro:', error);
      throw error;
    }
  }

  const login = async (name: string, email: string) => {
    try {
      const userData = await api.login({ name, email });
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/user');
    } catch (error) {
      console.error('Error durante el login:', error);
      throw error;
    }
  };

  const logout = () => {
    
    setUser(null);
    localStorage.removeItem('user');
    
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
    
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};