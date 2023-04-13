import React from 'react';
import dynamic from 'next/dynamic';

const AdminLayout = dynamic(() => import('@/layouts/admin/AdminLayout'));

const Brands: React.FC = () => {
  return <AdminLayout>Brands</AdminLayout>;
};

export default Brands;
