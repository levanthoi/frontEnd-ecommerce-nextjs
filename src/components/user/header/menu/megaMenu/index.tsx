import React from 'react';
import { MegaMenu } from '@/components/user/header/menu/megaMenu/MegaMenu';
import Navbar from '@/components/user/header/menu/megaMenu/Navbar';

const index = () => {
  return (
    <div className="hidden md:flex md:items-center w-full">
      <MegaMenu />
      <Navbar />
    </div>
  );
};

export default index;
