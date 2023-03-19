import React from 'react';

interface Props {
  title: string;
  image: string;
}

const CategoryBox: React.FC<Props> = ({ title, image }) => {
  return (
    <li className="w-[150px] flex flex-col items-center py-2">
      <div className="w-16">
        <img src={image} alt={title} className="rounded-md" />
      </div>
      <p className="text-sm py-2">{title}</p>
    </li>
  );
};

export default CategoryBox;
