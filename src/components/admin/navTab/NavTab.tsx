import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ColumnsType } from 'antd/es/table';
import { Button, Row, Space } from 'antd';
import * as icon from '@/icons';
import { useLanguage } from '@/hooks/useLanguage';
import AddColumn from '../addColumn';
// import { IProduct } from '@/lib/types/products';
// import { IBrand } from '@/lib/types/admin/brands/brand.type';
// import { ICateProd } from '@/lib/types/admin/cateProd.type';
// import { IShop } from '@/lib/types/admin/shops/shop.type';

interface Props {
  fetchList: () => Promise<void>;
  onExport?: () => Promise<void>;
  columns?: any;
  handleAddColumn?: ((a: any) => void) | (() => {});
}

const NavTab: React.FC<Props> = ({ fetchList, onExport, columns, handleAddColumn = () => {} }) => {
  const router = useRouter();
  const { t } = useLanguage();

  const handleReset = () => {
    fetchList();
  };
  return (
    <Row justify="space-between" className="my-4 z-10">
      <Space>
        <Button
          className="text-purple-700 bg-purple-200"
          icon={<icon.TfiReload />}
          onClick={handleReset}
        />
        <AddColumn columns={columns} handleAddColumn={handleAddColumn} />
        <Button className="text-red-700 bg-red-200" icon={<icon.BiExport />} onClick={onExport}>
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
