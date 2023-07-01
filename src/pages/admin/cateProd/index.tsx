import React, { useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
// import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Button, Image, Popconfirm, Space, Switch, Table } from 'antd';
// import Link from 'next/link';
import { useRouter } from 'next/router';
// import { useDispatch } from 'react-redux';
// icon
import { AiOutlineDelete, AiOutlineEdit, AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { useLanguage } from '@/hooks/useLanguage';
import { ICateProd } from '@/lib/types/admin/cateProd.type';
import { deleteCateProd, getCateProd } from '@/services/cateProd.service';
import { Notification } from '@/components/UI/Notification';

const NavTab = dynamic(() => import('@/components/admin/navTab/NavTab'), {
  ssr: false,
});
// const Notification = dynamic(() => import('@/components/UI/Notification').then(module => module.default), {
//   ssr: false,
// });

// interface Props {
//   data: ICateProd[];
// }

const Categories: React.FC = () => {
  const { t } = useLanguage();
  // const dispatch = useDispatch();
  const router = useRouter();
  const [dataCateProd, setDataCateProd] = useState<Array<ICateProd> | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetch = useCallback(async () => {
    const query = {
      fields: '',
    };
    setIsLoading(true);
    const res: AxiosResponse<any> = await getCateProd(query);

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

    const topLevelItems = res?.data?.data?.filter((item: ICateProd) => item.parent === 'root');
    const nestedStructure = topLevelItems.map((item: ICateProd) => ({
      ...item,
      children: buildNestedStructure(res?.data?.data, item),
    }));

    setDataCateProd(nestedStructure);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // useEffect(() => {
  //   function buildNestedStructure(
  //     items: ICateProd[],
  //     parent: ICateProd | undefined,
  //   ): ICateProd[] | undefined {
  //     const children = items.filter((item) => item.parent === parent?.key);
  //     if (children.length === 0) {
  //       return undefined;
  //     }

  //     const nestedChildren = children.map((child) => ({
  //       ...child,
  //       children: buildNestedStructure(items, child),
  //     }));

  //     return nestedChildren;
  //   }

  //   const topLevelItems = dataCateProd.filter((item) => item.parent === 'root');
  //   const nestedStructure = topLevelItems.map((item) => ({
  //     ...item,
  //     children: buildNestedStructure(dataCateProd, item),
  //   }));

  //   setDataCateProd(nestedStructure);
  // }, [dataCateProd]);

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
      // const afterDelete = dataCateProd?.filter((cateProd) => cateProd.key !== record.key);
      // setDataCateProd(afterDelete);
      Notification(message, success);
      fetch();
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
      width: '5%',
      render: (text, _, index) => index + 1,
    },
    {
      title: t.image,
      dataIndex: ['image', 'url'],
      width: '15%',
      render: (text) => <Image src={text} alt={text} />,
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
          checkedChildren={<AiOutlineCheck />}
          unCheckedChildren={<AiOutlineClose />}
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
          <Button type="primary" icon={<AiOutlineEdit />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Chắc chắn xóa?" onConfirm={() => handleDelete(record)}>
            <Button type="primary" danger icon={<AiOutlineDelete />} />
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
      <NavTab fetchList={fetch} />
      <Table
        columns={columns}
        dataSource={dataCateProd}
        loading={isLoading}
        rowKey="_id"
        onChange={onChange}
      />
    </div>
  );
};

export default Categories;

// export const getStaticProps: GetStaticProps = async () => {
//   const query = {
//     fields: '',
//   };
//   const res: AxiosResponse<any> = await getCateProd(query);
//   const { data } = res;
//   return {
//     props: { data: data.data }, // will be passed to the page component as props
//   };
// };
