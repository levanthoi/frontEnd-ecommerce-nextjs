import React from 'react';
import dynamic from 'next/dynamic';

const TabSale = dynamic(() => import('@/components/admin/sales/TabSale'), {
  ssr: false,
});

const Sales: React.FC = () => {
  return (
    <div>
      <TabSale />
    </div>
  );
};

export default Sales;
