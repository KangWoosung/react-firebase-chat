/*   2024-04-24 22:46:16


*/

"use client";
import React from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const DetailOptions = () => {
  return (
    <div className="detailOptions mt-10">
      <div className="option p-2">
        <div className="title flex flex-row justify-between items-center gap-4">
          <span>Chat Settings</span>
          <IoIosArrowDropup />
        </div>
      </div>
      <div className="option p-2">
        <div className="title flex flex-row justify-between items-center gap-4">
          <span>Privacy & help</span>
          <IoIosArrowDropup />
        </div>
      </div>
      <div className="option p-2">
        <div className="title flex flex-row justify-between items-center gap-4">
          <span>Shared Photos</span>
          <IoIosArrowDropdown />
        </div>
        <div className="photos">
          <img
            src="https://picsum.photos/600/300"
            alt=""
            className="max-w-[100%] rounded-md"
          />
          <span className="text-sm font-extralight text-gray-300">
            photo_2024_3.png
          </span>
        </div>
      </div>
      <div className="option p-2">
        <div className="title flex flex-row justify-between items-center gap-4">
          <span>Chat Settings</span>
          <IoIosArrowDropup />
        </div>
      </div>
    </div>
  );
};

export default DetailOptions;
