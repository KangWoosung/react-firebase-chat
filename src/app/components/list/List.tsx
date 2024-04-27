/*  2024-04-23 18:10:21



*/
"use client";
import React, { useContext } from "react";
import "./list.css";
import UserInfo from "./userInfo/UserInfo";
import ChatList from "./chatList/ChatList";
import { ChatUserContext } from "@/app/contexts/userContext_bck";

const List = () => {
  return (
    <div className="list flex flex-col w-1/4 h-screen p-5">
      <UserInfo />
      <ChatList />
    </div>
  );
};

export default List;
