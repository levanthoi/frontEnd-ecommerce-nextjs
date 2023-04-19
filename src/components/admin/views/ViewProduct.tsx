import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import * as icon from '@/icons';
import { createCateProd, updateCateProd } from '@/services/cateProd.service';
import { Notification } from '@/components/UI/Notification';
import { useGetCateProd } from '@/hooks/useGetCateProd';
import { useGetBrands } from '@/hooks/useGetBrands';
import { useGetAttributes } from '@/hooks/useGetAttributes';
import { IAttribute } from '@/lib/types/admin/attributes/attribute.type';
import { cartesianProduct, formatNumber } from '@/utils/helpers';
import { getActiveShop, getShop } from '@/services/shop.service';
import { getActiveBrand } from '@/services/brand.service';
import { IShop } from '@/lib/types/admin/shops/shop.type';
import { IBrand } from '@/lib/types/admin/brands/brand.type';
import { createProduct, updateProduct } from '@/services/product.service';

// import MyCKEditor from '../CKEditor';
// import { RootState } from '@/redux/reducers/rootReducer';

// const MyEditor = dynamic(() => import('../CKEditor'), { ssr: false });

interface Props {
  row: IShop | null;
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

const ViewProduct: React.FC<Props> = ({ row }) => {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [form] = Form.useForm<IShop>();
  const { Item, List } = Form;

  const [status, setStatus] = useState<boolean>(true);
  const [attrVal, setAttrVal] = useState<IValAttribute>({});
  const [attrVar, setAttrVar] = useState<string>('');
  const [dataSource, setDataSource] = useState<IVariant[] | []>([]);

  const [shops, setShops] = useState<IShop[] | []>([]);
  const [brands, setBrands] = useState<IBrand[] | []>([]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  // const [desc, setDesc] = useState<string>('');
  const { categories } = useGetCateProd();
  const { attributes } = useGetAttributes();

  const fetch = useCallback(async () => {
    const query = {
      fields: '',
    };
    const fetchShop = getActiveShop(query);
    const fetchBrand = getActiveBrand(query);
    const shop = await fetchShop;
    const brand = await fetchBrand;
    setShops(shop?.data?.data);
    setBrands(brand?.data?.data);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

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
    // console.log('value', val);
    // console.log('form', form.getFieldValue('variants'));
    const unitPrice = form.getFieldValue('unitPrice');
    const variants = form.getFieldValue('variants');
    const valVariants = variants?.map((variant: any) => variant.value);
    const cartesians = cartesianProduct(valVariants);
    const combinations = cartesians?.map((item: any) => ({
      variant: item?.join('-'),
      variantPrice: unitPrice,
      sku: `-${item?.join('-')}`,
      stock: 1,
    }));
    setDataSource(combinations);
  };

  const handleChangeUnitPrice = () => {
    const unitPrice = form.getFieldValue('unitPrice');
    console.log('val', unitPrice);
    const update = dataSource?.map((item) => ({ ...item, variantPrice: unitPrice }));
    setDataSource(update);
    console.log('dataSource', dataSource);
  };

  const handleChangeDetail = (
    e: React.ChangeEvent<HTMLInputElement>,
    text: string,
    record: IVariant,
  ) => {
    const update: IVariant[] = dataSource?.map((item: IVariant) =>
      item?.sku === record?.sku ? { ...item, [text]: Number(e.target.value) } : item,
    );
    console.log('update', update);
    setDataSource(update);
  };

  /**
   * @description : submit form
   * @param value : IShop
   */
  const handleSubmit = async (value: IShop) => {
    const addItem = { ...value, status };
    console.log('addItem', addItem);

    let res: AxiosResponse<any>;
    try {
      if (row) {
        const arg = {
          id: row._id,
          payload: addItem,
        };
        res = await updateProduct(arg);
      } else {
        res = await createProduct(addItem);
      }
      const { message, success } = res.data;
      Notification(message, success);
      router.back();
    } catch (e: any) {
      const { message, success } = e.data;
      Notification(message, success);
    }
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
      render: (text, record) => (
        <Input value={text} onChange={(e) => handleChangeDetail(e, 'variantPrice', record)} />
      ),
    },
    {
      title: t.sku,
      dataIndex: 'sku',
      render: (text, record) => (
        <Input value={text} onChange={(e) => handleChangeDetail(e, 'sku', record)} />
      ),
    },
    {
      title: t.stock,
      dataIndex: 'stock',
      render: (text, record) => (
        <Input value={text} onChange={(e) => handleChangeDetail(e, 'stock', record)} />
      ),
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

  // const shops = [
  //   {
  //     label: 'BigC',
  //     value: 'bigc',
  //   },
  // ];
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
    shop: shops[0]?._id || '',
    productType: 'physical',
    category: categories[0]?.value || '',
    brands: brands[0]?._id || '',
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
            <Item name="shop_id" label={t.shop}>
              <Select optionLabelProp="label">
                {shops?.map((shop: IShop) => (
                  <Select.Option key={shop?._id} value={shop?._id} label={shop?.shop?.title}>
                    {shop?.shop?.title}
                  </Select.Option>
                ))}
              </Select>
            </Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Item name="productType" label={t.productType}>
              <Select options={productType} />
            </Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Item name="category_id" label={t.category}>
              <TreeSelect treeData={categories} />
            </Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Item name="brand_id" label={t.brands}>
              <Select optionLabelProp="label">
                {brands?.map((brand: IBrand) => (
                  <Select.Option key={brand?._id} value={brand?._id} label={brand?.title}>
                    {brand?.title}
                  </Select.Option>
                ))}
              </Select>
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
                  <InputNumber onChange={handleChangeUnitPrice} style={{ width: '100%' }} />
                </Item>
              </Col>
              <Col span={6}>
                <Item name="purchasePrice" label={t.purchasePrice}>
                  <InputNumber style={{ width: '100%' }} />
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
                <Table columns={columns} dataSource={dataSource} rowKey="sku" />
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
