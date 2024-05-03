/*  2024-04-24 23:02:49



*/

import React, { useContext, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import { useGanymedeChatContextHook } from "@/app/contexts/ChatContext";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useGanymedeUserFetchHook } from "@/app/contexts/UserContextV2";
import { UserType } from "@/app/types/userType";

const DetailFooter = () => {
  // const [userBlockedState, setUserBlockedState] = useState<boolean>(false);
  const { currentUser } = useGanymedeUserFetchHook();
  const {
    currentUser: chatCurrentUser,
    targetUser,
    isRecieverBlocked,
    changeBlock,
    checkTargetIsBlocked,
  } = useGanymedeChatContextHook();
  console.log(chatCurrentUser?.blocked);

  useEffect(() => {
    console.log(isRecieverBlocked);
    // checkTargetIsBlocked(chatCurrentUser as UserType, targetUser as UserType);
    console.log(isRecieverBlocked);
  }, [chatCurrentUser?.id, targetUser?.id]);

  const handleBlock = async () => {
    console.log(chatCurrentUser?.blocked);
    if (!currentUser?.id || !targetUser?.id) return;

    // let isAlreadyBlocked = currentUser.blocked.includes(targetUser.id);
    console.log(isRecieverBlocked);

    // // 토글: 차단 상태를 변경합니다.
    // setUserBlockedState(!isAlreadyBlocked);

    // 차단 상태에 따라 `blocked` 배열을 업데이트합니다.
    const blockedUpdate = isRecieverBlocked
      ? arrayRemove(targetUser.id)
      : arrayUnion(targetUser.id);

    try {
      await updateDoc(doc(db, "users", currentUser.id), {
        blocked: blockedUpdate,
      });
      // Update Global State 해줘야 하는 게 맞다.
      // 그래야 currentUser.blocked 의 조건식에 현재 blocked 어레이가 반영될 수 있다.
      console.log(chatCurrentUser?.blocked);
      changeBlock();
      console.log(chatCurrentUser?.blocked);
    } catch (err) {
      console.error(err);
    }

    // 차단 상태를 설정합니다.
    // changeBlock();
  };

  // 또는
  // auth.signOut();
  const logOutHandle = async () => {
    console.log("logged out");
    try {
      await auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="detailFooter mt-auto flex flex-col justify-center items-center gap-4">
      <button
        className={`w-[100%] rounded-md py-4 px-5 
      bg-[color:var(--warning-background-color)]
      hover:bg-[color:var(--warning-deep-background-color)]
      ${isRecieverBlocked && "opacity-25"}
      `}
        onClick={handleBlock}
      >
        {!isRecieverBlocked ? "Block this user" : "User is blocked"}
      </button>
      <button
        onClick={logOutHandle}
        className="w-[100%] rounded-md py-4 px-5 
      bg-[color:var(--positive-background-color)]
      hover:bg-[color:var(--positive-deep-background-color)]
      disabled:opacity-25
      "
      >
        Sign out
      </button>
    </div>
  );
};

export default DetailFooter;
