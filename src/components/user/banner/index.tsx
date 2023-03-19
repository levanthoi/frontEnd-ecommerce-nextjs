import React from 'react';
import { banners } from '@/data/banner';
import BannerBox from '@/components/user/banner/BannerBox';

const Banner = () => {
  return (
    <div>
      <ul className="flex gap-6 relative">
        {banners?.map((banner) => (
          <BannerBox key={banner.id} {...banner} />
        ))}
      </ul>
    </div>
  );
};

export default Banner;
