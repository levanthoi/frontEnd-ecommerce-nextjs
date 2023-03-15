import React from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Account = () => {
  return (
    <div className="flex gap-4 cursor-pointer">
      <BiUserCircle size={30} />
      <AiOutlineShoppingCart size={30} />
    </div>
  );
};

export default Account;
