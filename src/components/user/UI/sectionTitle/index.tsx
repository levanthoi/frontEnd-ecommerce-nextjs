import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

interface Props {
  title: string;
}

const SectionTitle: React.FC<Props> = ({ title }) => {
  const { t } = useLanguage();
  return <h2 className="my-2 text-xl uppercase border-b-2 border-slate-100">{t[title]}</h2>;
};

export default SectionTitle;
