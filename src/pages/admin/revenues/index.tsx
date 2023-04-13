import React from 'react';
import dynamic from 'next/dynamic';

const AdminLayout = dynamic(() => import('@/layouts/admin/AdminLayout'));

const Revenues = () => {
  return <AdminLayout>Revenues</AdminLayout>;
};

export default Revenues;
