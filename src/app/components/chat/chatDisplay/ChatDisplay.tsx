/*  2024-04-24 02:58:47


*/

import React, { useEffect, useState } from "react";
import { ChatType } from "../Chat";

// ChatDisplay가 받을 Props 타입 정의
type ChatDisplayProps = {
  displayChats: ChatType[]; // ChatType의 배열
};

const ChatDisplay = ({ displayChats }: ChatDisplayProps) => {
  const chatTailRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatTailRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayChats]);

  return (
    <div className="middle flex flex-col gap-4  overflow-y-auto scroll">
      {displayChats.map((chat, index) => (
        <div className="message" key={index}>
          <div
            className={`messageHeader flex flex-row items-center gap-2 ${
              chat.own ? "justify-end mr-4" : ""
            }`}
          >
            {!chat.own ? (
              <img
                src="/avatar.png"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              ""
            )}

            <div className="flex flex-col max-w-[70%]  gap-2 ">
              {chat.image ? (
                <img
                  src={chat.image}
                  alt=""
                  className="max-w-[100%] rounded-md"
                />
              ) : (
                ""
              )}
              <p
                className={`chat-body whitespace-pre-line p-4 text-sm font-extralight text-gray-100 rounded-md 
              bg-[color:var(--chat-bubble-background-color)]
            ${chat.own ? "ownMessage" : "notOwn"}
            ${chat.unread ? "unreadMessage" : ""}
            `}
              >
                {chat.lastMessage}
              </p>
            </div>
          </div>
          <div
            className={`messageInfo flex flex-row items-center gap-2 ${
              chat.own ? "justify-end mr-4" : "ml-12"
            }`}
          >
            <span className="text-sm font-extralight text-gray-400">
              {chat.time}
            </span>
          </div>
        </div>
      ))}
      <div ref={chatTailRef}></div>
    </div>
  );
};

export default ChatDisplay;
