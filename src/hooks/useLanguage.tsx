import { useRouter } from 'next/router';
import vi from '@/locales/vi';
import en from '@/locales/en';

export const useLanguage = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  return { t, locale };
};
