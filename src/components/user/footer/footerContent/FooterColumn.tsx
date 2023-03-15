import React from 'react';
import Link from 'next/link';

import { footerContent } from '@/data/footer';

const FooterColumn = () => {
  return (
    <ul className="flex flex-wrap justify-between w-[70%]">
      {footerContent?.map((item) => (
        <li key={item.title} className="">
          <h3 className="border-l-4 border-red-600 px-2">{item?.title}</h3>
          {item?.children && (
            <ul className="mt-2 px-5 text-sm">
              {item?.children?.map((child) => (
                <li key={child.title} className="py-2 text-slate-700">
                  <Link href={child?.slug}>{child?.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FooterColumn;
