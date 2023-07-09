import { useEffect, useState } from 'react';

export const useDebounce = (query: string, second: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(query);
    }, second);

    return () => {
      clearTimeout(timer);
    };
  }, [query, second]);

  return debouncedValue;
};
