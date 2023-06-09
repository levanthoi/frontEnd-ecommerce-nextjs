import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import { AxiosResponse } from 'axios';
// import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

// antd
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Button, Popconfirm, Space, Switch, Table, Tag } from 'antd';
// icon
import { AiOutlineDelete, AiOutlineEdit, AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
// other
import { useLanguage } from '@/hooks/useLanguage';
import { deleteShop, getShop } from '@/services/shop.service';
import { Notification } from '@/components/UI/Notification';
import { IShop } from '@/lib/types/admin/shops/shop.type';

const NavTab = dynamic(() => import('@/components/admin/navTab/NavTab'), {
  ssr: false,
});

// interface Props {
//   data: IShop[];
// }

const Shops: NextPage = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const [dataShop, setDataShop] = useState<Array<IShop> | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetch = useCallback(async () => {
    const query = {
      fields: '',
    };
    setIsLoading(true);
    const res: AxiosResponse<any> = await getShop(query);
    setDataShop(res?.data?.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleDelete = async (record: IShop) => {
    console.log('record', record);
    try {
      const res: AxiosResponse<any> = await deleteShop(record._id);
      const { message, success } = res.data;
      const afterDelete = dataShop?.filter((shop) => shop._id !== record._id);
      setDataShop(afterDelete);
      Notification(message, success);
    } catch (e: any) {
      const { message, success } = e.data;
      Notification(message, success);
    }
  };
  /**
   * @description  : Edit a Row Table
   * @param record : IShop
   */
  const handleEdit = async (record: IShop) => {
    // console.log('record', record);
    router.push(`${router.asPath}/${record._id}`);
  };

  /**
   * @description : Khởi tạo Column
   */
  const columns: ColumnsType<IShop> = [
    {
      title: 'ID',
      dataIndex: '',
      // width: '10%',
      render: (text, _, index) => index + 1,
    },
    {
      title: t.name,
      dataIndex: ['shop', 'title'],
      // width: '25%',
    },
    {
      title: t.email,
      dataIndex: ['shop', 'email'],
      // width: '25%',
    },
    {
      title: t.mobileNumber,
      dataIndex: ['shop', 'phone'],
      // width: '25%',
    },
    {
      title: t.status,
      dataIndex: ['shop', 'currentlyOpen'],
      // width: '10%',
      render: (text) => (
        <Switch
          checkedChildren={<AiOutlineCheck />}
          unCheckedChildren={<AiOutlineClose />}
          checked={text}
        />
      ),
    },
    {
      title: t.actions,
      dataIndex: 'actions',
      // width: '10%',
      render: (_, record) => (
        <Space wrap>
          <Button type="primary" icon={<AiOutlineEdit />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Chắc chắn xóa?" onConfirm={() => handleDelete(record)}>
            <Button type="primary" danger icon={<AiOutlineDelete />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<IShop>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
      <NavTab fetchList={fetch} />
      <Table
        columns={columns}
        dataSource={dataShop}
        loading={isLoading}
        rowKey="_id"
        onChange={onChange}
      />
    </>
  );
};

export default Shops;

// export const getStaticProps: GetStaticProps = async () => {
//   const query = {
//     fields: '',
//   };
//   const res: AxiosResponse<any> = await getShop(query);
//   const { data } = res;
//   return {
//     props: { data: data.data }, // will be passed to the page component as props
//   };
// };
