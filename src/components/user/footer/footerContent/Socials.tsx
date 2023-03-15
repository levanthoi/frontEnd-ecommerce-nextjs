import React from 'react';
import Link from 'next/link';

import { socialsMedia } from '@/data/footer';

const Socials = () => {
  return (
    <div className="">
      <h3 className="text-lg">Kết nối với chúng tôi</h3>
      <ul className="flex mt-2">
        {socialsMedia?.map((item) => (
          <li
            key={item?.title}
            className="px-2 text-slate-500 hover:text-slate-900 duration-300 ease-in-out"
          >
            <Link href={item?.slug}>
              <item.icon size={30} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Socials;
