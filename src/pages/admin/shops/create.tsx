import React from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useLanguage } from '@/hooks/useLanguage';

const ViewShop = dynamic(() => import('@/components/admin/views/ViewShop'), {
  ssr: false,
});

const Create: NextPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{`${t.create} ${t.shops}`}</title>
      </Head>
      <ViewShop row={null} />
    </>
  );
};

export default Create;
