import React from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useLanguage } from '@/hooks/useLanguage';

const ViewAttribute = dynamic(() => import('@/components/admin/views/ViewAttribute'), {
  ssr: false,
});

const Create: NextPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{`${t.create} ${t.attributes}`}</title>
      </Head>
      <ViewAttribute row={null} />
    </>
  );
};

export default Create;
