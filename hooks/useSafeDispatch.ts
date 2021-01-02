import { Dispatch, useCallback, useEffect, useRef } from 'react';

export function useSafeDispatch<T>(
  dispatch: Dispatch<T>,
): (args: T) => void | undefined {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => (mounted.current = false);
  }, []);

  return useCallback(
    (args) => (mounted.current ? dispatch(args) : undefined),
    [],
  );
}
