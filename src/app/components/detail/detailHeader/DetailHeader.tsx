/*   2024-04-24 22:44:55



*/

"use client";

import { UserType } from "@/app/types/userType";
import React from "react";

type DetailHeaderProp = {
  targetUser: UserType | null;
};

const DetailHeader = ({ targetUser }: DetailHeaderProp) => {
  return (
    <div className="flex flex-row justify-start items-center gap-4">
      <img
        src={targetUser?.avatar || "/avatar.png"}
        alt={`${targetUser?.userName}` + "'s avatar"}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <h3>{targetUser?.userName}</h3>
        <p className="text-xs font-extralight text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
        </p>
      </div>
    </div>
  );
};

export default DetailHeader;
