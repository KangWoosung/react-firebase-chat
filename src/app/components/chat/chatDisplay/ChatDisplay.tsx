/*  2024-04-24 02:58:47


*/

const initChats = [
  {
    name: "Jane Doe",
    lastMessage: "I miss you",
    own: true,
    time: "1hour ago",
  },
  {
    name: "John Doe",
    lastMessage: "what the..",
    own: true,
    time: "1hour ago",
  },
  {
    name: "전 혜진",
    lastMessage: `사장님..
    오늘도 수고하셨습니다.`,
    time: "1hour ago",
  },
  {
    name: "이 미화",
    lastMessage: `우성아..
    오늘도 고생했어`,
    time: "12min ago",
    unread: true,
  },
];

import React, { useState } from "react";

const ChatDisplay = () => {
  const [displayChats, setDisplayChats] = useState(initChats);

  return (
    <div className="middle flex flex-col gap-4  overflow-y-auto scroll">
      {displayChats.map((chat, index) => (
        <div className="message" key={index}>
          <div
            className={`messageHeader flex flex-row items-center gap-2 ${
              chat.own ? "justify-end" : ""
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

            <p
              className={`chat-body whitespace-pre-line p-4 text-sm font-extralight text-gray-100 rounded-md 
            ${chat.own ? "ownMessage" : "notOwn"}
            ${chat.unread ? "unreadMessage" : ""}
            `}
            >
              {chat.lastMessage}
            </p>
          </div>
          <div
            className={`messageInfo flex flex-row items-center gap-2 ${
              chat.own ? "justify-end" : ""
            }`}
          >
            <span className="text-sm font-extralight text-gray-400">
              {chat.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
