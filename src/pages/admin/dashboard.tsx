import React from 'react';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import CStatistic from '@/components/admin/statistics';
import AreaChart from '@/components/admin/chart/AreaChart';
import * as icon from '@/icons';

const Dashboard: React.FC = () => {
  return (
    <>
      <CStatistic />
      <Card className="my-6">
        <Row justify="space-between" align="middle">
          <Col className="flex items-center">
            <icon.AiOutlineAreaChart size={25} />
            <Typography.Text>Biểu đồ doanh thu</Typography.Text>
          </Col>
          <Col>
            <Space>
              <Button>Daily</Button>
              <Button type="primary">Mont</Button>
            </Space>
          </Col>
        </Row>
        <div className="max-h-[365px] w-ful">
          <AreaChart />
        </div>
      </Card>
    </>
  );
};

export default Dashboard;
