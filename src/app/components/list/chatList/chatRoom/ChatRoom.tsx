/*  2024-04-23 22:45:03


*/
"use client";
import { ChatUserContext } from "@/app/contexts/userContext";
import React, { useContext } from "react";

type ChatRoomProps = {
  name: string;
  lastMessage: string;
};

const ChatRoom = ({ name, lastMessage }: ChatRoomProps) => {
  const chatUserContext = useContext(ChatUserContext);

  if (!chatUserContext)
    throw new Error(
      "You probably forgot to put <ChatUserContextComponent> around your component tree"
    );

  const { userName, setUserName } = chatUserContext;

  return (
    <div className="chatItems border-b border-gray-500 py-4">
      <div
        className="chatItem flex flex-row items-center gap-5 p-2"
        onClick={(e) => setUserName(name)}
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
