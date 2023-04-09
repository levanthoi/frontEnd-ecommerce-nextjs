import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useLanguage } from '@/hooks/useLanguage';
import ViewCategory from '@/components/admin/views/ViewCategory';

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
