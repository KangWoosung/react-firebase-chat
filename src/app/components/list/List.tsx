/*  2024-04-23 18:10:21



*/
"use client";
import React, { useContext } from "react";
import "./list.css";
import UserInfo from "./userInfo/UserInfo";
import ChatList from "./chatList/ChatList";

const List = () => {
  return (
    <div className="list flex flex-col w-1/4 p-5">
      <UserInfo />
      <ChatList />
    </div>
  );
};

export default List;
