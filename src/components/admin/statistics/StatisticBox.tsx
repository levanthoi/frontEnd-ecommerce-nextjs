import { Button, Card, Col, Row } from 'antd';
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import * as icon from '@/icons';
import { useLanguage } from '@/hooks/useLanguage';

interface Props {
  color: string;
  bg: string;
  Icon: IconType;
  val: number;
  title: string;
}

const StatisticBox: React.FC<Props> = ({ color, bg, Icon, val, title }) => {
  const { t } = useLanguage();
  return (
    <Col span={6}>
      <Card bordered={false}>
        <h4 className={`${color} text-lg font-semibold uppercase`}>{t[`${title}`]}</h4>
        <Row justify="space-between" align="middle" className="group">
          <Col>
            <h3 className="font-bold text-slate-700 text-lg">{val}</h3>
            <Link href={`/admin/${title}`} className="group-hover:italic duration-200">
              {t.seeAll}
              <span>
                <icon.AiOutlineArrowRight className="opacity-0 group-hover:opacity-100 duration-200" />
              </span>
            </Link>
          </Col>
          <Button className={`rounded-md ${color} ${bg}`} icon={<Icon />} size="large" />
          {/* <ColIcon color={color} bg={bg} Icon={Icon} /> */}
        </Row>
      </Card>
    </Col>
  );
};

export default StatisticBox;
