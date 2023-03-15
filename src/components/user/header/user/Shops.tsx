import React from 'react';
import { GrMapLocation } from 'react-icons/gr';

const Shops = () => {
  return (
    <div>
      <address className="flex items-center gap-2 cursor-pointer">
        <GrMapLocation size={30} />
        <b>
          Hệ thống <br />
          cửa hàng
        </b>
      </address>
    </div>
  );
};

export default Shops;
