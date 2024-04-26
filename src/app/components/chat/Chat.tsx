/*  2024-04-23 18:11:26


*/
"use client";
import React, { useContext, useState } from "react";
import "./chat.css";
import ChatInput from "./chatInput/ChatInput";
import ChatDisplay from "./chatDisplay/ChatDisplay";
import ChatHeader from "./chatHeader/ChatHeader";

const initChats: ChatType[] = [
  {
    name: "Jane Doe",
    lastMessage: "I miss you",
    own: true,
    time: "1hour ago",
    image: "https://picsum.photos/600/400",
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
    오늘도 수고하셨습니다. 안녕히 들어가시고 좋은 꿈 꾸세요.ㅎㅎ`,
    image: "https://picsum.photos/700/300",
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

export type ChatType = {
  name: string;
  lastMessage: string;
  own?: boolean;
  time: string;
  image?: string;
  unread?: boolean;
};

type ChatProps = {
  name: string;
};

const Chat = () => {
  const [displayChats, setDisplayChats] = useState<ChatType[]>(initChats);

  return (
    <div className="chat flex flex-col w-2/4 p-10 border-l border-r border-gray-500">
      <ChatHeader />
      <ChatDisplay displayChats={displayChats} />
      <ChatInput
        displayChats={displayChats}
        setDisplayChats={setDisplayChats}
      />
    </div>
  );
};

export default Chat;
