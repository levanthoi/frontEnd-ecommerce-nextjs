import React from 'react';

import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';

interface Props {
  className?: string;
  to: string;
  style?: any;
  onClick?: () => void;
}

export const NextArrow: React.FC<Props> = ({ className, to, onClick, style }) => {
  return (
    <button
      type="button"
      className={`${className} absolute top-1/2 right-0 -translate-y-full z-10 w-10 h-10 bg-transparent rounded-full`}
      style={{ ...style }}
      onClick={onClick}
      aria-label={to}
    >
      <HiOutlineChevronRight size={30} />
    </button>
  );
};
export const PrevArrow: React.FC<Props> = ({ className, to, onClick, style }) => {
  return (
    <button
      type="button"
      className={`${className} absolute top-1/2 left-0 -translate-y-full z-10 w-10 h-10 bg-transparent rounded-full`}
      style={{ ...style }}
      onClick={onClick}
      aria-label={to}
    >
      <HiOutlineChevronLeft size={30} />
    </button>
  );
};
