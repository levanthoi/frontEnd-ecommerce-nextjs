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
import { UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// axios
import { AxiosResponse } from 'axios';
import { AiOutlineUpload } from 'react-icons/ai';
//
import { useLanguage } from '@/hooks/useLanguage';
import { ICateProd } from '@/lib/types/admin/cateProd.type';
// import * as icon from '@/icons';
import { createCateProd, deleteImageCateProd, updateCateProd } from '@/services/cateProd.service';
import { Notification } from '@/components/UI/Notification';
import { ItemCate, useGetCateProd } from '@/hooks/useGetCateProd';
// import { getBase64 } from '@/utils/helpers';
import { getUser } from '@/utils/getToken';
// import { RootState } from '@/redux/reducers/rootReducer';

interface Props {
  row: ICateProd | null;
  //   cateProds?: ICateProd[];
}

const ViewCategory: React.FC<Props> = ({ row }) => {
  const { t } = useLanguage();
  // const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm<ICateProd>();
  const { Item } = Form;
  const { categories }: { categories: ItemCate[] } = useGetCateProd();
  console.log('cate', categories);

  const [status, setStatus] = useState<boolean>(true);
  const [image, setImage] = useState<any>(row?.image || {});

  useEffect(() => {
    console.log('row', row);

    if (row) {
      form.setFieldsValue(row);
      setImage(row?.image);
    } else form.resetFields();
  }, [form, row]);

  const handleChangeUpload: UploadProps['onChange'] = async ({ file }) => {
    console.log(file);

    if (file?.status === 'done') {
      console.log('as', file);
      // const { file } = info;
      const { response } = file;
      // const {secure_url, public_id} = info.file.response.image;
      setImage({
        url: response?.image?.secure_url,
        uid: response?.image?.public_id,
      });
    } else if (file?.status === 'removed') {
      const res = await deleteImageCateProd(file?.uid);
      if (res?.data?.success) {
        setImage(null);
      }
    }
  };

  // const handleRemoveImage = async (file: UploadFile) => {
  //   console.log('remove', file);
  //   if (file) {
  //     await deleteImageCateProd(file?.response?.image?.public_id);
  //   }
  // };

  /**
   * @description : submit form
   * @param value : ICateProd
   */
  const handleSubmit = async (values: ICateProd) => {
    // setImage(value?.image?.file?.response?.image?.secure_url || '');
    const addItem = { ...values, status, image, slug: '' };

    // console.log('addItem', addItem);

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
      console.log('err', e);

      const { message, success } = e?.data || null;
      Notification(message, success);
    }
  };
  console.log('imageeee', image);

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
        // enctype="multipart/form-data"
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
        {/* <Item name="image" label={t.image}>
          <input type="file" name="image" onChange={handleChangeImage} />
        </Item> */}
        <Item name="image" label={t.image} valuePropName="file">
          <Upload
            action="http://localhost:5000/api/v1/prodCate/upload"
            // onRemove={handleRemoveImage}
            // showUploadList={row ? true : false}
            headers={{
              authorization: `Bearer ${getUser()?.token}`,
            }}
            name="image"
            fileList={[image] || []}
            listType="picture"
            maxCount={1}
            onChange={handleChangeUpload}
          >
            <Button icon={<AiOutlineUpload />}>Upload (Max: 1)</Button>
          </Upload>
        </Item>
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
