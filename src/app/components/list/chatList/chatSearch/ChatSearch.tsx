/*  2024-04-23 22:38:51


*/

import React from "react";
import { CiSearch } from "react-icons/ci";
import { GoDash, GoPlus } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";

type ChatSearchProps = {
  searchStr: string;
  setSearchStr: (searchString: string) => void;
  addMode: boolean;
  handleSearchAdd: () => void;
};

const ChatSearch = ({
  searchStr,
  setSearchStr,
  addMode,
  handleSearchAdd,
}: ChatSearchProps) => {
  return (
    <>
      <div className="search flex flex-row items-center justify-between gap-2">
        <div className="searchBar relative flex flex-row gap-2 p-2 rounded-md bg-[color:var(--chat-bubble-background-color)]">
          <CiSearch className="w-7 h-7" />
          <input
            type="text"
            placeholder="search"
            className="w-5/6 bg-transparent"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
          />
          <RxCross1
            className="absolute bottom-3 right-3"
            onClick={(e) => setSearchStr("")}
          />
        </div>
        <div
          className="searchAddBtn p-2 rounded-2xl 
          bg-[color:var(--chat-bubble-background-color)]
          hover:bg-[color:var(--chat-bubble-deep-background-color)]
          "
          onClick={handleSearchAdd}
        >
          {addMode ? (
            <GoDash className="w-7 h-7 text-white border-0 outline-0" />
          ) : (
            <GoPlus className="w-7 h-7 text-white border-0 outline-0" />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatSearch;
