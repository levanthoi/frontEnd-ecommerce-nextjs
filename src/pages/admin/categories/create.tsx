import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Form, Input, InputNumber, Select, Switch, Typography, Upload } from 'antd';
import { useLanguage } from '@/hooks/useLanguage';
import { ICateProd } from '@/lib/types/admin/cateProd.type';
import { RootState } from '@/redux/reducers/rootReducer';
import { Notification } from '@/components/UI/Notification';
import { getCateProd } from '@/services/cateProd.service';
import * as icon from '@/icons';
import ViewCategory from '@/components/admin/views/ViewCategory';

const AdminLayout = dynamic(() => import('@/layouts/admin/AdminLayout'), {
  ssr: false,
});

const Create: NextPage<{ data: any }> = ({ data }) => {
  console.log('data', data);

  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useLanguage();
  const [form] = Form.useForm<ICateProd>();
  const { Item } = Form;

  const { message, success } = useSelector((state: RootState) => state.cateProd);

  useEffect(() => {
    if (message) {
      Notification(message, success);
      if (success) router.back();
    }
  }, [message, success, router]);

  const [categories, setCategories] = useState<Array<{ label: string; value: string }> | []>([
    {
      label: 'Root',
      value: 'root',
    },
  ]);

  const [module, setModule] = useState<Array<{ label: string; value: string }> | []>([
    {
      label: t.product,
      value: 'product',
    },
    {
      label: t.blog,
      value: 'blog',
    },
  ]);
  const [status, setStatus] = useState<boolean>(true);
  const url = Form.useWatch('name', form)?.split(' ')?.join('-');

  // useEffect(() => {
  //   const a = data?.map((item: any) => {
  //     return { ...item, value: item._id, label: item.name };
  //   });
  //   setCategories((prev) => [...prev, ...a]);
  // }, [data]);

  /**
   *
   * @param checked : boolean
   */
  const handleChangeStatus = (checked: boolean) => {
    setStatus(checked);
  };

  // handleCreate Category
  const handleCreate = (value: object) => {
    const addItem = { ...value, status, slug: url };
    try {
      dispatch({
        type: 'cateProd/add',
        payload: addItem,
      });
      // Notification(message, success);
      // router.back();
    } catch (e) {
      return;
    }
    console.log('mmmmm', message, success);
  };

  return (
    <AdminLayout>
      <Head>
        <title>{`${t.create} ${t.categories}`}</title>
      </Head>
      <ViewCategory row={null} />
      {/* <Card
        title={t.addNew}
        extra={
          <div>
            <Switch checked={status} onChange={handleChangeStatus} />
            &nbsp; Active
          </div>
        }
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 4 }}
          autoComplete="off"
          initialValues={{
            parent: 'root',
            module: 'product',
          }}
          onFinish={handleCreate}
        >
          <Item name="module" label={t.module}>
            <Select options={module} />
          </Item>
          <Item name="parent" label={t.category}>
            <Select options={categories} />
          </Item>
          <Item name="name" label={t.name}>
            <Input autoComplete="" />
          </Item>
          <Item name="order" label={t.order}>
            <InputNumber min={1} />
          </Item>
          <Item name="description" label={t.description}>
            <Input />
          </Item>
          <Upload listType="picture" maxCount={1}>
            <Button icon={<icon.AiOutlineUpload />}>Upload (Max: 1)</Button>
          </Upload>
          <Item name="slug">
            <Typography>
              <pre>
                {t.url}: {url}
              </pre>
            </Typography>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Item>
        </Form>
      </Card> */}
    </AdminLayout>
  );
};

export default Create;
