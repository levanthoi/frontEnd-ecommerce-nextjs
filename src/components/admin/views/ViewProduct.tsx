import React, { useEffect, useMemo, useState } from 'react';
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
  Select,
  Space,
  Table,
  UploadFile,
} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
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
import { useGetCateProd } from '@/hooks/useGetCateProd';
import { useGetBrands } from '@/hooks/useGetBrands';
import { useGetAttributes } from '@/hooks/useGetAttributes';
import { IAttribute } from '@/lib/types/admin/attributes/attribute.type';
// import MyCKEditor from '../CKEditor';
// import { RootState } from '@/redux/reducers/rootReducer';

// const MyEditor = dynamic(() => import('../CKEditor'), { ssr: false });

interface Props {
  row: ICateProd | null;
  //   cateProds?: ICateProd[];
}

interface IVariant {
  variant: string;
  variantPrice: number;
  sku: string;
  stock: number;
}

interface IValAttribute {
  [key: string]: string[];
}

const before = [
  { variant: 'Color', value: ['blue', 'white'] },
  { variant: 'Size', value: ['s', 'm'] },
];

const after = [
  {
    variant: 'blue-s',
    variantPrice: 1,
    sku: '-blue-s',
    stock: 1,
  },
  {
    variant: 'white-s',
    variantPrice: 1,
    sku: '-white-s',
    stock: 1,
  },
  {
    variant: 'blue-m',
    variantPrice: 1,
    sku: '-blue-m',
    stock: 1,
  },
  {
    variant: 'white-m',
    variantPrice: 1,
    sku: '-white-m',
    stock: 1,
  },
];

