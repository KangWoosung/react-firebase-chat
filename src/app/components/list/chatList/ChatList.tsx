/*  2024-04-23 18:31:04

2024-04-23 23:44:11

**onSnapshot**( 문서핸들, 콜백함수 )  
  문서핸들을 원격에서 리스닝하고, 변화가 감지되면 콜백함수가 실행된다.
  따라서, 실질적인 Read 구문은 아래 getDoc 인 것이다.
  await getDoc(doc(db, "users", items.receiverId));

// 코드의 핵심.. 
onSnapshot(
  doc(db, "userchats", currentUser?.id),
  async (res) => {
    const data = res.data();
    const promises = data.chats.map(async (items, i) => {
      const userDocSnap = await getDoc(doc(db, "users", items.receiverId));
      const user = userDocSnap.data();
      return { ...items, user };
    });
    const chatData = await Promise.all(promises);
    setChat(chatData);
  }
);
*/
"use client";

import React, { useEffect, useMemo, useState } from "react";
import "./chatList.css";
import ChatSearch from "./chatSearch/ChatSearch";
import ChatRoom from "./chatRoom/ChatRoom";
import AddUser from "../../addUser/AddUser";
import { UserType } from "@/app/types/userType";
import { useGanymedeUserFetch } from "@/app/contexts/UserContextV2";
import { DocumentData, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import {
  ChatType,
  ChatsAndUsersType,
  UserChatsType,
} from "@/app/types/chatTypes";
import { useGanymedeChatContextHook } from "@/app/contexts/ChatContext";

// const usersInit = [
//   {
//     name: "Jane Doe",
//     lastMessage: "I miss you",
//   },
//   {
//     name: "John Doe",
//     lastMessage: "what the..",
//   },
//   {
//     name: "전 혜진",
//     lastMessage: "사장님..",
//   },
//   {
//     name: "이 미화",
//     lastMessage: "우성아..",
//     unread: true,
//   },
// ];
// type UsersType = {
//   name: string;
//   lastMessage: string;
//   unread?: boolean;
// };

const chatsInit: ChatType[] = [];

const ChatList = () => {
  // const [usersList, setUsersList] = useState<ChatType[]>(chatsInit);
  const [searchStr, setSearchStr] = useState<string>("");

  const [chats, setChats] = useState<ChatsAndUsersType[]>([]);
  const [addMode, setAddMode] = useState<boolean>(false);

  const { currentUser, isLoading, isError, error } = useGanymedeUserFetch();
  const { changeChat } = useGanymedeChatContextHook();
  // setCurrentUser(currentUser as UserType);

  /* promise.all 도 있어서 좀 어려워 보인다.
    그러나 핵심은 아래와 같고, 
    onSnapshot(
      doc(db, "userchats", currentUser?.id),
      async (res) => {
        await getDoc(doc(db, "users", items.receiverId));
    })
    이렇게 축약해서 보면 이해가 쉬워진다.
  */
  useEffect(() => {
    console.log(currentUser);
    if (!currentUser?.id) return;
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser?.id),
      async (res) => {
        const data = res.data();
        if (!data) {
          console.error("No data found in userchats document");
          setChats([]); // 기본값 제공
          return;
        }
        //  현재 유저의 모든 userchats 를 받아온다. userchats 에는 대화 상대방 정보가 없으므로, 상대방 정보는 users 에서 다시 가져와야 한다.
        const items = data.chats;

        //  모든 대화상대방 들에 해당하는 users 테이블에 데이터를 요청하는 promise.all
        const promises = items.map(async (items: UserChatsType, i: number) => {
          const userDocRef = doc(db, "users", items.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();
          return { ...items, user };
        });

        const chatData = await Promise.all(promises);
        console.log(chatData);

        const sortedChats = chatData.sort((a, b) => b.updatedAt - a.updatedAt);
        setChats(sortedChats);
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  // console.log(chats);

  const handleSearchAdd = () => {
    setAddMode((prev) => !prev);
  };

  return (
    <div className="chatList mt-10">
      <ChatSearch
        searchStr={searchStr}
        setSearchStr={setSearchStr}
        addMode={addMode}
        handleSearchAdd={handleSearchAdd}
      />

      {/* This "max-h-96" doesn't look good. I need to Find a way to fix the height of the inner Dom. */}
      <div
        className="chatRooms mt-10 max-h-96 overflow-y-auto scroll"
        style={{}}
      >
        {chats.map((chat, i) => {
          return (
            <ChatRoom
              key={i}
              lastMessage={chat.lastMessage}
              changeChat={changeChat}
              targetUser={chat.user}
              chatId={chat.chatId}
              chat={chat}
              chats={chats}
            />
          );
        })}
      </div>
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
