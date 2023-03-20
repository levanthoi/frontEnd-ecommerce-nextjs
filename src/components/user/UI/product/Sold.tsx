import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const Sold = () => {
  const width = 100;
  const { t } = useLanguage();
  return (
    <div className="relative text-xs text-white h-5 leading-5">
      <div className="absolute rounded-xl w-full h-full bg-[#ff6633] opacity-50 z-10" />
      <span className="absolute left-1/2 -translate-x-1/2 uppercase z-50">{t.solded}: 10</span>
      <div
        className="absolute rounded-tl-xl rounded-bl-xl h-full bg-[#ff6633] opacity-100 z-20"
        style={{ width: `${width}px` }}
      />
    </div>
  );
};

export default Sold;
