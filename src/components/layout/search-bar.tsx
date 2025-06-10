import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="text-center py-4">
      <div className="mx-auto flex items-center border border-blue-950 px-4 py-2 rounded-full w-[300px] sm:w-[300px]">
        <input
          className="flex-1 outline-none bg-inherit text-sm px-2"
          type="text"
          placeholder="Bạn có khỏe không ?"
        />
        <Image
          src="/image/icon/search_icon.png"
          alt="Search Icon"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

export default SearchBar;
