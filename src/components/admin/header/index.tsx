import { Layout } from 'antd';
import React from 'react';
import * as icon from '@/icons';
import SearchBar from '@/components/UI/SearchBar';
import Language from '@/components/UI/language';
import Bell from '@/components/UI/header/bell';

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
      className="flex items-center"
    >
      <div className="trigger" onClick={handleClick}>
        {collapsed ? <icon.AiOutlineMenuUnfold /> : <icon.AiOutlineMenuFold />}
      </div>
      <div className="w-[50%]">
        <SearchBar />
      </div>
      <Language classname="text-slate-500" />
      <Bell />
    </Layout.Header>
  );
};

export default Header;
