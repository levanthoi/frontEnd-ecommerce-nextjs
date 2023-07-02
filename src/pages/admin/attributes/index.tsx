import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import { AxiosResponse } from 'axios';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

// antd
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Button, Popconfirm, Space, Switch, Table, Tag } from 'antd';
// icon
import { AiOutlineDelete, AiOutlineEdit, AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
// other
import { useLanguage } from '@/hooks/useLanguage';
import { deleteAttribute, getAttribute } from '@/services/attribute.service';
import { Notification } from '@/components/UI/Notification';
import { IAttribute } from '@/lib/types/admin/attributes/attribute.type';

const NavTab = dynamic(() => import('@/components/admin/navTab/NavTab'), {
  ssr: false,
});

// interface Props {
//   data: IAttribute[];
// }

const Attributes: NextPage = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const [dataAttribute, setDataAttribute] = useState<Array<IAttribute> | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetch = useCallback(async () => {
    const query = {
      fields: '',
    };
    setIsLoading(true);
    const res: AxiosResponse<any> = await getAttribute(query);
    setDataAttribute(res?.data?.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleDelete = async (record: IAttribute) => {
    console.log('record', record);
    try {
      const res: AxiosResponse<any> = await deleteAttribute(record.key);
      const { message, success } = res.data;
      // const afterDelete = dataAttribute?.filter((attribute) => attribute.key !== record.key);
      // setDataAttribute(afterDelete);
      Notification(message, success);
      fetch();
    } catch (e: any) {
      const { message, success } = e.data;
      Notification(message, success);
    }
  };
  /**
   * @description  : Edit a Row Table
   * @param record : IAttribute
   */
  const handleEdit = async (record: IAttribute) => {
    // console.log('record', record);
    router.push(`${router.asPath}/${record.key}`);
  };

  /**
   * @description : Khởi tạo Column
   */
  const columns: ColumnsType<IAttribute> = [
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
      title: t.values,
      dataIndex: 'variants',
      render: (text) =>
        text?.map((item: any) => (
          <Space key={item?.name} wrap>
            <Tag color="purple">{item?.name}</Tag>
          </Space>
        )),
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

  const onChange: TableProps<IAttribute>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
      <NavTab fetchList={fetch} />
      <Table
        columns={columns}
        dataSource={dataAttribute}
        loading={isLoading}
        rowKey="_id"
        onChange={onChange}
      />
    </>
  );
};

export default Attributes;

// export const getStaticProps: GetStaticProps = async () => {
//   const query = {
//     fields: '',
//   };
//   const res: AxiosResponse<any> = await getAttribute(query);
//   const { data } = res;
//   return {
//     props: { data: data.data }, // will be passed to the page component as props
//   };
// };
