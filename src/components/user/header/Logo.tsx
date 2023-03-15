import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <div className="max-w-[12rem]">
        <img
          src="https://bizweb.dktcdn.net/100/422/614/themes/813952/assets/logo.png?1676651885479"
          alt="logo"
        />
      </div>
    </Link>
  );
};

export default Logo;
