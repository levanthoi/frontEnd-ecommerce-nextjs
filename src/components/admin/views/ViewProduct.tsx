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
  Row,
  Col,
} from 'antd';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// axios
import { AxiosResponse } from 'axios';
//
import { useLanguage } from '@/hooks/useLanguage';
import { ICateProd } from '@/lib/types/admin/cateProd.type';
import * as icon from '@/icons';
import { createCateProd, updateCateProd } from '@/services/cateProd.service';
import { Notification } from '@/components/UI/Notification';
import { ItemCate, useGetCateProd } from '@/hooks/useGetCateProd';
// import MyCKEditor from '../CKEditor';
// import { RootState } from '@/redux/reducers/rootReducer';

const MyEditor = dynamic(() => import('../CKEditor'), { ssr: false });

interface Props {
  row: ICateProd | null;
  //   cateProds?: ICateProd[];
}

const ViewProduct: React.FC<Props> = ({ row }) => {
  const { t } = useLanguage();
  // const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm<ICateProd>();
  const { Item } = Form;
  const { categories }: { categories: ItemCate[] } = useGetCateProd();
  console.log('cate', categories);

  const [status, setStatus] = useState<boolean>(true);
  // const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const [desc, setDesc] = useState<string>('');

  // useEffect(() => {
  //   setEditorLoaded(true);
  // }, []);

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
        layout="vertical"
        labelCol={{ span: 12 }}
        autoComplete="off"
        initialValues={{
          parent: 'root',
        }}
        onFinish={handleSubmit}
      >
        <Row>
          <Col span={12}>
            <Item name="title" label={t.productName}>
              <Input />
            </Item>
            <Item name="description" label={t.description}>
              <MyEditor
                // name="description"
                onChange={(value: string) => setDesc(value)}
                value={desc}
                editorLoaded
              />
            </Item>
          </Col>
          <Col span={12}>s</Col>
        </Row>
        <Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default ViewProduct;
