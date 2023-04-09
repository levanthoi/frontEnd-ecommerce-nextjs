import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { AxiosResponse } from 'axios';
import { useLanguage } from '@/hooks/useLanguage';
import { getCateProd, getoneCateProd } from '@/services/cateProd.service';
import ViewCategory from '@/components/admin/views/ViewCategory';
import { ICateProd } from '@/lib/types/admin/cateProd.type';

const Edit: NextPage<{ row: ICateProd }> = ({ row }) => {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{`${t.edit} ${t.categories}`}</title>
      </Head>
      <ViewCategory row={row} />
    </>
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
