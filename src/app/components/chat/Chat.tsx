/*  2024-04-23 18:11:26


*/
"use client";
import React, { useContext } from "react";
import "./chat.css";
import ChatInput from "./chatInput/ChatInput";
import ChatDisplay from "./chatDisplay/ChatDisplay";
import ChatHeader from "./chatHeader/ChatHeader";

type ChatProps = {
  name: string;
};

const Chat = () => {
  return (
    <div className="chat flex flex-col w-2/4 p-10 border-l border-r border-gray-500">
      <ChatHeader />
      <ChatDisplay />
      <ChatInput />
    </div>
  );
};

export default Chat;
