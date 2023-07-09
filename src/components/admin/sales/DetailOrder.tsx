import React from 'react';
import { Input, Select, Space, Button, Form } from 'antd';

import { IOrder } from '@/lib/types/admin/orders/order.type';

const DetailOrder: React.FC = () => {
  const [form] = Form.useForm<IOrder>();
  const { Item } = Form;

  const options = [
    { label: 'Giá chung', value: 'chung' },
    { label: 'Giảm giá 20%', value: '20' },
    { label: 'Giarm giá 10%', value: '10' },
  ];
  return (
    <div className="basis-1/3 bg-white px-3 py-2">
      <Form>
        <Space>
          <Item>
            <Select defaultValue="chung" options={options} />
          </Item>
          <Item name="customer">
            <Input />
          </Item>
        </Space>

        <hr />
        <Space direction="vertical" className="w-full my-2">
          <Space className="justify-between w-full">
            <span>Tổng tiền hàng</span>
            <b className="text-purple-500">12213000</b>
          </Space>
          <Space className="justify-between w-full">
            <span>Giảm giá</span>
            <Input
              bordered={false}
              style={{ borderBottom: '1px solid gray' }}
              className="w-[100px]"
            />
          </Space>
          <Space className="justify-between w-full">
            <b>Khách cần trả</b>
            <b className="text-purple-500">12213000</b>
          </Space>
          <Space className="justify-between w-full">
            <b>Khách đặt cọc </b>
            <b>12213000</b>
          </Space>
          <Space className="justify-between w-full">
            <b>Tiền khách trả</b>
            <b>12213000</b>
          </Space>
        </Space>
        <Button className="w-full p-2 bg-green-600 text-white uppercase font-bold hover:text-white">
          Thanh toán
        </Button>
      </Form>
    </div>
  );
};

export default DetailOrder;
