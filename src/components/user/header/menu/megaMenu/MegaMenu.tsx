import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

export const MegaMenu = () => {
  return (
    <div className="flex items-center justify-around cursor-pointer gap-2">
      <AiOutlineMenu size={20} />
      <h2>Danh mục</h2>
    </div>
  );
};
