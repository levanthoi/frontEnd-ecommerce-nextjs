import React from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';

import { dataNavbars } from '@/data/navbars';

const Navbar = () => {
  return (
    <nav className="ml-4">
      <ul className="flex gap-6">
        {dataNavbars?.map((item) => {
          return (
            <li key={item?.id} className="relative">
              <a
                href={item?.slug}
                className={`${item?.children ? 'capitalize flex' : 'capitalize'}`}
              >
                {item?.title}
                {item?.children && <AiOutlineArrowDown />}
              </a>
              {item?.children && (
                <ul className="relative hidden">
                  {item?.children?.map((child) => {
                    return (
                      <li key={child?.category?.id}>
                        <a href="/">{child?.category?.title}</a>
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
