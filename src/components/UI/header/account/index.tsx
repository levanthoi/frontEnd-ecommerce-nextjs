import { Avatar, Image } from 'antd';
import React from 'react';

const Account = () => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>admin</Avatar>
      <h3>Admin</h3>
    </div>
  );
};

export default Account;
