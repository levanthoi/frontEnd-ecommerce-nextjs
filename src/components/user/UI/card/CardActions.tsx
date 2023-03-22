import React from 'react';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { BsShare, BsCart } from 'react-icons/bs';
import { IProduct } from '@/lib/types/products';

interface Props {
  product: IProduct;
  className: string;
}

const CardActions: React.FC<Props> = ({ className, product }) => {
  //   console.log(product);

  return (
    <ul
      className={`opacity-0 duration-300 absolute top-2 left-0 bg-slate-200 rounded-full px-2 py-3 ${className}`}
    >
      <li
        className="pt-2 hover:text-red-500 duration-300 cursor-pointer"
        onClick={() => console.log(product)}
      >
        <MdOutlineFavoriteBorder size={15} />
      </li>
      <li className="pt-2 hover:text-red-500 duration-300 cursor-pointer">
        <BsShare size={15} />
      </li>
      <li className="pt-2 hover:text-red-500 duration-300 cursor-pointer">
        <BsCart size={15} />
      </li>
    </ul>
  );
};

export default CardActions;
