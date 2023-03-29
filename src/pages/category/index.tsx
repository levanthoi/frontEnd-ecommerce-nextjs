import React, {useState, useEffect} from 'react';
import BreadCrumb from '@/components/user/UI/breadcrumb';

const CategoryPage = () => {
    const [breadcrumbs, setBreadcrumbs] = useState([])
  return (
    <div>
      <BreadCrumb />
      CategoryPage
    </div>
  );
};

export default CategoryPage;
