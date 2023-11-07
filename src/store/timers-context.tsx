import { type ReactNode, createContext, useReducer } from "react";

export type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

const initialState: TimersState = {
  isRunning: true,
  timers: []
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

export const TimersContext = createContext<TimersContextValue | null>(null);

interface Props {
  children: ReactNode;
}

type AddAction = {
  type: 'add',
  payload: Timer
};

type StartAction = {
  type: 'start'
};

type StopAction = {
  type: 'stop'
};

type Action = AddAction | StartAction | StopAction;

function timersReducer(state: TimersState, action: Action): TimersState {
  if (action.type === 'add') {
    return {
      ...state,
      timers: [
        ...state.timers,
        {
          name: action.payload.name,
          duration: action.payload.duration
        }
      ]
    }
  }

  if (action.type === 'start') {
    return {
      ...state,
      isRunning: true
    }
  }

  return {
    ...state,
    isRunning: false
  }
}

export default function TimersContextProvider({children}: Props) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      dispatch({type: 'add', payload: timerData});
    },
    startTimers() {
      dispatch({type: 'start'});
    },
    stopTimers() {
      dispatch({type: 'stop'});
    }
  }

  return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>;
}
