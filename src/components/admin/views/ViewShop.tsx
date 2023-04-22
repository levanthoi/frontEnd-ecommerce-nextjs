import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Space, Switch, Typography, Upload } from 'antd';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// axios
import { AxiosResponse } from 'axios';
//
import { IconType } from 'react-icons';

import { useLanguage } from '@/hooks/useLanguage';
import * as icon from '@/icons';
import { createShop, updateShop } from '@/services/shop.service';
import { Notification } from '@/components/UI/Notification';
import { IShop } from '@/lib/types/admin/shops/shop.type';

// import MyCKEditor from '../CKEditor';
// import { RootState } from '@/redux/reducers/rootReducer';

// const MyEditor = dynamic(() => import('../CKEditor'), { ssr: false });

interface Props {
  row: IShop | null;
  //   Shops?: IShop[];
}

interface IActive {
  owner: boolean;
  info: boolean;
  general: boolean;
}

const SETUPS = [
  {
    text: 'currentlyOpen',
  },
  {
    text: 'selfDelivery',
  },
  {
    text: 'takeAway',
  },
  {
    text: 'openForDelivery',
  },
];

const ViewShop: React.FC<Props> = ({ row }) => {
  const { t } = useLanguage();
  const router = useRouter();
  const [form] = Form.useForm<IShop>();
  const { Item, List } = Form;

  const [isActive, setIsActive] = useState<IActive>({
    owner: true,
    info: true,
    general: true,
  });
  // const [image, setImage] = useState<string>('');

  useEffect(() => {
    console.log('row', row);

    if (row) form.setFieldsValue(row);
    else form.resetFields();
  }, [form, row]);

  const titleCard = (ic: React.ReactNode, text: string) => {
    return (
      <Space align="center">
        {ic}
        <Typography.Text className="text-base">{t[`${text}`]}</Typography.Text>
      </Space>
    );
  };

  /**
   * @description : submit form
   * @param value : IShop
   */
  const handleSubmit = async (value: IShop) => {
    const addItem = { ...value };
    console.log('addItem', addItem);

    let res: AxiosResponse<any>;
    try {
      if (row) {
        const arg = {
          id: row._id,
          payload: addItem,
        };
        res = await updateShop(arg);
      } else {
        res = await createShop(addItem);
      }
      const { message, success } = res.data;
      Notification(message, success);
      router.back();
    } catch (e: any) {
      const { message, success } = e.data;
      Notification(message, success);
    }
  };

  return (
    <Form
      form={form}
      // encType="multipart/form-data"
      layout="vertical"
      labelCol={{ span: 12 }}
      autoComplete="off"
      // initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Item name={['seller', 'is_owner']}>
        <Space>
          <Switch
            checked={isActive.owner}
            onChange={(checked: boolean) => setIsActive((prev) => ({ ...prev, owner: checked }))}
          />
          <Typography.Text strong>{t.createOwner}</Typography.Text>
        </Space>
      </Item>
      {isActive.owner ? (
        <Row gutter={16}>
          <Col span={12}>
            <Card
              title={titleCard(<icon.GrUserSettings size={20} />, 'info')}
              extra={
                <Switch
                  checked={isActive.info}
                  onChange={(checked: boolean) =>
                    setIsActive((prev) => ({ ...prev, info: checked }))
                  }
                />
              }
            >
              {isActive.info ? (
                <>
                  <Item
                    name={['seller', 'title']}
                    label={t.name}
                    rules={[{ required: true, message: t.emptyName }]}
                  >
                    <Input placeholder={t.name} />
                  </Item>
                  <Item
                    name={['seller', 'phone']}
                    label={t.mobileNumber}
                    rules={[{ required: true, message: t.emptyPhone }]}
                  >
                    <Input placeholder={t.mobileNumber} addonBefore={<icon.AiOutlinePhone />} />
                  </Item>
                  <Item
                    name={['seller', 'email']}
                    label={t.email}
                    rules={[{ required: true, message: t.emptyEmail }]}
                  >
                    <Input placeholder={t.email} addonBefore={<icon.AiOutlineMail />} />
                  </Item>
                </>
              ) : null}
            </Card>
          </Col>
          <Col span={12}>
            <Card title={titleCard(<icon.HiOutlineIdentification size={25} />, 'identity')}>
              <Item name={['seller', 'avatar']} label={t.avatar} valuePropName="file">
                <Upload listType="picture-card">
                  <div>
                    <icon.AiOutlinePlus />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Item>
            </Card>
          </Col>
        </Row>
      ) : null}

      {/* General Info */}
      <Row gutter={16}>
        <Col span={10}>
          <Card title={titleCard(<icon.AiOutlineShop size={20} />, 'generalInfo')}>
            {isActive.general ? (
              <>
                <Item
                  name={['shop', 'title']}
                  label={t.name}
                  rules={[{ required: true, message: t.emptyName }]}
                >
                  <Input placeholder={t.name} />
                </Item>
                <Item
                  name={['shop', 'phone']}
                  label={t.mobileNumber}
                  rules={[{ required: true, message: t.emptyPhone }]}
                >
                  <Input placeholder={t.mobileNumber} addonBefore={<icon.AiOutlinePhone />} />
                </Item>
                <Item
                  name={['shop', 'email']}
                  label={t.email}
                  rules={[{ required: true, message: t.emptyEmail }]}
                >
                  <Input placeholder={t.email} addonBefore={<icon.AiOutlineMail />} />
                </Item>
                <Item name={['shop', 'license']} label={t.licenseNumber}>
                  <Input placeholder={t.licenseNumber} />
                </Item>
              </>
            ) : null}
          </Card>
        </Col>
        <Col span={14}>
          <Card title={titleCard(<icon.MdOutlineEditNote size={25} />, 'meta')}>
            <Input />
          </Card>
        </Col>
      </Row>

      {/* Location Map */}
      <Row gutter={16}>
        <Col span={12}>
          <Input />
        </Col>
        <Col span={12}>
          <Card title={titleCard(<icon.CiLocationArrow1 size={25} />, 'location')}>
            <Item name={['shop', 'address']} label={t.address}>
              <Input placeholder={t.address} />
            </Item>
          </Card>
        </Col>
      </Row>

      {/* Set Up */}
      <Card title={titleCard(<icon.RiListSettingsLine />, 'setups')}>
        <Row gutter={16} className="gap-2">
          {SETUPS?.map(({ text }) => (
            <Col key={text} className="grow shrink p-2 border-dashed border border-slate-500">
              <Space align="center">
                <Item name={['shop', text]} valuePropName="checked">
                  <Switch />
                </Item>
                <Typography.Text strong className="pb-6">
                  {t[`${text}`]}
                </Typography.Text>
              </Space>
            </Col>
          ))}
        </Row>
      </Card>

      <Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Item>
    </Form>
  );
};

export default ViewShop;

// const a = {
//   seller: {
//     title: 'title',
//     phone: '09234234',
//     email: 'abc@gmail.com',
//     avatar: '',
//     is_owner: true,
//   },
//   shop: {
//     title: 'abc',
//     phone: '02348234',
//     email: 'abasdc@gmail.com',
//     currentlyOpen: true,
//   },
// };
