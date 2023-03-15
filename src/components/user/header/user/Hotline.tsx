import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';

const Hotline = () => {
  return (
    <div>
      <a href="tel:032424" className="flex items-center gap-2">
        <BiPhoneCall size={30} />
        <b>
          Hotline <br />
          1900 8237
        </b>
      </a>
    </div>
  );
};

export default Hotline;
