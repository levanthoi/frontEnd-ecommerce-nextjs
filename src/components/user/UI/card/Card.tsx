import React from 'react';
import Link from 'next/link';
import { IProduct } from '@/lib/types/products';
import ProductPrice from '@/components/user/UI/product/ProductPrice';
import CardActions from '@/components/user/UI/card/CardActions';

interface Props {
  product: IProduct;
}

const Card: React.FC<Props> = ({ product }) => {
  return (
    <div className="group col-span-2 relative rounded-md border border-slate-50 shadow-md shadow-slate-200 p-2">
      <Link href="/">
        <div className="">
          <img src={product.image} alt={product.title} />
        </div>
        <p className="text-base line-clamp-2">{product?.title}</p>
        <ProductPrice price={product?.price} />
      </Link>
      <CardActions product={product} className="group-hover:opacity-100" />
    </div>
  );
};

export default Card;
