/*  2024-04-23 18:29:26


*/
"use client";
import React, { useCallback, useContext, useEffect } from "react";
import "./userInfo.css";
import { CgAddR } from "react-icons/cg";
import Image from "next/image";
import { MdOutlineVideoCameraBack } from "react-icons/md";
import { useFetchUserInfo } from "@/app/contexts/UserContext";

const UserInfo = () => {
  const { state, userDispatch, error, fetchUserInfo } = useFetchUserInfo();
  let userName;

  useEffect(() => {
    if (!state.currentUserId) return;

    const fetchActioner = async () => {
      try {
        await fetchUserInfo(state.currentUserId as string);
        userName = state.currentUser.userName;
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchActioner();
  }, [state]);

  return (
    <div className="userInfo flex justify-between items-center">
      <div className="user flex flex-row items-center gap-5">
        <img
          src="/avatar.png"
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2>{userName ? userName : ""}</h2>
      </div>
      <div className="icons flex gap-2">
        <MdOutlineVideoCameraBack className="w-5 h-5" />
        <CgAddR className="w-5 h-5" />
      </div>
    </div>
  );
};

export default UserInfo;
