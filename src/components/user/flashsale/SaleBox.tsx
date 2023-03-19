import React from 'react';
import Link from 'next/link';
import { IProduct } from '@/lib/types/products';
import ProductPrice from '@/components/user/UI/product/ProductPrice';
import Sold from '@/components/user/UI/product/Sold';

interface Props {
  product: IProduct;
}

const SaleBox: React.FC<Props> = ({ product }) => {
  return (
    <div className="w-full h-full px-2 my-2">
      <div className="bg-slate-200 rounded-md p-3">
        <Link href="/" className="flex flex-col min-w-full min-h-full max-h-full">
          <div className="flex-grow">
            <img src={product?.image} alt={product?.title} />
          </div>
          <p className="truncate text-base">{product?.title}</p>
          <ProductPrice />
          <Sold />
        </Link>
      </div>
    </div>
  );
};

export default SaleBox;
