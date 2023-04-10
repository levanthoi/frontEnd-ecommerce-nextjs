import React from 'react';
import { AxiosResponse } from 'axios';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Button, Popconfirm, Space, Switch, Table } from 'antd';
// import Link from 'next/link';
import { useRouter } from 'next/router';
// import { useDispatch } from 'react-redux';
import * as icon from '@/icons';
import { useLanguage } from '@/hooks/useLanguage';
import { ICateProd } from '@/lib/types/admin/cateProd.type';
import { deleteCateProd, getCateProd } from '@/services/cateProd.service';
import { Notification } from '@/components/UI/Notification';

const NavTab = dynamic(() => import('@/components/admin/navTab/NavTab'));

interface Props {
  data: ICateProd[];
}

const Categories: React.FC<Props> = ({ data }) => {
  const { t } = useLanguage();
  // const dispatch = useDispatch();
  const router = useRouter();
  const [dataCateProd, setDataCateProd] = React.useState<Array<ICateProd> | []>(data);
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // const refreshData = () => {
  //   router.replace(router.asPath);
  //   setIsLoading(true);
  // };

  function buildNestedStructure(
    items: ICateProd[],
    parent: ICateProd | undefined,
  ): ICateProd[] | undefined {
    const children = items.filter((item) => item.parent === parent?.key);
    if (children.length === 0) {
      return undefined;
    }

    const nestedChildren = children.map((child) => ({
      ...child,
      children: buildNestedStructure(items, child),
    }));

    return nestedChildren;
  }

  React.useEffect(() => {
    const topLevelItems = dataCateProd.filter((item) => item.parent === 'root');
    const nestedStructure = topLevelItems.map((item) => ({
      ...item,
      children: buildNestedStructure(dataCateProd, item),
    }));

    setDataCateProd(nestedStructure);
  }, []);

  // React.useEffect(() => {
  //   setIsLoading(false);
  // }, [data]);

  /**
   * @description  : Delete
   * @param record
   */
  const handleDelete = async (record: ICateProd) => {
    try {
      const res: AxiosResponse<any> = await deleteCateProd(record.key);
      const { message, success } = res.data;
      const afterDelete = dataCateProd?.filter((cateProd) => cateProd.key !== record.key);
      setDataCateProd(afterDelete);
      Notification(message, success);
    } catch (e: any) {
      const { message, success } = e.data;
      Notification(message, success);
    }
  };
  /**
   * @description  : Edit a Row Table
   * @param record : ICateProd
   */
  const handleEdit = async (record: ICateProd) => {
    // console.log('router', router);
    router.push(`${router.asPath}/${record.key}`);
  };

  // const handleReset = () => {
  //   refreshData();
  // };

  /**
   * @description : Khởi tạo Column
   */
  const columns: ColumnsType<ICateProd> = [
    {
      title: 'ID',
      dataIndex: 'key',
      width: '25%',
      render: (text, _, index) => text,
    },
    {
      title: t.image,
      dataIndex: 'image',
      width: '15%',
    },
    {
      title: t.name,
      dataIndex: 'name',
      width: '25%',
    },
    {
      title: t.order,
      dataIndex: 'order',
      width: '15%',
    },
    {
      title: t.status,
      dataIndex: 'status',
      width: '10%',
      render: (text) => (
        <Switch
          checkedChildren={<icon.AiOutlineCheck />}
          unCheckedChildren={<icon.AiOutlineClose />}
          checked={text}
        />
      ),
    },
    {
      title: t.actions,
      dataIndex: 'actions',
      width: '10%',
      render: (_, record) => (
        <Space wrap>
          <Button type="primary" icon={<icon.AiOutlineEdit />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Chắc chắn xóa?" onConfirm={() => handleDelete(record)}>
            <Button type="primary" danger icon={<icon.AiOutlineDelete />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<ICateProd>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className="bg-white p-6 rounded-md">
      <NavTab />
      <Table columns={columns} dataSource={dataCateProd} onChange={onChange} />
    </div>
  );
};

export default Categories;

export const getStaticProps: GetStaticProps = async () => {
  const query = {
    fields: '',
  };
  const res: AxiosResponse<any> = await getCateProd(query);
  const { data } = res;
  return {
    props: { data: data.data }, // will be passed to the page component as props
  };
};
