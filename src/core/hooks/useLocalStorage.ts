import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [state, setState] = useState(() => {
    const rawValue = localStorage.getItem(key);
    return rawValue === null ? defaultValue : JSON.parse(rawValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
