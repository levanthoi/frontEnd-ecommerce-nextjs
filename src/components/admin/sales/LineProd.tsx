import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useSelector, useDispatch } from 'react-redux';
import { IDataType, IOrder } from '@/lib/types/admin/orders/order.type';

import { useLanguage } from '@/hooks/useLanguage';
import { RootState } from '@/redux/reducers/rootReducer';
import { formatNumber } from '@/utils/helpers';

const LineProd: React.FC = () => {
  // const { Option } = Select;
  const { t, locale } = useLanguage();
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState<IOrder[]>([]);

  const { data } = useSelector((state: RootState) => state.order);

  console.log('aaa', data);
  useEffect(() => {
    if (data && data.length > 0) {
      const x = data?.map((item) => {
        return { ...item, totalPrice: item.quantity * item.variantPrice };
      });
      console.log('xxx', x);

      setDataSource(x);
    }
  }, [data]);

  // handle Increase
  const handleIncrease = (record: IOrder) => {
    dispatch({
      type: 'order/increase',
      payload: record,
    });
  };
  // handle Decrease
  const handleDecrease = (record: IOrder) => {
    dispatch({
      type: 'order/decrease',
      payload: record,
    });
  };

  const columns: ColumnsType<IOrder> = [
    {
      title: 'STT',
      dataIndex: '_id',
      width: '5%',
      rowScope: 'row',
      render: (_, __, index: number) => index + 1,
    },
    {
      title: t.name,
      dataIndex: 'variant',
      // render: (text: string) => <p>{text}</p>,
    },
    {
      title: t.unit,
      dataIndex: 'unit',
      // render: (text: string) => <p>{text}</p>,
    },
    {
      title: t.stock,
      dataIndex: 'stock',
      width: '10%',
      // render: (text: string) => <p>{text}</p>,
    },
    {
      title: t.quantity,
      dataIndex: 'quantity',
      render: (text: string, record: IOrder) => (
        <Space>
          <Button type="primary" size="small" onClick={() => handleDecrease(record)}>
            -
          </Button>
          <Input value={record?.quantity} size="small" style={{ width: '40px' }} />
          <Button type="primary" size="small" onClick={() => handleIncrease(record)}>
            +
          </Button>
        </Space>
      ),
    },
    {
      title: t.price,
      dataIndex: 'variantPrice',
      render: (text: number) => <p>{formatNumber(text, locale)}</p>,
    },
    {
      title: t.money,
      dataIndex: 'totalPrice',
      render: (text: number) => <p>{formatNumber(text, locale)}</p>,
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
      <Table columns={columns} dataSource={dataSource} rowKey="_id" />
    </div>
  );
};

export default LineProd;
