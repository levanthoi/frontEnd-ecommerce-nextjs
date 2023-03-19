import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';

interface Props {
  // id?: number;
  title: string;
  image: string;
  slug: string;
}

const Slide: React.FC<Props> = ({ slug, title, image }) => {
  return (
    <Link href={slug}>
      {/* <Image src={image} alt={title} width={800} height={400} /> */}
      <div className="h-full">
        <img src={image} alt={title} className="rounded-lg" />
      </div>
    </Link>
  );
};

export default Slide;
