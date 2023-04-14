import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useLanguage } from '@/hooks/useLanguage';
import ViewAttribute from '@/components/admin/views/ViewAttribute';

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
