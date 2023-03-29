import Head from 'next/head';
import dynamic from 'next/dynamic';
// import styles from '@/styles/Home.module.css';

import WebLayout from '@/layouts/user/webLayout';
import Carousel from '@/components/user/carousel';
import { sliders } from '@/data/slider';
import Slide from '@/components/user/carousel/Slide';
import { NextArrow, PrevArrow } from '@/components/user/carousel/Arrow';

const PromotionNews = dynamic(() => import('@/components/user/promotionNews'));
const Category = dynamic(() => import('@/components/user/category'));
const Banner = dynamic(() => import('@/components/user/banner'));
const FlashSale = dynamic(() => import('@/components/user/flashsale'));
const TabProduct = dynamic(() => import('@/components/user/tabProduct'));
const Trending = dynamic(() => import('@/components/user/trending'));
const Catalog = dynamic(() => import('@/components/user/catalog'));
const Brands = dynamic(() => import('@/components/user/brands'));

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  cssEase: 'linear',
  nextArrow: <NextArrow to="next" />,
  prevArrow: <PrevArrow to="prev" />,
  appendDots: (dots: string) => (
    <div>
      <ul className="flex justify-center h-4"> {dots} </ul>
    </div>
  ),
};
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WebLayout>
        <div>
          <div className="flex flex-row bg-white h-[415px] rounded-md overflow-hidden">
            <div className="w-[75%]">
              <Carousel settings={settings}>
                {sliders?.map((slide) => (
                  <Slide key={slide.id} {...slide} />
                ))}
              </Carousel>
            </div>
            <div className="ml-4 w-[25%]">
              <PromotionNews />
            </div>
          </div>
          <Category />
          <Banner />
          <FlashSale />
          <TabProduct />
          <Trending />
          <Catalog title="featuredPhone" />
          <Catalog title="laptopHot" />
          <Brands />
        </div>
      </WebLayout>
    </>
  );
}
