import React from 'react';
import dynamic from 'next/dynamic';
import { Row } from 'antd';

// icon
import { RiMoneyDollarBoxFill } from 'react-icons/ri';
import { HiUserGroup } from 'react-icons/hi';
import { AiTwotoneShop } from 'react-icons/ai';
import { BsFillCartCheckFill } from 'react-icons/bs';

const StatisticBox = dynamic(() => import('@/components/admin/statistics/StatisticBox'), {
  ssr: false,
});

const CStatistic: React.FC = () => {
  return (
    <Row gutter={16}>
      <StatisticBox
        color="text-rose-700"
        bg="bg-red-200"
        Icon={RiMoneyDollarBoxFill}
        val={150000000}
        title="revenues"
      />
      <StatisticBox
        color="text-sky-700"
        bg="bg-sky-200"
        Icon={BsFillCartCheckFill}
        val={2000}
        title="orders"
      />
      <StatisticBox
        color="text-green-700"
        bg="bg-green-200"
        Icon={AiTwotoneShop}
        val={10}
        title="shops"
      />
      <StatisticBox
        color="text-fuchsia-700"
        bg="bg-fuchsia-200"
        Icon={HiUserGroup}
        val={500}
        title="customers"
      />
    </Row>
  );
};

export default CStatistic;
