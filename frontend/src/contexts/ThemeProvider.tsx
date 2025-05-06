import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved ? (saved as Theme) : 'light';
    } catch {
      return 'light';
    }
  });

  const calculateAutoTheme = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 20 ? 'light' : 'dark';
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    try {
      if (theme === 'auto') {
        const autoTheme = calculateAutoTheme();
        document.documentElement.setAttribute('data-theme', autoTheme);
        
        const interval = setInterval(() => {
          const newAutoTheme = calculateAutoTheme();
          document.documentElement.setAttribute('data-theme', newAutoTheme);
        }, 60000);

        return () => clearInterval(interval);
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }
    } catch (error) {
      console.error('Error al aplicar el tema:', error);
    }
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