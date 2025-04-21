import Pomodoro from './components/Pomodoro'
import TimerProgress from './components/TimerProgress'
import { TimerProvider } from './contexts/TimerProvider'
import '../src/styles/App.css';

function App() {
  return (
    <TimerProvider>
      <div className="app-container">
          <Pomodoro />
        <TimerProgress />
      </div>
    </TimerProvider>
  );
}

export default App
