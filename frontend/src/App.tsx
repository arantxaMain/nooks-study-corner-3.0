import Pomodoro from './components/Pomodoro'
import TimerProgress from './components/TimerProgress'
import '../src/styles/App.css';

function App() {
  return (
    <div className="app-container">
      <Pomodoro />
      <TimerProgress />
    </div>
  );
}

export default App
