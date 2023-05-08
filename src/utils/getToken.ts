import Cookies from 'js-cookie';

export const getUser = () => {
  const whoami = Cookies.get('data') ? JSON.parse(Cookies.get('data') || '') : null;
  return whoami;
};
