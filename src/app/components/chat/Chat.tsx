/*  2024-04-23 18:11:26


*/
"use client";
import React, { useContext, useEffect, useState } from "react";
import "./chat.css";
import ChatInput from "./chatInput/ChatInput";
import ChatDisplay from "./chatDisplay/ChatDisplay";
import ChatHeader from "./chatHeader/ChatHeader";
import { ChatType } from "@/app/types/chatTypes";
import { useGanymedeUserFetch } from "@/app/contexts/UserContextV2";
import { useGanymedeChatContextHook } from "@/app/contexts/ChatContext";
import { UserType } from "@/app/types/userType";

const initChats: ChatType[] = [];

type ChatProps = {
  name: string;
};

const Chat = () => {
  const {
    chatId,
    targetUser,
    currentUser: currentChatUser,
  } = useGanymedeChatContextHook();
  console.log(chatId, targetUser, currentChatUser);
  const [displayChats, setDisplayChats] = useState<ChatType[]>(initChats);

  return (
    <div className="chat flex flex-col w-2/4 p-10 border-l border-r border-gray-500">
      <ChatHeader targetUser={targetUser} />
      <ChatDisplay chatId={chatId as string} />
      <ChatInput
        chatId={chatId as string}
        displayChats={displayChats}
        setDisplayChats={setDisplayChats}
      />
    </div>
  );
};

export default Chat;
