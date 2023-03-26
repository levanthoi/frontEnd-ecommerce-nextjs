import React from 'react';
import { useRouter } from 'next/router';

const BreadCrumb = () => {
  const router = useRouter();
  console.log('router', router);

  return <div>BreadCrumb</div>;
};

export default BreadCrumb;
