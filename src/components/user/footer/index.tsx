import React from 'react';
import FooterColumn from '@/components/user/footer/footerContent/FooterColumn';
import Socials from '@/components/user/footer/footerContent/Socials';
import PaymentMethod from '@/components/user/footer/footerContent/PaymentMethod';

const Footer = () => {
  return (
    <footer className="text-slate-900 mt-12 px-4 py-8 border-t border-zinc-400">
      <div className="flex">
        <FooterColumn />
        <div className="ml-16">
          <Socials />
          <PaymentMethod />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
