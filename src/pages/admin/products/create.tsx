import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useLanguage } from '@/hooks/useLanguage';
import ViewProduct from '@/components/admin/views/ViewProduct';

const Create: NextPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{`${t.create} ${t.products}`}</title>
      </Head>
      <ViewProduct row={null} />
    </>
  );
};

export default Create;
