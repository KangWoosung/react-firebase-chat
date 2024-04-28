/*  2024-04-25 00:01:40



*/

"use client";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import LogIn from "./components/login/LogIn";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "./lib/firebase";
import { UseUserStoreType, UserType } from "./types/userType";
import { useUserStore } from "./contexts/UserContext";
import { useGunymedeUserFetch } from "./contexts/UserContextV2";
import { GunymedeChatProvider } from "./contexts/ChatContext";

const AppFrame = () => {
  // const [loggedIn, setLoggedIn] = useState(false);

  // zuStand version call
  // AppFrame 의 메인 스코프에서 호출해 주었다. 여기서 실행되는 코드는 전혀 없기 때문..
  // const { currentUser, isLoading, zustandFetchUserInfo } =
  //   useUserStore() as UseUserStoreType;
  // gunymede version call
  const {
    currentUser,
    gunymedeUserFetch,
    gunymedeUserDispatch,
    isLoading,
    isError,
    error,
  } = useGunymedeUserFetch();

  // const isLoading = false;
  // const currentUser = { userName: "John Doe" };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      console.log("User is logged in");
      if (user?.uid) {
        // zuStand version call
        // zustandFetchUserInfo && zustandFetchUserInfo(user.uid);
        // gunymede version call
        gunymedeUserFetch && gunymedeUserFetch(user.uid);
      } else {
        // zuStand version call -- resets current userInfo object
        // zustandFetchUserInfo && zustandFetchUserInfo(null);
        console.error("User is not logged in or has no UID");
        gunymedeUserFetch && gunymedeUserFetch(null);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  if (isLoading)
    return (
      <div className="p10 text-2xl rounded-md bg-[color:var(--chat-bubble-background-color)] ">
        Loading...
      </div>
    );

  return (
    <>
      {currentUser ? (
        <GunymedeChatProvider>
          <List />
          <Chat />
          <Detail />
        </GunymedeChatProvider>
      ) : (
        <LogIn />
      )}
    </>
  );
};

export default AppFrame;
