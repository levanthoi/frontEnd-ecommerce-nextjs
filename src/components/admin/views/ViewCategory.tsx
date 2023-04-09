import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  Switch,
  Upload,
  InputNumber,
  Typography,
  // Select,
  TreeSelect,
} from 'antd';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// axios
import { AxiosResponse } from 'axios';
//
import { useLanguage } from '@/hooks/useLanguage';
import { ICateProd } from '@/lib/types/admin/cateProd.type';
import * as icon from '@/icons';
import { createCateProd, updateCateProd } from '@/services/cateProd.service';
import { Notification } from '@/components/UI/Notification';
import { ItemCate, useGetCateProd } from '@/hooks/useGetCateProd';
// import { RootState } from '@/redux/reducers/rootReducer';

interface Props {
  row: ICateProd | null;
  //   cateProds?: ICateProd[];
}

const ViewCategory: React.FC<Props> = ({ row }) => {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm<ICateProd>();
  const { Item } = Form;
  const { categories }: { categories: ItemCate[] } = useGetCateProd();
  console.log('cate', categories);

  // const [categories, setCategories] = useState<
  //   Array<{ title: string; value: string; children?: Array<any> }> | []
  // >([
  //   {
  //     title: 'Root',
  //     value: 'root',
  //   },
  // ]);

  // const [module, setModule] = useState<Array<{ label: string; value: string }> | []>([
  //   {
  //     label: t.product,
  //     value: 'product',
  //   },
  //   {
  //     label: t.blog,
  //     value: 'blog',
  //   },
  // ]);
  const [status, setStatus] = useState<boolean>(true);

  useEffect(() => {
    console.log('row', row);

    if (row) form.setFieldsValue(row);
    else form.resetFields();
  }, [form, row]);

  /**
   * @description : submit form
   * @param value : ICateProd
   */
  const handleSubmit = async (value: ICateProd) => {
    const addItem = { ...value, status, slug: '' };
    let res: AxiosResponse<any>;
    try {
      if (row) {
        const arg = {
          id: row.key,
          payload: addItem,
        };
        res = await updateCateProd(arg);
      } else {
        res = await createCateProd(addItem);
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
    <Card
      title={row ? t.edit : t.addNew}
      extra={
        <div>
          <Switch checked={status} onChange={(checked: boolean) => setStatus(checked)} />
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
        }}
        onFinish={handleSubmit}
      >
        {/* <Item name="module" label={t.module}>
          <Select options={module} />
        </Item> */}
        <Item name="parent" label={t.category}>
          <TreeSelect showSearch treeData={categories} />
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
              {t.url}: {row?.slug}
            </pre>
          </Typography>
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default ViewCategory;
