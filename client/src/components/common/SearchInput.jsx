import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center border border-black/5 rounded-2xl relative">
        {/* Поле ввода */}
        <input
          className="p-2 rounded-tl-2xl rounded-bl-2xl focus:outline-none text-gray-800 w-[250px] md:w-[350px] lg:w-[650px]"
          type="text"
          placeholder="Search"
        />
        {/* Кнопка поиска */}
        <button className="bg-black/5 absolute text-white h-full right-0 px-5 rounded-tr-2xl rounded-br-2xl hover:bg-black/2">
          <CiSearch color="black" size={25} />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
