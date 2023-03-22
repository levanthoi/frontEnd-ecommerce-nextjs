import React from 'react';
import SectionTitle from '../UI/sectionTitle';
import TrendingBox from './TrendingBox';

const Trending = () => {
  return (
    <div className="bg-orange-200 px-4 py-2 pb-4 my-4 rounded-md">
      <SectionTitle title="trending" />
      <ul className="grid gap-6 grid-cols-12">
        <TrendingBox />
        <TrendingBox />
        <TrendingBox />
        <TrendingBox />
      </ul>
    </div>
  );
};

export default Trending;
