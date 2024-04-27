/*  2024-04-23 22:45:03


*/
"use client";
import React, { useContext } from "react";

type ChatRoomProps = {
  name: string;
  lastMessage: string;
  unread?: boolean;
};

const ChatRoom = ({ name, lastMessage }: ChatRoomProps) => {
  const unread = false;

  return (
    <div className="chatItems border-b border-gray-500 py-4">
      <div
        className={`chatItem flex flex-row items-center gap-5 p-2
        ${unread ? "unreadChat bg-[color:var(--undone-background-color)]" : ""}
        `}
        // onClick={(e) => setUserName(name)}
      >
        <img
          src="/avatar.png"
          alt={`${name}` + "'s avatar"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="chatItemInfo">
          <h3 className="font-semibold text-white">{name}</h3>
          <span className="text-sm font-extralight text-gray-300">
            {lastMessage}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
