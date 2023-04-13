import React from 'react';
import dynamic from 'next/dynamic';

const AdminLayout = dynamic(() => import('@/layouts/admin/AdminLayout'));

const Shops = () => {
  return <AdminLayout>Shops</AdminLayout>;
};

export default Shops;
