import React from 'react';
import dynamic from 'next/dynamic';

const LineProd = dynamic(() => import('@/components/admin/sales/LineProd'), {
  ssr: false,
});

const DetailOrder = dynamic(() => import('@/components/admin/sales/DetailOrder'), {
  ssr: false,
});

const Child: React.FC = () => {
  return (
    <div className="flex grow">
      <LineProd />
      <DetailOrder />
    </div>
  );
};

export default Child;
