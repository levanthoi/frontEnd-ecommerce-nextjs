import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useLanguage } from '@/hooks/useLanguage';
import ViewBrand from '@/components/admin/views/ViewBrand';

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
