import React, { useEffect, useMemo, useState } from 'react';
import { Input, Select, Space, Button, Form } from 'antd';

import { useSelector } from 'react-redux';
import { IOrder } from '@/lib/types/admin/orders/order.type';
import { RootState } from '@/redux/reducers/rootReducer';
import { formatNumber } from '@/utils/helpers';
import { useLanguage } from '@/hooks/useLanguage';

const DetailOrder: React.FC = () => {
  const { t, locale } = useLanguage();
  const [form] = Form.useForm<IOrder>();
  const { Item } = Form;

  const [money, setMoney] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [debt, setDebt] = useState<number>(0);
  const { data } = useSelector((state: RootState) => state.order);
  // const totalPrice = useMemo(() => {
  //   return (
  //     data?.reduce((total: number, item: IOrder) => total + item.quantity * item.variantPrice, 0) ||
  //     0
  //   );
  // }, [data]);
  useEffect(() => {
    const sum =
      data?.reduce((total: number, item: IOrder) => total + item.quantity * item.variantPrice, 0) ||
      0;
    setTotalPrice(sum);
    setMoney(sum);
  }, [data]);
  console.log('dETAIL ORDER RENDER', money);

  const options = [
    { label: 'Giá chung', value: 'chung' },
    { label: 'Giảm giá 20%', value: '20' },
    { label: 'Giarm giá 10%', value: '10' },
  ];

  const handleChangeDiscount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setMoney(totalPrice - Number(event.target.value));
    }, 300);
  };
  const handleChangeAmountPaid = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setDebt(money - Number(event.target.value));
    }, 300);
  };

  return (
    <div className="basis-1/3 bg-white px-3 py-2">
      <Form form={form}>
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
            <b className="text-purple-500">{formatNumber(totalPrice, locale)}</b>
          </Space>
          <Space className="justify-between w-full">
            <span>Giảm giá</span>
            <Item name="discount">
              <Input
                bordered={false}
                style={{ borderBottom: '1px solid gray' }}
                className="w-[100px]"
                onChange={handleChangeDiscount}
              />
            </Item>
          </Space>
          <Space className="justify-between w-full">
            <b>Khách cần trả</b>
            <b className="text-purple-500">{formatNumber(money, locale)}</b>
          </Space>
          {/* <Space className="justify-between w-full">
            <b>Khách đặt cọc </b>
            <Item name="deposit">
              <Input
                bordered={false}
                style={{ borderBottom: '1px solid gray' }}
                className="w-[100px]"
                onChange={handleChangeDiscount}
              />
            </Item>
          </Space> */}
          <Space className="justify-between w-full">
            <b>Tiền khách trả</b>
            <Item name="amountPaid">
              <Input
                bordered={false}
                style={{ borderBottom: '1px solid gray' }}
                className="w-[100px]"
                onChange={handleChangeAmountPaid}
              />
            </Item>
          </Space>
          <Space className="justify-between w-full">
            <b>Còn nợ</b>
            <b>{formatNumber(debt, locale)}</b>
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
