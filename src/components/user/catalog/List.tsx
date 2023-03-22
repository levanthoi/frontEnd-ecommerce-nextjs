import React from 'react';
import Link from 'next/link';
import { categories } from '@/data/category';
import { useLanguage } from '@/hooks/useLanguage';

const List = () => {
  const { t } = useLanguage();
  return (
    <ul className="flex gap-2">
      {categories?.map((category) => (
        <li
          key={category.id}
          className="bg-zinc-200 h-7 px-2 py-1 rounded-md flex items-center text-sm font-medium duration-300 hover:bg-white hover:border hover:border-red-500"
        >
          <Link href="/">{category.title}</Link>
        </li>
      ))}
      <li
        key="all"
        className="bg-zinc-200 h-7 px-2 py-1 rounded-md flex items-center text-sm font-medium duration-300 hover:bg-white hover:border hover:border-red-500"
      >
        <Link href="/">{t.seeAll}</Link>
      </li>
    </ul>
  );
};

export default List;
