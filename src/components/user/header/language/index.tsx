import React, { useState } from 'react';
import { MdLanguage } from 'react-icons/md';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageItem from './LanguageItem';

const Language = () => {
  const { locale } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <div className=" mr-6">
      <button
        type="button"
        className="flex items-center gap-1 relative bg-transparent"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <p className="font-semibold">{locale === 'vi' ? 'VI' : 'EN'}</p>
        <MdLanguage size={25} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 -z-1" onClick={() => setIsOpen(false)} />
          <ul className="absolute bg-white text-slate-900 rounded-md right-16 p-3 shadow-md shadow-slate-300">
            <LanguageItem language="vi" onClose={onClose} />
            <LanguageItem language="en" onClose={onClose} />
          </ul>
        </>
      )}
    </div>
  );
};

export default Language;
