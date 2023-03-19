import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import SaleBox from './SaleBox';
import CarouselBox from '@/components/user/UI/carousel/CarouselBox';

import { products } from '@/data/products';
// import Image from 'next/image';
// import SectionTitle from '@/components/user/UI/sectionTitle';

const FlashSale = () => {
  const { t } = useLanguage();
  return (
    <div className="my-4 bg-[#37bccef9] rounded-md px-4 py-2">
      {/* <SectionTitle title="flashSale" /> */}
      <div className="h-[300px] flex ">
        <div className="h-full w-1/6 flex flex-col items-center justify-around bg-center bg-no-repeat bg-cover bg-[url('/offersbg.png')] text-rose-800 ">
          <h2 className="uppercase text-2xl">Flash Sale</h2>
          <Link
            href="/offers"
            className="bg-slate-100 p-2 rounded-xl font-semibold hover:scale-100 duration-200"
          >
            {t.seeAll}
          </Link>
        </div>
        <div className="h-full w-5/6">
          <CarouselBox>
            {products
              ? products?.map((product) => <SaleBox key={product.id} product={product} />)
              : null}
          </CarouselBox>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
