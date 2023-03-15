import React from 'react';
import { GoSearch } from 'react-icons/go';

const SearchBar = () => {
  return (
    <div className="max-w-[40rem] w-[90%] flex items-center bg-slate-100  rounded-md px-4">
      <GoSearch style={{ color: 'black' }} size={20} />
      <input
        type="search"
        placeholder="Từ khóa"
        className="px-3 py-2 w-full bg-transparent text-slate-900"
      />
    </div>
  );
};

export default SearchBar;
