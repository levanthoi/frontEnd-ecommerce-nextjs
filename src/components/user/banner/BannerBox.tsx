import React from 'react';

interface Props {
  image: string;
}

const BannerBox: React.FC<Props> = ({ image }) => {
  return (
    <li className="relative cursor-pointer basis-1/3 h-[215px] before:absolute before:w-full before:h-0 before:bg-slate-100 before:opacity-60 hover:before:animate-brandEntering">
      <img src={image} alt={image} className="rounded-md" />
    </li>
  );
};

export default BannerBox;
