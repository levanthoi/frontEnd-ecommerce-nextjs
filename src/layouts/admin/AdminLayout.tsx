import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { MenuProps } from 'antd';
import dynamic from 'next/dynamic';
// icon
import { SiBrandfolder, SiFlattr } from 'react-icons/si';
import { GrUserManager } from 'react-icons/gr';
import {
  TbLayoutDashboard,
  TbShoppingCart,
  TbCategory,
  TbBrandProducthunt,
  TbBlockquote,
  TbBrandBlogger,
  TbReplace,
  TbUsers,
} from 'react-icons/tb';
//
// import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers/rootReducer';
import { useLanguage } from '@/hooks/useLanguage';

// const Login = dynamic(() => import('@/pages/admin/login'), {
//   ssr: false,
// });
const BreadCrumb = dynamic(() => import('@/components/UI/breadcrumb'), {
  ssr: false,
});
const Header = dynamic(() => import('@/components/admin/header'), {
  ssr: false,
});

interface Props {
  children: React.ReactNode;
}

// const itemsMenu: any[] = [];
const start = performance.now();

const itemMenu = [
  {
    key: 'dashboard',
    label: 'dashboard',
    type: '',
    children: null,
    icon: <TbLayoutDashboard />,
  },
  {
    key: 'manageProduct',
    label: 'manageProduct',
    type: 'group',
    children: [
      {
        key: 'shops',
        label: 'shops',
        icon: <TbShoppingCart />,
      },
      {
        key: 'cateProd',
        label: 'categories',
        icon: <TbCategory />,
      },
      {
        key: 'brands',
        label: 'brands',
        icon: <SiBrandfolder />,
      },
      {
        key: 'attributes',
        label: 'attributes',
        icon: <SiFlattr />,
      },
      {
        key: 'products',
        label: 'products',
        icon: <TbBrandProducthunt />,
      },
      {
        key: 'orders',
        label: 'orders',
        icon: <TbReplace />,
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
        icon: <TbBrandBlogger />,
      },
      {
        key: 'blogs',
        label: 'blogs',
        icon: <TbBlockquote />,
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
        icon: <TbUsers />,
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
        icon: <GrUserManager />,
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

  const { data, message } = useSelector((state: RootState) => state?.auth);
  // const [data, setdata] = useState<boolean>(a || false);

  // console.log('data', data);
  useEffect(() => {
    if (!data) router.push('/admin/login');
  }, [data, router, message]);

  const handleClick = () => {
    setCollapsed(!collapsed);
  };
  // const title = router.asPath?.split('/admin/')?.slice(1)[0];
  const path = useMemo(() => {
    return router.asPath?.split('/admin/')?.slice(1)[0];
  }, [router.asPath]);

  const handleClickMenu: MenuProps['onClick'] = (e) => {
    console.log(e);
    if (path !== e.key) {
      router.push(`/admin/${e.key}`);
    }
  };
  console.log(performance.now());

  const itemsMenu = useMemo(() => {
    return itemMenu?.map((item) => {
      return {
        ...item,
        label: t[`${item?.label}`],
        children: item?.children?.map((child) => {
          return {
            ...child,
            label: t[`${child?.label}`],
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
  }, [t]);
  const end = performance.now();
  console.log('time', end - start);

  return data ? (
    <React.Fragment>
      <Head>
        {' '}
        <title>{t[`${path}`]}</title>
      </Head>
      <Layout>
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
          <div className="w-full max-h-full">
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
  ) : null;
};

export default AdminLayout;
