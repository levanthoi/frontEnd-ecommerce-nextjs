import React from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useLanguage } from '@/hooks/useLanguage';

const ViewCategory = dynamic(() => import('@/components/admin/views/ViewCategory'), {
  ssr: false,
});

const Create: NextPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{`${t.create} ${t.categories}`}</title>
      </Head>
      <ViewCategory row={null} />
    </>
  );
};

export default Create;
