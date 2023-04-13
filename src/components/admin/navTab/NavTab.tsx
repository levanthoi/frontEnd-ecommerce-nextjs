import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Row, Space } from 'antd';
import * as icon from '@/icons';
import { useLanguage } from '@/hooks/useLanguage';

const NavTab: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const handleReset = () => {
    router.replace(router.asPath);
  };
  return (
    <Row justify="space-between" className="my-4">
      <Space>
        <Button
          className="text-purple-700 bg-purple-200"
          icon={<icon.TfiReload />}
          onClick={handleReset}
        />
        <Button className="text-green-700 bg-green-200" icon={<icon.AiOutlineShop />} />
        <Button className="text-red-700 bg-red-200" icon={<icon.BiExport />}>
          Export
        </Button>
      </Space>
      <Button type="primary" icon={<icon.AiOutlinePlus />}>
        <Link href={`${router.asPath}/create`}>{t.addNew}</Link>
      </Button>
    </Row>
  );
};

export default NavTab;
