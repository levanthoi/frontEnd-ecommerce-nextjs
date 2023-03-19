// import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PromotionBox = () => {
  return (
    <article className="my-2">
      <Link href="a" className="flex gap-2">
        <div className="min-w-[100px] max-w-[100px] h-16">
          {/* <Image
            src="https://bizweb.dktcdn.net/thumb/medium/100/422/614/articles/mot-mon-qua-tu-mew-mall.jpg?v=1636385900007"
            alt="tin tuc"
            width={50}
            height={40}
          /> */}
          <img
            src="https://bizweb.dktcdn.net/thumb/medium/100/422/614/articles/mot-mon-qua-tu-mew-mall.jpg?v=1636385900007"
            alt="tin tuc1"
            className=" rounded-md"
          />
        </div>
        <div>
          <p className="h-10 line-clamp-2 text-sm font-medium">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex dolores quam cumque
            accusamus cum nobis numquam accusantium earum quibusdam ea, asperiores tempore dolorem
            rerum repellendus voluptates doloremque ducimus ut! Sequi.
          </p>
          <small className="text-stone-600">17/03/2023</small>
        </div>
      </Link>
    </article>
  );
};

export default PromotionBox;
