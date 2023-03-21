import React from 'react';
import { products } from '@/data/products';
import Card from '../UI/card/Card';
import TabLink from './TabLink';
import { IProduct } from '@/lib/types/products';
import { useWindowDemension } from '@/hooks/useWindowDemension';
import { useLanguage } from '@/hooks/useLanguage';

const TabProduct = () => {
  const { width } = useWindowDemension();
  const { t } = useLanguage();

  const numProductToShow = width >= 1536 ? 12 : 8;

  return (
    <div className="bg-white p-3 rounded-md">
      <TabLink />
      <div className="grid gap-4 grid-cols-12 mt-4">
        {products?.slice(0, numProductToShow)?.map((product: IProduct) => (
          <Card key={product.title} product={product} />
        ))}
      </div>
      <div className="text-center text-white mt-6">
        <button type="button" className="px-8 py-3 bg-[#ff6633] rounded-lg">
          {t.seeAllProduct}
        </button>
      </div>
    </div>
  );
};

export default TabProduct;
