import React, { useRef } from 'react';
import Slider from 'react-slick';

// import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';

interface Props {
  children: React.ReactNode;
  settings: object;
}

const Carousel: React.FC<Props> = ({ children, settings }) => {
  const sliderRef = useRef<Slider>(null);
  return (
    <div className="relative overflow-hidden h-full">
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>
      {/* <button
        type="button"
        className=" absolute top-1/2 right-0 -translate-y-full z-10 w-10 h-10 bg-transparent rounded-full"
        onClick={() => sliderRef.current?.slickNext()}
      >
        <HiOutlineChevronRight size={30} />
      </button>
      <button
        type="button"
        className=" absolute top-1/2 left-0 -translate-y-full z-10 w-16 h-16 rounded-full"
        onClick={() => sliderRef.current?.slickPrev()}
      >
        <HiOutlineChevronLeft size={30} />
      </button> */}
    </div>
  );
};

export default Carousel;
