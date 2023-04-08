import React from 'react';
import dynamic from 'next/dynamic';

const AdminLayout = dynamic(() => import('@/layouts/admin/AdminLayout'));

const Products = () => {
  return <AdminLayout>Products</AdminLayout>;
};

export default Products;
