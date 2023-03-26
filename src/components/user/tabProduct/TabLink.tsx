import React, { useState } from 'react';
import { tabProducts } from '@/data/products';

const TabLink = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <ul className="flex gap-4">
        {tabProducts
          ? tabProducts?.map((item, index) => (
              <li
                key={item.id}
                className={`flex gap-2 items-center border border-slate-300 rounded-lg h-[50px] p-2 cursor-pointer duration-300 hover:border-red-500 ${
                  activeTab === index ? ' border-red-500 bg-slate-100' : ''
                }`}
                onClick={() => setActiveTab(index)}
              >
                <div className="h-full">
                  <img src={item.image} alt={item?.title} />
                </div>
                <b>{item?.title}</b>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TabLink;
