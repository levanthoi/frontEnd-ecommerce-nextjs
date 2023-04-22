import React from 'react';
import dynamic from 'next/dynamic';

// import NextNProgress from 'nextjs-progressbar';

const Header = dynamic(() => import('@/components/user/header'), {
  ssr: false,
});
const Footer = dynamic(() => import('@/components/user/footer'), {
  ssr: false,
});
const BackToTop = dynamic(() => import('@/components/user/backToTop'), {
  ssr: false,
});

/**
 *
 * @param param0
 * @returns
 */

const WebLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-[100vh] user px-5 xl:px-16">
      <Header />
      <main className="flex-grow md:mt-[7rem] text-slate-800">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default WebLayout;
