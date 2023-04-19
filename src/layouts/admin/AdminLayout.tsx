import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { MenuProps } from 'antd';
import dynamic from 'next/dynamic';
import * as icon from '@/icons';
import { useLanguage } from '@/hooks/useLanguage';

const BreadCrumb = dynamic(() => import('@/components/UI/breadcrumb'), {
  ssr: false,
});
const Header = dynamic(() => import('@/components/admin/header'), {
  ssr: false,
});

interface Props {
  children: React.ReactNode;
}

const itemMenu = [
  {
    key: 'dashboard',
    label: 'dashboard',
    type: '',
    children: null,
    icon: <icon.TbLayoutDashboard />,
  },
  {
    key: 'manageProduct',
    label: 'manageProduct',
    type: 'group',
    children: [
      {
        key: 'shops',
        label: 'shops',
        icon: <icon.AiOutlineShop />,
      },
      {
        key: 'cateProd',
        label: 'categories',
        icon: <icon.VscSymbolMisc />,
      },
      {
        key: 'brands',
        label: 'brands',
        icon: <icon.SiBrandfolder />,
      },
      {
        key: 'attributes',
        label: 'attributes',
        icon: <icon.MdAttribution />,
      },
      {
        key: 'products',
        label: 'products',
        icon: <icon.MdOutlineProductionQuantityLimits />,
      },
      {
        key: 'orders',
        label: 'orders',
        icon: <icon.BiReceipt />,
      },
    ],
    icon: null,
  },
  {
    key: 'manageBlog',
    label: 'manageBlog',
    type: 'group',
    children: [
      {
        key: 'cateBlog',
        label: 'categories',
        icon: <icon.VscSymbolMisc />,
      },
      {
        key: 'blogs',
        label: 'blogs',
        icon: <icon.BsNewspaper />,
      },
    ],
    icon: null,
  },
  {
    key: 'manageCustomers',
    label: 'manageCustomers',
    type: 'group',
    children: [
      {
        key: 'customers',
        label: 'customers',
        icon: <icon.FiUsers />,
      },
    ],
    icon: null,
  },
  {
    key: 'manageEmployees',
    label: 'manageEmployees',
    type: 'group',
    children: [
      {
        key: 'employees',
        label: 'employees',
        icon: <icon.GrUserManager />,
      },
    ],
    icon: null,
  },
  // {
  //   key: '10',
  //   label: 'setting',
  //   type: '',
  //   children: null,
  //   icon: <icon.FiSettings />,
  // },
];

const AdminLayout: React.FC<Props> = ({ children }) => {
  const { Footer, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();

  const router = useRouter();
  const { t } = useLanguage();

  const handleClick = () => {
    setCollapsed(!collapsed);
  };
  // const title = router.asPath?.split('/admin/')?.slice(1)[0];
  const path = router.asPath?.split('/admin/')?.slice(1)[0];
  const handleClickMenu: MenuProps['onClick'] = (e) => {
    console.log(e);
    if (path !== e.key) {
      router.push(`/admin/${e.key}`);
    }
  };

  const itemsMenu = itemMenu?.map((item) => {
    return {
      ...item,
      label: t[`${item.label}`],
      children: item?.children?.map((child) => {
        return {
          ...child,
          label: t[`${child.label}`],
          // children: child?.children?.map((childTwo) => {
          //   return {
          //     ...childTwo,
          //     label: t[`${childTwo.label}`],
          //   };
          // }),
        };
      }),
    };
  });
  // console.log('item', itemsMenu);

  return (
    <React.Fragment>
      <Head>
        <title>{t[`${path}`]}</title>
      </Head>
      <Layout>
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
          <div className="w-full max-h-full">
            {/* LOGO. */}
            <Image width={100} height={30} src="/images/logo.png" alt="logo" priority />
          </div>
          <Menu
            onClick={handleClickMenu}
            mode="inline"
            style={{ color: colorText }}
            defaultSelectedKeys={[`${path}`]}
            items={itemsMenu}
          />
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
