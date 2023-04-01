import React from 'react';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Button, Row, Space, Table } from 'antd';
import AdminLayout from '@/layouts/admin/AdminLayout';
import * as icon from '@/icons';
import { useLanguage } from '@/hooks/useLanguage';

const Categories: React.FC = () => {
  const { t } = useLanguage();

  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
        },
        {
          text: 'Category 2',
          value: 'Category 2',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: string, record) => record.name.startsWith(value),
      width: '30%',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value: string, record) => record.address.startsWith(value),
      filterSearch: true,
      width: '40%',
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-md">
        <Row justify="space-between">
          <Space>
            <Button className="text-purple-700 bg-purple-200" icon={<icon.TfiReload />} />
            <Button className="text-green-700 bg-green-200" icon={<icon.AiOutlineShop />} />
            <Button className="text-purple-700 bg-purple-200" icon={<icon.BiExport />}>
              Export
            </Button>
          </Space>
          <Button className="text-purple-700 bg-purple-200" icon={<icon.AiOutlinePlus />}>
            {t.addNew}
          </Button>
        </Row>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </AdminLayout>
  );
};

export default Categories;
