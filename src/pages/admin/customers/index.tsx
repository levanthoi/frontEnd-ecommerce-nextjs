import React from 'react';
import dynamic from 'next/dynamic';

const AdminLayout = dynamic(() => import('@/layouts/admin/AdminLayout'));

const Customers = () => {
  return <AdminLayout>Customers</AdminLayout>;
};

export default Customers;
