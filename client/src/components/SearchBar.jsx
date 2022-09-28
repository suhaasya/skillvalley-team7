import React from "react";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";

export default function SearchBar({
  onChange,
  value,
  setValue,
  type,
  onKeyDown,
}) {
  return (
    <div
      className={`flex items-center border-solid border-2 border-light_gray p-2 w-60 ${
        type === "normal" && "sm:w-80"
      } rounded-md`}
    >
      <div className="text-gray">
        <RiSearchLine />
      </div>
      <input
        className="ml-2 w-1/2 sm:w-full"
        placeholder="Search..."
        onChange={(e) => onChange(e)}
        value={value}
        onKeyDown={onKeyDown}
      ></input>
      {value.length > 0 && (
        <button
          className="ml-auto p-1 hover:bg-light_gray rounded-xl cursor-pointer"
          onClick={() => setValue("")}
        >
          <RiCloseLine />
        </button>
      )}
    </div>
  );
}
SearchBar.defaultProps = {
  value: "",
  onChange: () => {},
  type: "normal",
  onKeyDown: () => {},
};
