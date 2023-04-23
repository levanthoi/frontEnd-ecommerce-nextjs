import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

// antd
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Button, Popconfirm, Space, Switch, Table } from 'antd';
import { AxiosResponse } from 'axios';
// icon
import * as icon from '@/icons';
// other
import { useLanguage } from '@/hooks/useLanguage';
import { deleteProduct, getProduct } from '@/services/product.service';
import { IProduct } from '@/lib/types/admin/products/product.type';
import { Notification } from '@/components/UI/Notification';

const NavTab = dynamic(() => import('@/components/admin/navTab/NavTab'), {
  ssr: false,
});

// interface Props {
//   data: IProduct[];
// }

const Products: NextPage = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const [data, setData] = useState<IProduct[] | []>([]);

  const fetch = useCallback(async () => {
    const query = {
      fields: '',
    };
    const res: AxiosResponse<any> = await getProduct(query);
    setData(res?.data?.data);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);
  const handleDelete = async (record: IProduct) => {
    console.log('record', record);
    try {
      const res: AxiosResponse<any> = await deleteProduct(record._id);
      const { message, success } = res.data;
      fetch();
      // const afterDelete = dataProduct?.filter((cateProd) => cateProd.key !== record.key);
      // setDataProduct(afterDelete);
      Notification(message, success);
    } catch (e: any) {
      const { message, success } = e.data;
      Notification(message, success);
    }
  };
  /**
   * @description  : Edit a Row Table
   * @param record : IProduct
   */
  const handleEdit = async (record: IProduct) => {
    // console.log('record', record);
    router.push(`${router.asPath}/${record._id}`);
  };

  /**
   * @description : Khởi tạo Column
   */
  const columns: ColumnsType<IProduct> = [
    {
      title: 'ID',
      dataIndex: '',
      // width: '10%',
      render: (text, _, index) => index + 1,
    },
    {
      title: t.name,
      dataIndex: 'title',
      // width: '25%',
    },
    {
      title: t.shop,
      dataIndex: ['shop', 'shop', 'title'],
      // width: '15%',
    },
    {
      title: t.category,
      dataIndex: ['category', 'name'],
      // width: '15%',
    },
    {
      title: t.stock,
      dataIndex: 'stockTotal',
      // width: '15%',
    },
    {
      title: t.solded,
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
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
};

export default Products;

// export const getStaticProps: GetStaticProps = async () => {
//   const query = {
//     fields: '',
//   };
//   const res: AxiosResponse<any> = await getProduct(query);
//   const { data } = res;
//   return {
//     props: { data: data.data }, // will be passed to the page component as props
//   };
// };
