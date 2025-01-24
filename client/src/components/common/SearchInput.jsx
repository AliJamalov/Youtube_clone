import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center border border-gray-700 rounded-2xl relative">
        {/* Поле ввода */}
        <input
          className="p-2 rounded-tl-2xl rounded-bl-2xl focus:outline-none text-gray-800 w-[250px] md:w-[350px] lg:w-[650px]"
          type="search"
          placeholder="Search"
        />
        {/* Кнопка поиска */}
        <button className="bg-gray-700 absolute text-white h-full right-0 px-5 rounded-tr-2xl rounded-br-2xl hover:bg-gray-800">
          <FaSearch size={16} />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
