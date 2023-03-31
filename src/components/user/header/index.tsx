import React from 'react';
import dynamic from 'next/dynamic';

import Logo from './Logo';
import SearchBar from '@/components/UI/SearchBar';
import Menu from '@/components/user/header/menu';
import Language from '@/components/UI/language';
import Theme from '@/components/user/header/theme';

const UserBox = dynamic(() => import('@/components/user/header/user'), {
  ssr: false,
});

const Header = () => {
  return (
    <header className="md:fixed left-0 right-0 top-0 bg-gradient-to-r from-[#f53d2d] to-[#ff6633] h-[6.5rem] pt-4 shadow-sm z-50">
      <div className="px-4 mb-2">
        <div className="flex">
          <div className="">
            <Logo />
          </div>
          <div className="flex flex-col flex-grow items-center justify-between ml-4">
            <div className="flex flex-grow items-center w-full">
              <div className="w-[60%]">
                <SearchBar />
              </div>
              <UserBox />
            </div>
            <div className="flex justify-start w-full pr-20">
              <Menu />
              <Language />
              <Theme />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
