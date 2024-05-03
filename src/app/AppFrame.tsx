/*  2024-04-25 00:01:40



*/

"use client";
import React, { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import LogIn from "./components/login/LogIn";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useGanymedeUserFetchHook } from "./contexts/UserContextV2";
import {
  GanymedeChatProvider,
  useGanymedeChatContextHook,
} from "./contexts/ChatContext";

const AppFrame = () => {
  // const [loggedIn, setLoggedIn] = useState(false);

  // zuStand version call
  // AppFrame 의 메인 스코프에서 호출해 주었다. 여기서 실행되는 코드는 전혀 없기 때문..
  // const { currentUser, isLoading, zustandFetchUserInfo } =
  //   useUserStore() as UseUserStoreType;
  // Ganymede version call
  const { currentUser, ganymedeUserFetch, isLoading, isError, error } =
    useGanymedeUserFetchHook();

  const { chatId } = useGanymedeChatContextHook();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      console.log("User is logged in");
      if (user?.uid) {
        // zuStand version call
        // zustandFetchUserInfo && zustandFetchUserInfo(user.uid);
        // Ganymede version call
        ganymedeUserFetch && ganymedeUserFetch(user.uid);
      } else {
        // 이 코드가 로그아웃 처리-currentuser.reset() 역할을 맡는다.
        // zuStand version call -- resets current userInfo object
        // zustandFetchUserInfo && zustandFetchUserInfo(null);
        // console.error("User is not logged in or has no UID");
        ganymedeUserFetch && ganymedeUserFetch(null);
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
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <LogIn />
      )}
    </>
  );
};

export default AppFrame;
