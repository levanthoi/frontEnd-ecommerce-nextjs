import React from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { AxiosResponse } from 'axios';
import { useLanguage } from '@/hooks/useLanguage';
import { IProduct } from '@/lib/types/admin/products/product.type';
import { getProduct, getoneProduct } from '@/services/product.service';

const ViewProduct = dynamic(() => import('@/components/admin/views/ViewProduct'), {
  ssr: false,
});

const Edit: NextPage<{ row: IProduct }> = ({ row }) => {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{`${t.edit} ${t.products}`}</title>
      </Head>
      <ViewProduct row={row} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = {
    fields: '_id',
  };
  const res: AxiosResponse<any> = await getProduct(query);
  const { data } = res;

  const paths = data?.data?.map((product: IProduct) => ({
    params: {
      id: product?._id?.toString(),
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
  const res: AxiosResponse<any> = await getoneProduct(param);
  const product = res.data.data;
  return {
    props: {
      row: product,
    },
  };
};

export default Edit;
