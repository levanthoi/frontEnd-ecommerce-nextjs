import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, Switch, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// axios
import { AxiosResponse } from 'axios';
//
import { useLanguage } from '@/hooks/useLanguage';
import * as icon from '@/icons';
import { createAttribute, updateAttribute } from '@/services/attribute.service';
import { Notification } from '@/components/UI/Notification';
import { IAttribute } from '@/lib/types/admin/attributes/attribute.type';
import { getBase64 } from '@/utils/helpers';

// import MyCKEditor from '../CKEditor';
// import { RootState } from '@/redux/reducers/rootReducer';

// const MyEditor = dynamic(() => import('../CKEditor'), { ssr: false });

interface Props {
  row: IAttribute | null;
  //   Attributes?: IAttribute[];
}

const ViewAttribute: React.FC<Props> = ({ row }) => {
  const { t } = useLanguage();
  const router = useRouter();
  const [form] = Form.useForm<IAttribute>();
  const { Item } = Form;

  const [status, setStatus] = useState<boolean>(true);
  const [image, setImage] = useState<string>('');
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  // const [desc, setDesc] = useState<string>('');

  useEffect(() => {
    console.log('row', row);

    if (row) form.setFieldsValue(row);
    else form.resetFields();
  }, [form, row]);

  /**
   * @description : submit form
   * @param value : IAttribute
   */
  const handleSubmit = async (value: IAttribute) => {
    const addItem = { ...value, image, status, slug: '' };
    console.log('addItem', addItem);

    let res: AxiosResponse<any>;
    try {
      if (row) {
        const arg = {
          id: row.key,
          payload: addItem,
        };
        res = await updateAttribute(arg);
      } else {
        // console.log('add');

        res = await createAttribute(addItem);
        // console.log('rés', res);
      }
      const { message, success } = res.data;
      Notification(message, success);
      router.back();
    } catch (e: any) {
      const { message, success } = e.data;
      Notification(message, success);
    }
  };

  // const titleCard = (params: string) => {
  //   return (
  //     <Space>
  //       {t[params]}
  //       <Switch />
  //     </Space>
  //   );
  // };

  const uploadButton = (
    <div>
      <icon.AiOutlinePlus />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const initialValues = {};

  return (
    <Form
      form={form}
      // encType="multipart/form-data"
      layout="vertical"
      labelCol={{ span: 12 }}
      autoComplete="off"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      {/* <Space direction="vertical"> */}
      <Card
        title={row ? t.edit : t.addNew}
        extra={
          <div>
            <Switch checked={status} onChange={(checked: boolean) => setStatus(checked)} />
            &nbsp; Active
          </div>
        }
      >
        <Item name="title" label={t.attributeName}>
          <Input />
        </Item>
        <Item name="description" label={t.description}>
          <Input />
          {/* <MyEditor
              onChange={(value: string) => setDesc(value)}
              value={desc}
              editorLoaded
            /> */}
        </Item>
      </Card>
      <Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Item>
    </Form>
  );
};

export default ViewAttribute;
