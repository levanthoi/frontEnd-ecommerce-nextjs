import React from 'react';
import Slider from 'react-slick';

interface Props {
  children: React.ReactNode;
  settings: object;
}

const index: React.FC<Props> = ({ children, settings }) => {
  return (
    <div className="relative overflow-hidden text-slate-900">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default index;
