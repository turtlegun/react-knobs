import { useMemo, useRef, useLayoutEffect } from 'react';

export default function useEventCallback(fn) {
  let ref = useRef();
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useMemo(() => (...args) => (0, ref.current)(...args), []);
}
