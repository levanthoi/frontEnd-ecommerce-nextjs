import React from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import Link from 'next/link';

import { dataNavbars } from '@/data/navbars';

const Navbar = () => {
  return (
    <nav className="ml-4">
      <ul className="flex gap-6">
        {dataNavbars?.map((item) => {
          return (
            <li key={item?.id} className="relative">
              <Link
                href={item?.slug}
                className={`${item?.children ? 'capitalize flex' : 'capitalize'}`}
              >
                {item?.title}
                {item?.children && <AiOutlineArrowDown />}
              </Link>
              {item?.children && (
                <ul className="relative hidden">
                  {item?.children?.map((child) => {
                    return (
                      <li key={child?.category?.id}>
                        <Link href="/">{child?.category?.title}</Link>
                        <ul>
                          {child?.productsGroup?.map((product) => (
                            <li key={product}>{product}</li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
