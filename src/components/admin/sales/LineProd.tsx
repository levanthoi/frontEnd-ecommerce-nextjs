import React, { useState } from 'react';
import { Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IDataType } from '@/lib/types/admin/orders/order.type';

import { useLanguage } from '@/hooks/useLanguage';

const LineProd: React.FC = () => {
  // const { Option } = Select;
  const { t } = useLanguage();

  const [dataSource, setDataSource] = useState<IDataType[]>([]);

  const columns: ColumnsType<IDataType> = [
    {
      title: 'STT',
      dataIndex: '_id',
      width: '5%',
      rowScope: 'row',
      render: (_, __, index: number) => index + 1,
    },
    {
      title: t.name,
      dataIndex: 'title',
      // render: (text: string) => <p>{text}</p>,
    },
    {
      title: t.unit,
      dataIndex: 'unit',
      // render: (text: string) => <p>{text}</p>,
    },
    {
      title: t.stock,
      dataIndex: 'stockTotal',
      // render: (text: string) => <p>{text}</p>,
    },
    {
      title: t.quantity,
      dataIndex: 'quantity',
      // render: (text: string) => <p>{text}</p>,
    },
    {
      title: t.price,
      dataIndex: 'unitPrice',
      // render: (text: string) => <p>{text}</p>,
    },
    {
      title: t.totalPrice,
      dataIndex: 'totalPrice',
      // render: (text: string) => <p>{text}</p>,
    },
  ];

  return (
    <div className="basis-2/3 px-3">
      {/* <Space className="bg-white w-full px-4 py-2 justify-between" align="center">
        <span>1</span>
        <p>AirPod Pro</p>
        <Select defaultValue="Cái">
          <Option value="Cái">Cái</Option>
          <Option value="Hộp">Hộp</Option>
        </Select>
        <span>97</span>
        <InputNumber min={1} max={97} defaultValue={1} />
        <span>120000</span>
        <h4>240000</h4>
      </Space> */}
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default LineProd;
