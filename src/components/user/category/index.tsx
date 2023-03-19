import React from 'react';
import SectionTitle from '@/components/user/UI/sectionTitle';
import CategoryBox from '@/components/user/category/CategoryBox';

import { categories } from '@/data/category';

const Category = () => {
  return (
    <div className="bg-white rounded-md px-4 py-2 my-4">
      <SectionTitle title="featuredCategory" />
      <ul className="flex flex-wrap">
        {categories?.map((category) => (
          <CategoryBox key={category.id} {...category} />
        ))}
      </ul>
    </div>
  );
};

export default Category;
