/*  2024-04-23 22:45:03


*/
"use client";
import { useGanymedeUserFetchHook } from "@/app/contexts/UserContextV2";
import { db } from "@/app/lib/firebase";
import {
  ChatType,
  ChatsAndUsersType,
  UserChatsType,
} from "@/app/types/chatTypes";
import { UserType } from "@/app/types/userType";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";

type ChatRoomProps = {
  changeChat: (chatId: string, user: UserType) => void;
  checkTargetIsBlocked: (currentUser: UserType, targetUser: UserType) => void;
  chat: UserChatsType;
  chats: ChatsAndUsersType[];
  chatId: string;
  targetUser: UserType;
  lastMessage: string;
};

const ChatRoom = ({
  changeChat,
  checkTargetIsBlocked,
  chat,
  chats,
  chatId,
  targetUser,
  lastMessage,
}: ChatRoomProps) => {
  const { currentUser } = useGanymedeUserFetchHook();

  // const handleChangeChat = async (chatId: string, targetUser: UserType) => {
  //   changeChat(chatId, targetUser);
  //   console.log("chatId, targetUser", chatId, targetUser);
  // };

  const handleSelectChat = async (chat: UserChatsType) => {
    // console.log(currentUser?.id, targetUser.id);
    if (currentUser === null || !currentUser.id || !targetUser.id) return;
    const userChats = chats.map((item: ChatsAndUsersType) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      console.log(currentUser.blocked.includes(targetUser.id));
      // reducer 에, blocked 처리를 담당하는 독립 펑션을 넣어주는 게 낫겠다.
      checkTargetIsBlocked(currentUser, targetUser);
      changeChat(chat.chatId, targetUser);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`chatItems border-b border-gray-500 py-4
        ${
          chat.isSeen
            ? ""
            : "unreadChat bg-[color:var(--undone-background-color)]"
        }
    `}
    >
      <div
        className={`chatItem flex flex-row items-center gap-5 p-2
        `}
        onClick={() => handleSelectChat(chat)}
      >
        <img
          src={targetUser.avatar || "/avatar.png"}
          alt={`${targetUser.userName}` + "'s avatar"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="chatItemInfo">
          <h3 className="font-semibold text-white">{targetUser.userName}</h3>
          <span className="text-sm font-extralight text-gray-300">
            {lastMessage}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
