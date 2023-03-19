import React from 'react';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from './CarouselArrows';

interface Props {
  children?: React.ReactNode;

  //   settings: object;
}

const CarouselBox: React.FC<Props> = ({ children }) => {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 5,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="relative overflow-hidden text-slate-900">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default CarouselBox;
