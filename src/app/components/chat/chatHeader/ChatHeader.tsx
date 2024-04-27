/*  2024-04-24 03:02:07



*/

import React, { useContext } from "react";
import { BsTelephoneForward } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";

const ChatHeader = () => {
  const userName = "John Doe";

  return (
    <div className="top w-4/4">
      <div className="user flex flex-row justify-between items-center gap-4 pb-4 border-1 border-b border-gray-500">
        <div className="flex flex-row items-center gap-2">
          <img
            src="/avatar.png"
            alt={`${userName}` + "'s avatar"}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3>{userName}</h3>
            <span className="text-sm font-extralight text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <BsTelephoneForward className="w-5 h-5" />
          <IoIosInformationCircleOutline className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
