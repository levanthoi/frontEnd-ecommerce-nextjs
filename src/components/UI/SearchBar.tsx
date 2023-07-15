import React, { useEffect, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { useDebounce } from '@/hooks/useDebounce';
// import { dataProducts } from '@/data/admin/product/product';
import ViewResult from './ViewResult';
import { searchProduct } from '@/services/product.service';
import { IOrder } from '@/lib/types/admin/orders/order.type';

const SearchBar = () => {
  const [products, setProducts] = useState<IOrder[]>([]);
  const [searchVal, setSearchVal] = useState<string>('');
  const [isDisplay, setIsDisplay] = useState<boolean>(false);

  const query = useDebounce(searchVal, 500);

  const handleChange = () => {
    setIsDisplay(false);
  };
  console.log('searchBar');

  useEffect(() => {
    const fetch = async (q: string) => {
      // const qr = {
      //   q,
      // };
      const response = await searchProduct(q);
      const data = await response?.data?.data;
      console.log(data);
      setProducts(data);
    };
    if (query) {
      fetch(query);
    }
  }, [query]);

  // const products = useMemo(
  //   () => dataProducts.filter((product) => product.title.includes(query)),
  //   [query],
  // );

  return (
    <div className="max-w-[40rem] h-10 flex items-center bg-slate-100 rounded-md px-4 relative">
      <GoSearch style={{ color: 'black' }} size={20} />
      <input
        type="search"
        placeholder="Tìm sản phẩm"
        className="px-3 py-2 w-full bg-transparent text-slate-900"
        onChange={(e) => setSearchVal(e.target.value)}
        onFocus={() => setIsDisplay(true)}
      />
      {isDisplay && products?.length > 0 ? (
        <ViewResult products={products} onChangeDisplay={handleChange} />
      ) : null}
    </div>
  );
};

export default SearchBar;
