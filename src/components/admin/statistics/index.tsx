import React from 'react';
import { Row } from 'antd';
import StatisticBox from '@/components/admin/statistics/StatisticBox';
import * as icon from '@/icons';

const CStatistic: React.FC = () => {
  return (
    <Row gutter={16}>
      <StatisticBox
        color="text-rose-700"
        bg="bg-red-200"
        Icon={icon.RiMoneyDollarBoxFill}
        val={150000000}
        title="revenues"
      />
      <StatisticBox
        color="text-sky-700"
        bg="bg-sky-200"
        Icon={icon.BsFillCartCheckFill}
        val={2000}
        title="orders"
      />
      <StatisticBox
        color="text-green-700"
        bg="bg-green-200"
        Icon={icon.AiTwotoneShop}
        val={10}
        title="shops"
      />
      <StatisticBox
        color="text-fuchsia-700"
        bg="bg-fuchsia-200"
        Icon={icon.HiUserGroup}
        val={500}
        title="customers"
      />
    </Row>
  );
};

export default CStatistic;
