import './styles/App.css'
import Pomodoro from './components/Pomodoro'
import { TimerProvider } from './contexts/TimerProvider';
import TimerProgress from './components/TimerProgress'

function App() {
  return (
    <>
      <TimerProvider>
        <div className="app-container">
          <div className="pomodoro-container">
            <Pomodoro />
          </div>
          <div className="progress-container">
            <TimerProgress />
          </div>
        </div>
      </TimerProvider>
    </>
  );
}

export default App
