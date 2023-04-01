import Link from 'next/link';
import React from 'react';

interface Props {
  title: string;
  image: string;
  slug: string;
}

const CategoryBox: React.FC<Props> = ({ title, image, slug }) => {
  return (
    <li className="w-[150px] py-2">
      <Link href={slug} className="flex flex-col items-center">
        <div className="w-16">
          <img src={image} alt={title} className="rounded-md" />
        </div>
        <p className="text-sm py-2">{title}</p>
      </Link>
    </li>
  );
};

export default CategoryBox;
