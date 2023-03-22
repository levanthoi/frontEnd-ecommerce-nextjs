import React from 'react';
import { brands } from '@/data/brands';
import BrandBox from './BrandBox';
import Carousel from '../carousel';

const Brands = () => {
  const settings = {
    infinite: true,
    arrows: false,
    speed: 6000,
    slidesToShow: 8,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 8000,
    cssEase: 'linear',
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <div className="bg-pink-500">
      <Carousel settings={settings}>
        {brands?.map((brand) => (
          <BrandBox key={brand.id} name={brand.name} image={brand.imgSrc} />
        ))}
      </Carousel>
    </div>
  );
};

export default Brands;
