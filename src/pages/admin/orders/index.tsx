import React from 'react';
import dynamic from 'next/dynamic';

const AdminLayout = dynamic(() => import('@/layouts/admin/AdminLayout'));

const Orders = () => {
  return <AdminLayout>Orders</AdminLayout>;
};

export default Orders;
