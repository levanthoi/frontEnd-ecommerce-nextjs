import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { formatNumber } from '@/utils/helpers';

interface Props {
  price: number;
}

const ProductPrice: React.FC<Props> = ({ price }) => {
  const { locale } = useLanguage();

  // const format
  return (
    <div className="flex flex-row items-center">
      <ins className="no-underline text-base font-bold">{formatNumber(locale, price)}</ins>
      <del className="mx-2 text-rose-800 text-xs">{formatNumber(locale, price)}</del>
    </div>
  );
};

export default ProductPrice;
