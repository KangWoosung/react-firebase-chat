/*  2024-04-24 23:02:49



*/

import React, { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

const DetailFooter = () => {
  // const { user } = useContext(ChatUserContext);

  // 또는
  auth.signOut();
  const logOutHandle = async () => {
    try {
      await signOut(auth);
      // setUser(undefined);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="detailFooter mt-auto flex flex-col justify-center items-center gap-4">
      <button
        className="w-[100%] rounded-md py-4 px-5 
      bg-[color:var(--warning-background-color)]
      hover:bg-[color:var(--warning-deep-background-color)]
      
      "
      >
        Block User
      </button>
      <button
        onClick={logOutHandle}
        className="w-[100%] rounded-md py-4 px-5 
      bg-[color:var(--positive-background-color)]
      hover:bg-[color:var(--positive-deep-background-color)]"
      >
        Sign out
      </button>
    </div>
  );
};

export default DetailFooter;
