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

import { createContext } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import "./index.css";
import ChatUserContextComponent from "./contexts/userContext";

export default function Home() {
  return (
    <div className="wrapper flex flex-col justify-center items-center h-dvh ">
      <h1 className="flex">React Firebase Chat</h1>
      <div className="container flex ">
        <main className="flex flex-row justify-center border-solid rounded-lg w-full text-white">
          <ChatUserContextComponent>
            <List />
            <Chat />
            <Detail />
          </ChatUserContextComponent>
        </main>
      </div>
    </div>
  );
}
