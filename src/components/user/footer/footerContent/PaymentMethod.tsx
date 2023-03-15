import React from 'react';
import { paymentMethods } from '@/data/footer';

const PaymentMethod = () => {
  return (
    <div className="mt-2">
      <h3 className="text-lg">Kết nối với chúng tôi</h3>
      <ul className="flex mt-2">
        {paymentMethods?.map((item) => (
          <li
            key={item?.title}
            className="px-2 text-slate-500 hover:text-slate-900 duration-300 ease-in-out"
          >
            <item.icon size={30} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentMethod;
