/*  2024-04-25 00:01:40



*/

"use client";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import LogIn from "./components/login/LogIn";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { UserType } from "./types/userType";

const AppFrame = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<UserType>();

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
