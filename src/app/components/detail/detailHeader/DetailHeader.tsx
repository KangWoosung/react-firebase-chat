/*   2024-04-24 22:44:55



*/

"use client";

import React from "react";

type DetailHeaderProp = {
  userName: string | undefined;
};

const DetailHeader = ({ userName }: DetailHeaderProp) => {
  return (
    <div className="flex flex-row justify-start items-center gap-4">
      <img
        src="/avatar.png"
        alt={`${userName}` + "'s avatar"}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <h2>{userName}</h2>
        <p className="text-xs font-extralight text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
        </p>
      </div>
    </div>
  );
};

export default DetailHeader;
