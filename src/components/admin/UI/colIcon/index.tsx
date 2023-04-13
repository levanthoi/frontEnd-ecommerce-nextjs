import React from 'react';
import { IconType } from 'react-icons';
import { Button, Col } from 'antd';

interface Props {
  color: string;
  classname?: string;
  bg: string;
  Icon: IconType;
}

const ColIcon: React.FC<Props> = ({ bg, Icon, color, classname }) => {
  return (
    // <Col className={`rounded-md py-2 px-3 ${bg} ${classname}`}>
    //   <Icon size={20} className={color} />
    // </Col>
    <Button className={`rounded-md  ${color} ${bg} ${classname}`} icon={<Icon />} size="large" />
  );
};

export default ColIcon;
