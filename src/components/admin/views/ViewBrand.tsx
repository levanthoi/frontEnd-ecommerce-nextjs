import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, Switch, Upload } from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// axios
import { AxiosResponse } from 'axios';
//
import { AiOutlinePlus } from 'react-icons/ai';
import { useLanguage } from '@/hooks/useLanguage';
import { createBrand, deleteFileBrand, updateBrand } from '@/services/brand.service';
import { Notification } from '@/components/UI/Notification';
import { IBrand } from '@/lib/types/admin/brands/brand.type';
import { getBase64 } from '@/utils/helpers';
import { baseUrl } from '@/utils/baseUrl';
import { getUser } from '@/utils/getToken';

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
  const [image, setImage] = useState<any>(null);
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
    const addItem = { ...value, images: image, status, slug: '' };
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

  const handleChangeUpload: UploadProps['onChange'] = async ({ file }) => {
    // console.log('file upload', file);
    const { response } = file;
    if (file?.status === 'done') {
      setImage({
        url: response?.image?.secure_url,
        uid: response?.image?.public_id,
      });
    }
    if (file?.status === 'removed') {
      console.log('removed', response);

      const res = await deleteFileBrand(response?.image?.public_id || file.uid);
      if (res?.data?.success) {
        setImage({});
      }
    }
  };

  const uploadButton = (
    <div>
      <AiOutlinePlus />
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
        {/* <Item name="slug" label={t.url}>
          <Input />
        </Item> */}
        <Item label={t.image} valuePropName="file">
          <Upload
            listType="picture-card"
            defaultFileList={row?.images?.uid ? [{ ...row?.images }] : []}
            action={`${baseUrl}/v1/brand/upload`}
            headers={{
              authorization: `Bearer ${getUser()?.token}`,
            }}
            name="image"
            maxCount={1}
            onChange={handleChangeUpload}
          >
            {/* <Button icon={<AiOutlinePlus />}>Upload (Max: 1)</Button> */}
            {uploadButton}
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
