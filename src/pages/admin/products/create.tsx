import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import type { NextPage } from 'next';

import { useLanguage } from '@/hooks/useLanguage';

const ViewProduct = dynamic(() => import('@/components/admin/views/ViewProduct'), {
  ssr: false,
});

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
