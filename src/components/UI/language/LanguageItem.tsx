import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLanguage } from '@/hooks/useLanguage';

interface Props {
  language: string;
  onClose: any;
}

const LanguageItem: React.FC<Props> = ({ language, onClose }) => {
  const { t, locale } = useLanguage();
  const router = useRouter();
  // console.log('router', router);

  return (
    <Link href={`${router.asPath}`} locale={language}>
      <li onClick={() => onClose(false)}>
        <input
          type="radio"
          name="language"
          id={language}
          defaultChecked={locale === language ? true : false}
          className="accent-red-600"
        />
        <label htmlFor={language} className="ml-3">
          {t[`${language}`]}
        </label>
      </li>
    </Link>
  );
};

export default LanguageItem;
