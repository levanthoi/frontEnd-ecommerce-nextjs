import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

// antd
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Button, Image, Popconfirm, Space, Switch, Table } from 'antd';
// icon
import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';
// other
import { useLanguage } from '@/hooks/useLanguage';
import { IBrand } from '@/lib/types/admin/brands/brand.type';
import { deleteBrand, getBrand } from '@/services/brand.service';
import { Notification } from '@/components/UI/Notification';

const NavTab = dynamic(() => import('@/components/admin/navTab/NavTab'), {
  ssr: false,
});

// interface Props {
//   data: IBrand[];
// }

const Brands: NextPage = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const [dataBrand, setDataBrand] = useState<Array<IBrand> | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetch = useCallback(async () => {
    const query = {
      fields: '',
    };
    setIsLoading(true);
    const res: AxiosResponse<any> = await getBrand(query);
    setDataBrand(res?.data?.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleDelete = async (record: IBrand) => {
    console.log('record', record);
    try {
      const res: AxiosResponse<any> = await deleteBrand(record.key);
      const { message, success } = res.data;
      Notification(message, success);
      fetch();
      // const afterDelete = dataBrand?.filter((brand) => brand.key !== record.key);
      // setDataBrand(afterDelete);
    } catch (e: any) {
      const { message, success } = e.data;
      Notification(message, success);
    }
  };
  /**
   * @description  : Edit a Row Table
   * @param record : IBrand
   */
  const handleEdit = async (record: IBrand) => {
    // console.log('record', record);
    router.push(`${router.asPath}/${record.key}`);
  };

  /**
   * @description : Khởi tạo Column
   */
  const columns: ColumnsType<IBrand> = [
    {
      title: 'ID',
      dataIndex: '',
      // width: '10%',
      render: (text, _, index) => index + 1,
    },
    {
      title: t.image,
      dataIndex: 'images',
      render: (text, record) => (
        <Image src={text?.url} alt={record.title} width={150} height={100} />
      ),
      // width: '15%',
    },
    {
      title: t.name,
      dataIndex: 'title',
      // width: '25%',
    },
    {
      title: t.status,
      dataIndex: 'status',
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

  const onChange: TableProps<IBrand>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
      <NavTab fetchList={fetch} />
      <Table
        columns={columns}
        dataSource={dataBrand}
        loading={isLoading}
        rowKey="_id"
        onChange={onChange}
      />
    </>
  );
};

export default Brands;

// export const getStaticProps: GetStaticProps = async () => {
//   const query = {
//     fields: '',
//   };
//   const res: AxiosResponse<any> = await getBrand(query);
//   const { data } = res;
//   return {
//     props: { data: data?.data || [] }, // will be passed to the page component as props
//   };
// };
