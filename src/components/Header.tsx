import Button from './UI/Button.tsx';
import useTimersContext from './hooks/useTimersContext.ts';

export default function Header() {
  const timersCtx = useTimersContext();

  return (
    <header>
      <h1>React Time</h1>

      <Button 
        onClick={timersCtx.isRunning ? timersCtx.stopTimers : timersCtx.startTimers}
      >
        {timersCtx.isRunning ? 'Stop' : 'Start'} Timers
      </Button>
    </header>
  );
}
