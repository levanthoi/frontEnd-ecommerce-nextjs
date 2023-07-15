import React, { useState } from 'react';
import { Space } from 'antd';
import { useDispatch } from 'react-redux';

import { IProduct } from '@/lib/types/admin/products/product.type';
import { IOrder } from '@/lib/types/admin/orders/order.type';
import { formatNumber } from '@/utils/helpers';
import { useLanguage } from '@/hooks/useLanguage';

interface Props {
  products: IOrder[];
  onChangeDisplay: () => void;
}

const ViewResult: React.FC<Props> = ({ products, onChangeDisplay }) => {
  //   const [listProducts, setListProducts] = useState<IProduct[]>([]);
  const { t, locale } = useLanguage();

  const dispatch = useDispatch();

  const handleClick = (product: IOrder) => {
    // setListProducts(prev => [...prev, product]);
    const addItem: IOrder = { ...product, quantity: 1 };
    dispatch({
      type: 'order/addProduct',
      payload: addItem,
    });

    onChangeDisplay();
  };

  console.log('viewresult');

  return (
    <ul className="bg-slate-50 absolute w-full top-12 rounded-md right-0 z-20">
      {products?.map((product) => (
        <li
          key={product?._id}
          className="flex items-center justify-between px-4 cursor-pointer hover:bg-slate-100 duration-200 my-2"
          onClick={() => handleClick(product)}
        >
          <Space>
            <img
              src={product?.image?.url}
              alt={product?.variant}
              style={{ width: '44px', height: '44px' }}
            />
            <div className="">
              <p className="leading-4 text-sm">{product?.variant || ''}</p>
              <p className="leading-4 mb-0 text-sm">
                {t.stock}: <b>{product?.stock}</b> - {product?.unit || 'Cái'}
              </p>
            </div>
          </Space>
          <p className="text-base text-purple-500 font-medium">
            {formatNumber(product?.variantPrice, locale)}
          </p>
        </li>
        // <>

        //   {product.details && product.details.length > 0 ? (
        //     <ul>
        //       {product.details?.map((item) => (
        //         <li key={item?._id}>
        //           {product.title} - {item?.variant}
        //         </li>
        //       ))}
        //     </ul>
        //   ) : null}
        // </>
      ))}
    </ul>
  );
};

export default ViewResult;
