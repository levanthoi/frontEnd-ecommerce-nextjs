import React, { useEffect, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { useDebounce } from '@/hooks/useDebounce';
import { dataProducts } from '@/data/admin/product/product';

const SearchBar = () => {
  const [searchVal, setSearchVal] = useState<string>('');
  const query = useDebounce(searchVal, 500);

  useEffect(() => {
    if (query) {
      const a = dataProducts.filter((product) => product.title.includes(query));
      console.log(a);
    }
  }, [query]);
  return (
    <div className="max-w-[40rem] h-10 flex items-center bg-slate-100  rounded-md px-4">
      <GoSearch style={{ color: 'black' }} size={20} />
      <input
        type="search"
        placeholder="Tìm sản phẩm"
        className="px-3 py-2 w-full bg-transparent text-slate-900"
        onChange={(e) => setSearchVal(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
