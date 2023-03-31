import React from 'react';
import * as icon from '@/icons';

const Bell = () => {
  return (
    <div className="my-auto mr-6 h-10 w-10 p-1 flex items-center justify-center cursor-pointer duration-300 hover:bg-slate-200 rounded-full">
      <icon.BiBell size={30} className="text-slate-500" />
    </div>
  );
};

export default Bell;
