import { useTheme } from '../contexts/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'light' && <span title='Claro' className="material-symbols-rounded">light_mode</span>}
      {theme === 'dark' && <span title='Oscuro' className="material-symbols-rounded">dark_mode</span>}
      {theme === 'auto' && <span title='Automático' className="material-symbols-rounded">schedule</span>}
    </button>
  )
}
import '../styles/components/ThemeToggle.css'