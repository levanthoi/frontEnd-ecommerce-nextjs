import { notification } from 'antd';
// import { useLanguage } from '@/hooks/useLanguage';

export const CusNotification = (message, type = 'succes') => {
  // const { t } = useLanguage();
  return notification[type]({
    message,
  });
};

// CusNotification.defaultProps ={
//   type : 'success' || 'error' || 'info' || 'warning',
// }
