import { useState, useEffect, useCallback } from 'react';

// interface window {
//     width: number,
//     height: number
//   }

export const useWindowDemension = () => {
  let width;
  let height;
  if (typeof window !== 'undefined') {
    width = window.innerWidth;
    height = window.innerHeight;
  } else {
    width = 0;
    height = 0;
  }
  const [windowDemension, setWindowDemension] = useState({ width, height });

  const getWindowDemension = () => {
    const { innerWidth: w, innerHeight: h } = window;
    return { width: w, height: h };
  };

  const handleResize = useCallback(() => {
    setWindowDemension(getWindowDemension());
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);
  return windowDemension;
};
