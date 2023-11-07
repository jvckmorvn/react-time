import { useContext } from "react";
import { TimersContext } from "../../store/timers-context";

export default function useTimerContext() {
  const timersCtx = useContext(TimersContext);

  if (!timersCtx) {
    throw new Error('timersCtx is undefined');
  }

  return timersCtx;
} 