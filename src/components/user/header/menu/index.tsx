import React from 'react';
import MegaMenu from '@/components/user/header/menu/megaMenu';
import SidebarMenu from '@/components/user/header/menu/sidebarMenu';

const index = () => {
  return (
    <div className="flex flex-grow  w-full">
      <MegaMenu />
      <SidebarMenu />
    </div>
  );
};

export default index;
