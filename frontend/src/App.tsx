import Pomodoro from './components/Pomodoro'
import BackgroundMusic from './components/BackgroundMusic'
import TimerProgress from './components/TimerProgress'
import { TimerProvider } from './contexts/TimerProvider'
import '../src/styles/App.css';

function App() {
  return (
    <TimerProvider>
      <div className="app-container">
          <Pomodoro />
        <BackgroundMusic />
        <TimerProgress />
      </div>
    </TimerProvider>
  );
}

export default App
