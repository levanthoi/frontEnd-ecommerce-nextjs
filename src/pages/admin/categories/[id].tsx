import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '@/hooks/useLanguage';
import { RootState } from '@/redux/reducers/rootReducer';
import { Notification } from '@/components/UI/Notification';
import { getCateProd, getoneCateProd } from '@/services/cateProd.service';
import ViewCategory from '@/components/admin/views/ViewCategory';
import { ICateProd } from '@/lib/types/admin/cateProd.type';

const AdminLayout = dynamic(() => import('@/layouts/admin/AdminLayout'), {
  ssr: false,
});

const Edit: NextPage<{ row: ICateProd }> = ({ row }) => {
  console.log('row', row);

  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useLanguage();

  const { message, success } = useSelector((state: RootState) => state.cateProd);

  useEffect(() => {
    if (message) {
      Notification(message, success);
      if (success) router.back();
    }
  }, [message, success, router]);

  const [categories, setCategories] = useState<Array<{ label: string; value: string }> | []>([
    {
      label: 'Root',
      value: 'root',
    },
  ]);

  const [module, setModule] = useState<Array<{ label: string; value: string }> | []>([
    {
      label: t.product,
      value: 'product',
    },
    {
      label: t.blog,
      value: 'blog',
    },
  ]);
  // useEffect(() => {
  //   const a = data?.map((item: any) => {
  //     return { ...item, value: item._id, label: item.name };
  //   });
  //   setCategories((prev) => [...prev, ...a]);
  // }, [data]);

  return (
    <AdminLayout>
      <Head>
        <title>{`${t.create} ${t.categories}`}</title>
      </Head>
      <ViewCategory row={row} />
    </AdminLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = {
    fields: 'key',
  };
  const res: AxiosResponse<any> = await getCateProd(query);
  const { data } = res;

  const paths = data?.data?.map((category: ICateProd) => ({
    params: {
      id: category.key.toString(),
    },
  }));
  return {
    fallback: 'blocking',
    paths,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const param = {
    id: context.params?.id,
  };
  const res: AxiosResponse<any> = await getoneCateProd(param);
  const category = res.data.data;
  return {
    props: {
      row: category,
    },
  };
};

export default Edit;
