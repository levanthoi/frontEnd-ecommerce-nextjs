import React from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';

// antd
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Button, Popconfirm, Space, Switch, Table } from 'antd';
// icon
import * as icon from '@/icons';
// other
import { IProduct } from '@/lib/types/products';
import { useLanguage } from '@/hooks/useLanguage';

const NavTab = dynamic(() => import('@/components/admin/navTab/NavTab'), {
  ssr: false,
});

const Products: NextPage = () => {
  const { t } = useLanguage();

  const handleDelete = async (record: IProduct) => {
    console.log('record', record);
    // try {
    //   const res: AxiosResponse<any> = await deleteCateProd(record.key);
    //   const { message, success } = res.data;
    //   const afterDelete = dataCateProd?.filter((cateProd) => cateProd.key !== record.key);
    //   setDataCateProd(afterDelete);
    //   Notification(message, success);
    // } catch (e: any) {
    //   const { message, success } = e.data;
    //   Notification(message, success);
    // }
  };
  /**
   * @description  : Edit a Row Table
   * @param record : IProduct
   */
  const handleEdit = async (record: IProduct) => {
    console.log('record', record);
    // router.push(`${router.asPath}/${record.key}`);
  };

  /**
   * @description : Khởi tạo Column
   */
  const columns: ColumnsType<IProduct> = [
    {
      title: 'ID',
      dataIndex: 'key',
      // width: '10%',
      render: (text, _, index) => text,
    },
    {
      title: t.name,
      dataIndex: 'title',
      // width: '25%',
    },
    {
      title: t.shop,
      dataIndex: 'shop',
      // width: '15%',
    },
    {
      title: t.category,
      dataIndex: 'category',
      // width: '15%',
    },
    {
      title: t.sold,
      dataIndex: 'sold',
      // width: '15%',
    },
    {
      title: t.price,
      dataIndex: 'price',
      // width: '15%',
    },
    {
      title: t.status,
      dataIndex: 'status',
      // width: '10%',
      render: (text) => (
        <Switch
          checkedChildren={<icon.AiOutlineCheck />}
          unCheckedChildren={<icon.AiOutlineClose />}
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
          <Button
            type="primary"
            className=""
            icon={<icon.AiOutlineEdit />}
            onClick={() => handleEdit(record)}
          />
          <Button type="primary" icon={<icon.AiOutlineEdit />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Chắc chắn xóa?" onConfirm={() => handleDelete(record)}>
            <Button type="primary" danger icon={<icon.AiOutlineDelete />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<IProduct>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
      <NavTab />
      <Table columns={columns} dataSource={[]} onChange={onChange} />
    </>
  );
};

export default Products;
