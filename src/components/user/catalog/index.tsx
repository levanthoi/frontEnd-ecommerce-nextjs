import React, { useState, useEffect } from 'react';
import SectionTitle from '@/components/user/UI/sectionTitle';
import List from './List';
import { products } from '@/data/products';
import Card from '@/components/user/UI/card/Card';
import { useWindowDemension } from '@/hooks/useWindowDemension';

interface Props {
  title: string;
}

const Catalog: React.FC<Props> = ({ title }) => {
  const { width } = useWindowDemension();
  const [numProductToShow, setNumProductToShow] = useState(8);

  useEffect(() => {
    if (width >= 1536) setNumProductToShow(10);
    else setNumProductToShow(8);
  }, [width]);

  return (
    <div className="bg-white px-4 my-4 py-2 pb-4 rounded-md">
      <div className="flex justify-between">
        <SectionTitle title={title} />
        <List />
      </div>
      <div className="flex">
        <div className="grid grid-cols-10 gap-4 order-2">
          {products?.slice(0, numProductToShow)?.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
