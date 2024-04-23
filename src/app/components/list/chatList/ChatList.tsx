/*  2024-04-23 18:31:04

2024-04-23 23:44:11
Couldn't find the way to auto-fix inner Dom's height. 

*/
"use client";

import React, { useEffect, useMemo, useState } from "react";
import "./chatList.css";
import ChatSearch from "./chatSearch/ChatSearch";
import ChatRoom from "./chatRoom/ChatRoom";

const usersInit = [
  {
    name: "Jane Doe",
    lastMessage: "I miss you",
  },
  {
    name: "John Doe",
    lastMessage: "what the..",
  },
  {
    name: "전 혜진",
    lastMessage: "사장님..",
  },
  {
    name: "이 미화",
    lastMessage: "우성아..",
    unread: true,
  },
];
type UsersType = {
  name: string;
  lastMessage: string;
  unread?: boolean;
};

const ChatList = () => {
  const [usersList, setUsersList] = useState<UsersType[]>(usersInit);
  const [searchStr, setSearchStr] = useState<string>("");
  const [addMode, setAddMode] = useState<boolean>(false);

  useEffect(() => {
    const filteredUsers = usersInit.filter((user) =>
      user.name.toLowerCase().includes(searchStr.toLowerCase())
    );

    setUsersList(filteredUsers);
  }, [searchStr]);

  const handleSearchAdd = () => {
    setAddMode((prev) => !prev);
  };

  return (
    <div className="chatList mt-10 h-full">
      <ChatSearch
        setSearchStr={setSearchStr}
        addMode={addMode}
        handleSearchAdd={handleSearchAdd}
      />

      {/* This "max-h-96" doesn't look good. I need to Find a way to fix the height of the inner Dom. */}
      <div
        className="chatRooms mt-10 max-h-96 overflow-y-auto scroll"
        style={{}}
      >
        {usersList.map((user, index) => {
          return (
            <ChatRoom
              key={index}
              name={user.name}
              lastMessage={user.lastMessage}
              unread={user.unread}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
