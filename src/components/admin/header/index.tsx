import { Layout } from 'antd';
import React from 'react';
import * as icon from '@/icons';
import SearchBar from '@/components/UI/SearchBar';
import Language from '@/components/UI/language';
import Bell from '@/components/UI/header/bell';
import Account from '@/components/UI/header/account';

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
        {collapsed ? <icon.AiOutlineMenuUnfold /> : <icon.AiOutlineMenuFold />}
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
