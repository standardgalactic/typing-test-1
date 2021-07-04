/*
  Initial implementation by
  https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */

import { useEffect, useRef, useState } from 'react';

type ClearTimer = () => void;
type Callback = () => void;

export function useInterval(callback: Callback, delay: number) {
  const [timerId, setTimerId] = useState<number>();
  const savedCallback = useRef<Callback>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const clearTimer: ClearTimer = () => {
    if (timerId !== undefined) {
      clearInterval(timerId);
      setTimerId(undefined);
    }
  };

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    const id = window.setInterval(tick, delay);
    setTimerId(id);
    return () => clearInterval(id);
  }, [delay]);

  return {
    clearTimer,
  };
}
