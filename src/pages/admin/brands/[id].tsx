import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { AxiosResponse } from 'axios';
import { useLanguage } from '@/hooks/useLanguage';
import { IBrand } from '@/lib/types/admin/brands/brand.type';
import { getBrand, getoneBrand } from '@/services/brand.service';
import ViewBrand from '@/components/admin/views/ViewBrand';

const Edit: NextPage<{ row: IBrand }> = ({ row }) => {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{`${t.edit} ${t.brands}`}</title>
      </Head>
      <ViewBrand row={row} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = {
    fields: 'key',
  };
  const res: AxiosResponse<any> = await getBrand(query);
  const { data } = res;

  const paths = data?.data?.map((category: IBrand) => ({
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
  const res: AxiosResponse<any> = await getoneBrand(param);
  const category = res.data.data;
  return {
    props: {
      row: category,
    },
  };
};

export default Edit;
