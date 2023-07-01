import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Space, Switch } from 'antd';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// axios
import { AxiosResponse } from 'axios';
//
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { useLanguage } from '@/hooks/useLanguage';
import { createAttribute, updateAttribute } from '@/services/attribute.service';
import { Notification } from '@/components/UI/Notification';
import { IAttribute } from '@/lib/types/admin/attributes/attribute.type';

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
  const { Item, List } = Form;

  const [status, setStatus] = useState<boolean>(true);
  // const [variants, setVariants] = useState<Array<object>>([]);
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
      <Row gutter={16}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
          <Card>
            <List name="variants">
              {(fields, { add, remove }) => (
                <>
                  {fields?.map(({ key, name, ...restField }) => {
                    return (
                      <Row gutter={16} key={key}>
                        <Space>
                          <Item {...restField} name={[name, 'name']} label={t.name}>
                            <Input />
                          </Item>
                          <Item>
                            <AiOutlineClose
                              onClick={() => remove(name)}
                              className="mt-8 cursor-pointer"
                            />
                          </Item>
                        </Space>
                      </Row>
                    );
                  })}
                  <Item>
                    <Button type="dashed" onClick={() => add()} block icon={<AiOutlinePlus />}>
                      Add sights
                    </Button>
                  </Item>
                </>
              )}
            </List>
          </Card>
        </Col>
      </Row>

      <Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Item>
    </Form>
  );
};

export default ViewAttribute;
