/*  2024-04-23 17:03:16

==Database Structure
users [icon: user] {
    id string pk
    userName string
    email string
    avatar string
    blocked string[]
}

chats [icon: chat] {
    id string pk
    createdAt date
    messages {
      chatId: string,
      senderId: string,
      text: string,
      image: string,
      createdAt: date
    }[]
}

userChats {
    id string pk
    chats {
      chatId: string,
      receiverId: string,
      lastMessage: string,
      updatedAt: date,
      isSeen: boolean
    }[]
}

users.id - userChats.id
userChats > chats


*/
"use client";
import { useState } from "react";
import AppFrame from "./AppFrame";
import "./index.css";
// import Notification from "./util/notification";
import Notification from "./util/Notification";
import { UserContextProvider } from "./contexts/UserContext";
import { GanymedeUserProvider } from "./contexts/UserContextV2";
import { GanymedeChatProvider } from "./contexts/ChatContext";

export default function Home() {
  return (
    <div className="wrapper flex flex-col justify-center items-center h-svh ">
      <h1 className="flex bg-white text-slate-800 py-4 px-10 my-2">
        React Firebase Chat
      </h1>
      <div className="container flex ">
        <main className="flex flex-row justify-center border-solid rounded-lg w-full text-white">
          <GanymedeUserProvider>
            <GanymedeChatProvider>
              <AppFrame />
            </GanymedeChatProvider>
          </GanymedeUserProvider>
        </main>
      </div>
      <Notification />
    </div>
  );
}
