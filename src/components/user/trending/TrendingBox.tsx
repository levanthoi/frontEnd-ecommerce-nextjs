import React from 'react';
import { NextArrow } from '@/components/user/UI/carousel/CarouselArrows';

const TrendingBox = () => {
  return (
    <li className="col-span-3 bg-white rounded-md p-3">
      <div className="flex">
        <div className="">
          <img src="/oppo.png" alt="anh" />
        </div>
        <div className="relative rounded-lg ">
          <img src="/oppo.png" alt="anh" className="z-10 bg-slate-900/40 rounded-lg" />
          <div className="absolute top-0 w-full h-full z-20 text-3xl text-white flex items-center justify-center font-bold drop-shadow-lg shadow-black">
            +11
          </div>
        </div>
      </div>
      <div className="relative mt-2">
        <p className=" text-sky-600 font-medium text-base">giá cạnh tranh</p>
        <p className="text-base">
          <b>Điện thoại</b>
        </p>
        <NextArrow
          className="bg-zinc-300/60 -translate-y-1/2 hover:bg-[#ff6633] hover:translate-x-2 duration-300"
          style={{ textAlign: '-webkit-center' }}
        />
      </div>
    </li>
  );
};

export default TrendingBox;
