import React from 'react';
import { AxiosResponse } from 'axios';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Button, Popconfirm, Row, Space, Switch, Table } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { useDispatch } from 'react-redux';
import * as icon from '@/icons';
import { useLanguage } from '@/hooks/useLanguage';
import { ICateProd } from '@/lib/types/admin/cateProd.type';
import { deleteCateProd, getCateProd } from '@/services/cateProd.service';
import { Notification } from '@/components/UI/Notification';

const AdminLayout = dynamic(() => import('@/layouts/admin/AdminLayout'));

interface Props {
  data: ICateProd[];
}

const Categories: React.FC<Props> = ({ data }) => {
  console.log('data', data);

  const { t } = useLanguage();
  // const dispatch = useDispatch();
  const router = useRouter();
  const [dataCateProd, setDataCateProd] = React.useState<Array<ICateProd> | []>(data);
  // const [row, setRow] = React.useState<ICateProd>();

  const handleDelete = async (record: ICateProd) => {
    try {
      const res: AxiosResponse<any> = await deleteCateProd(record.key);
      const { message, success } = res.data;
      const afterDelete = dataCateProd?.filter((cateProd) => cateProd.key !== record.key);
      setDataCateProd(afterDelete);
      Notification(message, success);
    } catch (e: any) {
      const { message, success } = e.data;
      Notification(message, success);
    }
  };
  const handleEdit = async (record: ICateProd) => {
    // setRow(record);
    // dispatch({
    //   type: 'table/edit',
    //   payload: record,
    // });
    router.push(`/admin/categories/${record.key}`);
  };

  const columns: ColumnsType<ICateProd> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '5%',
      render: (text, _, index) => <p>{index + 1}</p>,
    },
    {
      title: t.image,
      dataIndex: 'image',
      width: '15%',
    },
    {
      title: t.name,
      dataIndex: 'name',
      width: '25%',
    },
    {
      title: t.module,
      dataIndex: 'module',
      width: '15%',
    },
    {
      title: t.status,
      dataIndex: 'status',
      width: '10%',
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
      width: '20%',
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

  const onChange: TableProps<ICateProd>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-md">
        <Row justify="space-between">
          <Space>
            <Button className="text-purple-700 bg-purple-200" icon={<icon.TfiReload />} />
            <Button className="text-green-700 bg-green-200" icon={<icon.AiOutlineShop />} />
            <Button className="text-red-700 bg-red-200" icon={<icon.BiExport />}>
              Export
            </Button>
          </Space>
          <Button type="primary" icon={<icon.AiOutlinePlus />}>
            <Link href="/admin/categories/create">{t.addNew}</Link>
          </Button>
        </Row>
        <Table columns={columns} dataSource={dataCateProd} onChange={onChange} />
      </div>
    </AdminLayout>
  );
};

export default Categories;

export const getStaticProps: GetStaticProps = async () => {
  const query = {
    fields: 'name,status, module,image,key',
  };
  const res: AxiosResponse<any> = await getCateProd(query);
  const { data } = res;
  return {
    props: { data: data.data }, // will be passed to the page component as props
  };
};
