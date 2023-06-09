import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

// antd
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Button, Image, Popconfirm, Space, Switch, Table } from 'antd';
import { AxiosResponse } from 'axios';
// icon
import { AiOutlineClose, AiOutlineCheck, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
// other
import { useLanguage } from '@/hooks/useLanguage';
import { deleteProduct, exportProduct, getProduct } from '@/services/product.service';
import { IProduct } from '@/lib/types/admin/products/product.type';
import { Notification } from '@/components/UI/Notification';

const NavTab = dynamic(() => import('@/components/admin/navTab/NavTab'), {
  ssr: false,
});

// interface Props {
//   data: IProduct[];
// }

const Products: NextPage = () => {
  const { t } = useLanguage();
  const router = useRouter();

  /**
   * @description : Khởi tạo Column
   */
  const initColumns: ColumnsType<IProduct> = [
    {
      title: 'ID',
      dataIndex: '_id',
      // width: '10%',
      render: (text, _, index) => index + 1,
    },
    {
      title: t.image,
      dataIndex: ['images', 'url'],
      width: '10%',
      render: (text, _) => <Image src={text || ''} alt="image" />,
    },
    {
      title: t.name,
      dataIndex: 'title',
      // width: '25%',
    },
    {
      title: t.shop,
      dataIndex: ['shop', 'shop', 'title'],
      // width: '15%',
    },
    {
      title: t.category,
      dataIndex: ['category', 'name'],
      // width: '15%',
    },
    {
      title: t.stock,
      dataIndex: 'stockTotal',
      // width: '15%',
    },
    {
      title: t.solded,
      dataIndex: 'sold',
      // width: '15%',
    },
    {
      title: t.unitPrice,
      dataIndex: 'unitPrice',
      // width: '15%',
    },
    {
      title: t.status,
      dataIndex: 'status',
      // width: '10%',
      render: (text) => (
        <Switch
          checkedChildren={<AiOutlineCheck />}
          unCheckedChildren={<AiOutlineClose />}
          checked={text}
        />
      ),
    },
    {
      title: t.actions,
      dataIndex: 'actions',
      // width: '10%',
      render: (_, record) => (
        <Space wrap>
          <Button type="primary" icon={<AiOutlineEdit />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Chắc chắn xóa?" onConfirm={() => handleDelete(record)}>
            <Button type="primary" danger icon={<AiOutlineDelete />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [data, setData] = useState<IProduct[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [columns, setColumns] = useState<any>(initColumns);

  const fetch = useCallback(async () => {
    try {
      const query = {
        fields: '',
      };
      setIsLoading(true);
      const res: AxiosResponse<any> = await getProduct(query);
      setData(res?.data?.data || []);
      setIsLoading(false);
    } catch (e: any) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);
  const handleDelete = async (record: IProduct) => {
    console.log('record', record);
    try {
      const res: AxiosResponse<any> = await deleteProduct(record._id);
      const { message, success } = res.data;
      // const afterDelete = dataProduct?.filter((cateProd) => cateProd.key !== record.key);
      // setDataProduct(afterDelete);
      Notification(message, success);
      fetch();
    } catch (e: any) {
      const { message, success } = e.data;
      Notification(message, success);
    }
  };
  /**
   * @description  : Edit a Row Table
   * @param record : IProduct
   */
  const handleEdit = async (record: IProduct) => {
    // console.log('record', record);
    router.push(`${router.asPath}/${record._id}`);
  };

  const onChange: TableProps<IProduct>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onExportExcel = async () => {
    try {
      // const headerName = columns?.map((column: any) => column?.title)?.pop();
      const params = {
        columns: columns?.slice(0, -1),
      };
      const res = await exportProduct(params);
      const { message, success } = res.data;
      Notification(message, success);
      console.log('res', res);
    } catch (e: any) {
      Notification(e?.data?.message, e?.data?.success);
    }
  };

  const handleAddColumn = (params: any) => {
    // console.log('asadsasas', params);
    // console.log('columns', columns);
    const filteredColumns = initColumns?.filter((column: any) => {
      return params?.includes(column?.title);
    });
    // console.log('filteredColumns', filteredColumns);
    setColumns(filteredColumns);
  };

  return (
    <>
      <NavTab
        fetchList={fetch}
        onExport={onExportExcel}
        columns={initColumns}
        handleAddColumn={handleAddColumn}
      />
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="_id"
        onChange={onChange}
      />
    </>
  );
};

export default Products;
