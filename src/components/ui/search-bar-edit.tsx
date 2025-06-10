import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="w-fit text-center py-1">
      <div className="mx-auto flex items-center border border-blue-950 px-4 py-2 px-2 rounded w-[300px] sm:w-[200px]">
        <Image
          src="/image/icon/search_icon.png"
          alt="Search Icon"
          width={20}
          height={20}
        />
        <input
          className="flex-1 outline-none bg-inherit text-sm px-2"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
