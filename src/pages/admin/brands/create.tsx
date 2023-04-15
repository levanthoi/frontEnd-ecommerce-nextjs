import React from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useLanguage } from '@/hooks/useLanguage';

const ViewBrand = dynamic(() => import('@/components/admin/views/ViewBrand'), {
  ssr: false,
});

const Create: NextPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{`${t.create} ${t.brands}`}</title>
      </Head>
      <ViewBrand row={null} />
    </>
  );
};

export default Create;
