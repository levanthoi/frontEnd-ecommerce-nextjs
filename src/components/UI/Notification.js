import { notification } from 'antd';

export const Notification = (message, status) => {
  let type = 'success';
  if (status === false) {
    type = 'error';
  }
  return notification[type]({
    message,
  });
};
