import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import * as icon from '@/icons';
import BreadCrumb from '@/components/UI/breadcrumb';

const Header = dynamic(() => import('@/components/admin/header'));

interface Props {
  children: React.ReactNode;
  title: string;
}

const itemMenu = [
  {
    key: '1',
    icon: <icon.TbLayoutDashboard />,
    label: 'Dashboard',
  },
  {
    key: '2',
    icon: <icon.IoBagCheckOutline />,
    label: 'Order',
  },
  {
    key: '3',
    icon: <icon.MdOutlineProductionQuantityLimits />,
    label: 'Product',
  },
  {
    key: '4',
    icon: <icon.AiOutlineOrderedList />,
    label: 'Categories',
  },
  {
    key: '5',
    icon: <icon.SiBrandfolder />,
    label: 'Brands',
  },
  {
    key: '6',
    icon: <icon.FiUsers />,
    label: 'Customer',
  },
  {
    key: '10',
    icon: <icon.FiSettings />,
    label: 'Setting',
  },
];

const AdminLayout: React.FC<Props> = ({ children, title }) => {
  const { Footer, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();

  const handleClick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
          <div className="w-full max-h-full">
            <Image width={100} height={30} src="/images/logo.png" alt="logo" />
          </div>
          <Menu style={{ color: colorText }} defaultSelectedKeys={['1']} items={itemMenu} />
        </Sider>
        <Layout style={{ color: 'black' }}>
          <Header
            colorText={colorText}
            bg={colorBgContainer}
            collapsed={collapsed}
            handleClick={handleClick}
          />

          <Content style={{ padding: '1.5rem' }}>
            <BreadCrumb />
            {children}
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default AdminLayout;
