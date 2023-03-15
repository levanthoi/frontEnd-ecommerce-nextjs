import React from 'react';
import Account from '@/components/user/header/user/Account';
import Hotline from '@/components/user/header/user/Hotline';
import Shops from '@/components/user/header/user/Shops';

const index = () => {
  return (
    <div className="flex items-center gap-16">
      <Hotline />
      <Shops />
      <Account />
    </div>
  );
};

export default index;
