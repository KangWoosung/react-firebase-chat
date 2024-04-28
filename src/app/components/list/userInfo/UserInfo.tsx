/*  2024-04-23 18:29:26


*/
"use client";
import React, { useCallback, useContext, useEffect } from "react";
import "./userInfo.css";
import { CgAddR } from "react-icons/cg";
import Image from "next/image";
import { MdOutlineVideoCameraBack } from "react-icons/md";
import { UserContext, useUserStore } from "@/app/contexts/UserContext";
import { UseUserStoreType } from "@/app/types/userType";
import { useGunymedeUserFetch } from "@/app/contexts/UserContextV2";

const UserInfo = () => {
  // zuStand version call
  // const { currentUser } = useUserStore() as UseUserStoreType;
  // gunymede version call
  const { currentUser, isLoading, isError, error } = useGunymedeUserFetch();

  console.log(currentUser);

  return (
    <div className="userInfo flex justify-between items-center">
      <div className="user flex flex-row items-center gap-5">
        <img
          src={currentUser?.avatar || "/avatar.png"}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2>{currentUser?.userName ? currentUser.userName : ""}</h2>
      </div>
      <div className="icons flex gap-2">
        <MdOutlineVideoCameraBack className="w-5 h-5" />
        <CgAddR className="w-5 h-5" />
      </div>
    </div>
  );
};

export default UserInfo;
