import React from 'react';
import SectionTitle from '@/components/user/UI/sectionTitle';
import PromotionBox from '@/components/user/promotionNews/PromotionBox';

const PromotionNews = () => {
  return (
    <div className="">
      <SectionTitle title="promotion" />
      <PromotionBox />
      <PromotionBox />
      <PromotionBox />
      <PromotionBox />
      <PromotionBox />
    </div>
  );
};

export default PromotionNews;
