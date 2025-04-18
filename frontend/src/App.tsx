import './styles/App.css'
import Pomodoro from './components/Pomodoro'
import { TimerProvider } from './contexts/TimerProvider';

function App() {
  return (
    <>
      <TimerProvider>
        <div className="app-container">
          <div className="pomodoro-container">
            <Pomodoro />
          </div>
        </div>
      </TimerProvider>
    </>
  );
}

export default App
