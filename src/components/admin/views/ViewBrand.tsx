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
import { createBrand, updateBrand } from '@/services/brand.service';
import { Notification } from '@/components/UI/Notification';
import { IBrand } from '@/lib/types/admin/brands/brand.type';
import { getBase64 } from '@/utils/helpers';

// import MyCKEditor from '../CKEditor';
// import { RootState } from '@/redux/reducers/rootReducer';

// const MyEditor = dynamic(() => import('../CKEditor'), { ssr: false });

interface Props {
  row: IBrand | null;
  //   Brands?: IBrand[];
}

const ViewBrand: React.FC<Props> = ({ row }) => {
  const { t } = useLanguage();
  const router = useRouter();
  const [form] = Form.useForm<IBrand>();
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
   * @param value : IBrand
   */
  const handleSubmit = async (value: IBrand) => {
    const addItem = { ...value, image, status, slug: '' };
    console.log('addItem', addItem);

    let res: AxiosResponse<any>;
    try {
      if (row) {
        const arg = {
          id: row.key,
          payload: addItem,
        };
        res = await updateBrand(arg);
      } else {
        // console.log('add');

        res = await createBrand(addItem);
        console.log('rés', res);
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
      encType="multipart/form-data"
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
        <Item name="title" label={t.brandName}>
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
        <Item name="slug" label={t.url}>
          <Input />
        </Item>
        <Item name="image" label={t.image} valuePropName="file">
          <Upload
            showUploadList={false}
            listType="picture"
            maxCount={1}
            customRequest={async (info) => {
              // console.log('info', info);
              // setFileList(info);
              if (info.file) {
                await getBase64(info.file as RcFile).then((thumb: string | any) => {
                  // console.log('thumb', thumb);
                  setImage(thumb);
                });
              }
            }}
          >
            <Button icon={<icon.AiOutlinePlus />}>Upload (Max: 1)</Button>
            {/* {uploadButton} */}
          </Upload>
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

export default ViewBrand;