const ViewProduct: React.FC<Props> = ({ row }) => {
  const { t } = useLanguage();
  const router = useRouter();
  const [form] = Form.useForm<ICateProd>();
  const { Item, List } = Form;

  const [status, setStatus] = useState<boolean>(true);
  const [attrVal, setAttrVal] = useState<IValAttribute>({});
  const [attrVar, setAttrVar] = useState<string>('');
  const [dataSource, setDataSource] = useState<IVariant[] | []>([]);
  // const [brands, setBrands] = useState<IBrand[] | []>([])
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  // const [desc, setDesc] = useState<string>('');
  const { categories } = useGetCateProd();
  const { brands } = useGetBrands();
  const { attributes } = useGetAttributes();

  useEffect(() => {
    console.log('row', row);

    if (row) form.setFieldsValue(row);
    else form.resetFields();
  }, [form, row]);

  const valVariant = useMemo(() => {
    console.log('useMemo ValVariant');

    const valObj: { [key: string]: string[] } = {};
    attributes?.forEach(({ title, variants }) => {
      valObj[title] = variants?.map(({ name }) => name);
    });
    return valObj;
  }, [attributes]);

  useEffect(() => {
    console.log('useEffect ValVariant');
    setAttrVal(valVariant);
  }, [valVariant]);

  const handleChangeLabel = (value: string) => {
    setAttrVar(value);
  };

  const handleValAttr = (val: string[]) => {
    console.log('value', val);
    console.log('form', form.getFieldValue('variants'));
    const unitPrice = form.getFieldValue('unitPrice');
    const variants = form.getFieldValue('variants');
    const arr: any[] = [];
    variants?.forEach(({ value }: { value: string[] }) => {
      value?.forEach((item: string) => {
        const x: IVariant = {
          variant: item,
          variantPrice: unitPrice,
          sku: item,
          stock: 1,
        };
        arr.push(x);
      });
    });
    console.log('arrrrrr', arr);
  };

  /**
   * @description : submit form
   * @param value : ICateProd
   */
  const handleSubmit = async (value: ICateProd) => {
    const addItem = { ...value, status };
    console.log('addItem', addItem);

    // let res: AxiosResponse<any>;
    // try {
    //   if (row) {
    //     const arg = {
    //       id: row.key,
    //       payload: addItem,
    //     };
    //     res = await updateCateProd(arg);
    //   } else {
    //     res = await createCateProd(addItem);
    //   }
    //   const { message, success } = res.data;
    //   Notification(message, success);
    //   router.back();
    // } catch (e: any) {
    //   const { message, success } = e.data;
    //   Notification(message, success);
    // }
  };

  const titleCard = (params: string) => {
    return (
      <Space>
        {t[params]}
        {/* <Switch /> */}
      </Space>
    );
  };

  const columns: ColumnsType<IVariant> = [
    {
      title: t.variant,
      dataIndex: 'variant',
      render: (text) => text,
    },
    {
      title: t.variantPrice,
      dataIndex: 'variantPrice',
      render: () => <Input />,
    },
    {
      title: t.sku,
      dataIndex: 'sku',
      render: () => <Input />,
    },
    {
      title: t.stock,
      dataIndex: 'stock',
      render: () => <Input />,
    },
  ];

  const uploadButton = (
    <div>
      <icon.AiOutlinePlus />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  /**
   * @description : Tạo một array attributes có key: title, value: id
   * @returns     : [{label: string, value: string}]
   */
  const nameVariant = useMemo(() => {
    console.log('nameVariant');

    const newItem = attributes?.map((attribute: IAttribute) => {
      return {
        label: attribute?.title,
        value: attribute?.title,
      };
    });
    return newItem;
  }, [attributes]);

  const shops = [
    {
      label: 'BigC',
      value: 'bigc',
    },
  ];
  const productType = [
    {
      label: 'Physical',
      value: 'physical',
    },
    {
      label: 'Digital',
      value: 'digital',
    },
  ];
  const units = [
    {
      label: 'Cái',
      value: 'cai',
    },
    {
      label: 'Hộp',
      value: 'hop',
    },
  ];
  const discountAfter = (
    <Select defaultValue="percent">
      <Select.Option value="percent">{t.percent}</Select.Option>
      <Select.Option value="flat">{t.flat}</Select.Option>
    </Select>
  );
  const taxAfter = (
    <Select defaultValue="include">
      <Select.Option value="include">{t.include}</Select.Option>
      <Select.Option value="exclude">{t.exclude}</Select.Option>
    </Select>
  );
  const initialValues = {
    shop: 'bigc',
    productType: 'physical',
    category: categories[0]?.value || '',
    brands: brands[0]?.title || '',
    unit: units[0]?.label || '',
  };
  console.log('pre-render ViewProduct 198', nameVariant);

  return (
    <Form
      form={form}
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
        <Item name="title" label={t.productName}>
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
      <Card title={t.generalInfo}>
        <Row gutter={16} wrap>
          <Col className="gutter-row" span={8}>
            <Item name="shop" label={t.shop}>
              <Select options={shops} />
            </Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Item name="productType" label={t.productType}>
              <Select options={productType} />
            </Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Item name="category" label={t.category}>
              <TreeSelect treeData={categories} />
            </Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Item name="brands" label={t.brands}>
              <Select options={brands} />
            </Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Item name="sku" label={t.sku}>
              <Input />
            </Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Item name="unit" label={t.unit}>
              <Select options={units} />
            </Item>
          </Col>
        </Row>
      </Card>

      <Row gutter={16}>
        <Col span={18}>
          <Card title={titleCard('attributes')}>
            <List name="variants">
              {(fields, { add, remove }) => (
                <>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Typography.Title level={5}>{t.attributeName}</Typography.Title>
                    </Col>
                    <Col span={12}>
                      <Typography.Title level={5}>{t.values}</Typography.Title>
                    </Col>
                  </Row>
                  {fields?.map(({ key, name, ...restField }) => (
                    <Row gutter={16} key={key}>
                      <Col span={11}>
                        <Item {...restField} name={[name, 'variant']}>
                          <Select options={nameVariant} onChange={handleChangeLabel} />
                        </Item>
                      </Col>
                      <Col span={11}>
                        <Item {...restField} name={[name, 'value']}>
                          <Select mode="multiple" onChange={handleValAttr}>
                            {attrVal[attrVar]?.map((item) => (
                              <Select.Option key={item} value={item}>
                                {item}
                              </Select.Option>
                            ))}
                          </Select>
                        </Item>
                      </Col>
                      <Col span={2}>
                        <Item>
                          <icon.AiOutlineClose onClick={() => remove(name)} />
                        </Item>
                      </Col>
                    </Row>
                  ))}
                  <Item>
                    <Button type="dashed" onClick={() => add()} block icon={<icon.AiOutlinePlus />}>
                      Add field
                    </Button>
                  </Item>
                </>
              )}
            </List>
          </Card>
        </Col>
        <Col span={6}>
          <Card title={titleCard('image')}>
            <Item name="images">
              <Upload listType="picture-card" fileList={fileList}>
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </Item>
          </Card>
        </Col>
        <Col span={24}>
          <Card title={titleCard('priceStock')}>
            <Row gutter={16}>
              <Col span={6}>
                <Item name="unitPrice" label={t.unitPrice}>
                  <Input />
                </Item>
              </Col>
              <Col span={6}>
                <Item name="purchasePrice" label={t.purchasePrice}>
                  <Input />
                </Item>
              </Col>
              <Col span={6}>
                <Item name="discount" label={t.discount}>
                  <Input addonAfter={discountAfter} />
                </Item>
              </Col>
              <Col span={6}>
                <Item name="tax" label={t.tax}>
                  <Input addonAfter={taxAfter} />
                </Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table columns={columns} />
              </Col>
            </Row>
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

export default ViewProduct;
