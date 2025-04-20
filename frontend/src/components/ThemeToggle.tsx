import { useTheme } from '../contexts/ThemeProvider';
import '../styles/components/ThemeToggle.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center' }}>
      <span className="material-symbols-rounded">
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}