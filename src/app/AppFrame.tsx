/*  2024-04-25 00:01:40



*/

"use client";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import LogIn from "./components/login/LogIn";
import { ChatUserContext } from "./contexts/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

const AppFrame = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { user } = useContext(ChatUserContext);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in");
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return () => {
      unsub();
    };
  }, []);
  return (
    <>
      {loggedIn ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <LogIn />
      )}
    </>
  );
};

export default AppFrame;
