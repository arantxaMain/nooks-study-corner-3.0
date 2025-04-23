import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });

  const calculateAutoTheme = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 20 ? 'light' : 'dark';
  };

  useEffect(() => {
    if (theme === 'auto') {
      document.documentElement.setAttribute('data-theme', calculateAutoTheme());
      
      // Actualizar cada minuto
      const interval = setInterval(() => {
        document.documentElement.setAttribute('data-theme', calculateAutoTheme());
      }, 60000);

      return () => clearInterval(interval);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => {
      switch (current) {
        case 'light': return 'dark';
        case 'dark': return 'auto';
        case 'auto': return 'light';
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};