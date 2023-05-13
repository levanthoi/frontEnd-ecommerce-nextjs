import React from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { AxiosResponse } from 'axios';
import { useLanguage } from '@/hooks/useLanguage';
import { IAttribute } from '@/lib/types/admin/attributes/attribute.type';
import { getAttribute, getoneAttribute } from '@/services/attribute.service';

const ViewAttribute = dynamic(() => import('@/components/admin/views/ViewAttribute'), {
  ssr: false,
});

const Edit: NextPage<{ row: IAttribute }> = ({ row }) => {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{`${t.edit} ${t.attributes}`}</title>
      </Head>
      <ViewAttribute row={row} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = {
    fields: 'key',
  };
  const res: AxiosResponse<any> = await getAttribute(query);
  const { data } = res;

  const paths = data?.data?.map((attr: IAttribute) => ({
    params: {
      id: attr?.key?.toString(),
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
  const res: AxiosResponse<any> = await getoneAttribute(param);
  const category = res.data.data;
  return {
    props: {
      row: category,
    },
  };
};

export default Edit;
