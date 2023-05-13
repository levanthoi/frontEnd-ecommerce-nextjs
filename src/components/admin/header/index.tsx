import { Layout } from 'antd';
import dynamic from 'next/dynamic';
import React from 'react';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
// import * as icon from '@/icons';
// import SearchBar from '@/components/UI/SearchBar';
// import Language from '@/components/UI/language';
// import Bell from '@/components/UI/header/bell';
// import Account from '@/components/UI/header/account';

const SearchBar = dynamic(() => import('@/components/UI/SearchBar'), {
  ssr: false,
});
const Language = dynamic(() => import('@/components/UI/language'), {
  ssr: false,
});
const Bell = dynamic(() => import('@/components/UI/header/bell'), {
  ssr: false,
});
const Account = dynamic(() => import('@/components/UI/header/account'), {
  ssr: false,
});

interface Props {
  collapsed: boolean;
  handleClick: () => void;
  colorText: any;
  bg: any;
}

const Header: React.FC<Props> = ({ colorText, bg, collapsed, handleClick }) => {
  return (
    <Layout.Header
      style={{ color: colorText, padding: '.5rem', background: bg }}
      className="flex items-center justify-between"
    >
      <div className="trigger" onClick={handleClick}>
        {collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
      </div>
      <div className="w-[50%]">
        <SearchBar />
      </div>
      <div className="flex justify-between">
        <Language classname="text-slate-500" />
        <Bell />
        <Account />
      </div>
    </Layout.Header>
  );
};

export default Header;
