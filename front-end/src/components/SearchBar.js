// should work for both seatrch bar in home and community
import React from "react";
import { BsSearchHeart } from "react-icons/bs";

const SearchBar = ({ searchInput, setSearchInput, handleSearch, onChange }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    } else if (setSearchInput) {
      setSearchInput(e.target.value);
    }
  };

  return (
    <div className="flex flex-row justify-center w-[85%]">
      <input
        className="h-10 rounded-md px-3 py-2 grow-0 w-[90%] bg-lavender_blush-900 text-ebony font-bold placeholder-rose-600 border-none rounded-r-none"
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={searchInput || ""}
      />
      <button
        onClick={handleSearch}
        className="h-10 rounded-md bg-ebony-700 text-rose-700 hover:text-ebony-700 hover:bg-rose-700 font-bold px-2 w-[15%] md:w-[10%] lg:w-[8%] flex flex-col justify-center items-center rounded-l-none"
      >
        <BsSearchHeart size={24} />
      </button>
    </div>
  );
};

export default SearchBar;
