/*  2024-04-24 03:02:07



*/

import {
  useGanymedeChatContext,
  useGanymedeChatContextHook,
} from "@/app/contexts/ChatContext";
import { UserType } from "@/app/types/userType";
import React, { useContext, useEffect, useState } from "react";
import { BsTelephoneForward } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";

type ChatHeaderProps = {
  targetUser: UserType | null;
};

const ChatHeader = ({ targetUser }: ChatHeaderProps) => {
  console.log("ChatHeader", targetUser);

  return (
    <div className="top w-4/4">
      <div className="user flex flex-row justify-between items-center gap-4 pb-4 border-1 border-b border-gray-500">
        <div className="flex flex-row items-center gap-2">
          <img
            src={targetUser?.avatar || "/avatar.png"}
            alt={`${targetUser?.userName}` + "'s avatar"}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3>{targetUser?.userName}</h3>
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
