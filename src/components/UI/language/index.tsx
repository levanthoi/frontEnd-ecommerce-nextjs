import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { MdLanguage } from 'react-icons/md';
import { useLanguage } from '@/hooks/useLanguage';
// import LanguageItem from '@/components/UI/language/LanguageItem';

const LanguageItem = dynamic(() => import('@/components/UI/language/LanguageItem'), {
  ssr: false,
});

interface Props {
  classname?: string;
}

const Language: React.FC<Props> = ({ classname }) => {
  const { locale } = useLanguage();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <div className={`relative mr-6 ${classname}`}>
      <button
        type="button"
        className="flex items-center gap-1 bg-transparent"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <p className="font-semibold">{locale === 'vi' ? 'VI' : 'EN'}</p>
        <MdLanguage size={25} />
      </button>
      {isOpen && (
        <>
          {/* <div className="fixed inset-0 -z-1" onClick={() => setIsOpen(false)} /> */}
          <ul className="absolute z-50 block w-max bg-white text-slate-900 rounded-md p-3 shadow-md shadow-slate-300">
            <LanguageItem language="vi" onClose={onClose} />
            <LanguageItem language="en" onClose={onClose} />
          </ul>
        </>
      )}
    </div>
  );
};

export default Language;
