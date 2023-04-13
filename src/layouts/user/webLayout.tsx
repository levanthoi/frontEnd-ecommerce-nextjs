import React from 'react';
// import NextNProgress from 'nextjs-progressbar';

import Header from '@/components/user/header';
import Footer from '@/components/user/footer';
import BackToTop from '@/components/user/backToTop';

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
