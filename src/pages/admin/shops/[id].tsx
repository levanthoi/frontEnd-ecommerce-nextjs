import React from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { AxiosResponse } from 'axios';
import { useLanguage } from '@/hooks/useLanguage';
import { IShop } from '@/lib/types/admin/shops/shop.type';
import { getShop, getoneShop } from '@/services/shop.service';

const ViewShop = dynamic(() => import('@/components/admin/views/ViewShop'), {
  ssr: false,
});

const Edit: NextPage<{ row: IShop }> = ({ row }) => {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{`${t.edit} ${t.shops}`}</title>
      </Head>
      <ViewShop row={row} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = {
    fields: 'key',
  };
  const res: AxiosResponse<any> = await getShop(query);
  const { data } = res;

  const paths = data?.data?.map((category: IShop) => ({
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
  const res: AxiosResponse<any> = await getoneShop(param);
  const category = res.data.data;
  return {
    props: {
      row: category,
    },
  };
};

export default Edit;
