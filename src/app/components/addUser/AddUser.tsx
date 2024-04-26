/*   2024-04-25 20:56:40



*/

import React from "react";

const AddUser = () => {
  return (
    <div
      className="addUser p-10 rounded-md  gap-4
            max-w-[40%] max-h-max
            bg-[color:var(--chat-bubble-deep-background-color)] 
            absolute
            left-0 top-0 bottom-0 right-0 m-auto
    "
    >
      AddUser
      <form
        action=""
        className="flex flex-row justify-between items-center gap-5
        "
      >
        <input
          type="text"
          placeholder="User name"
          className="p-4 rounded-md text-gray-200 border-0
            bg-white   "
        />
        <button
          className="p-4 rounded-md border-0 cursor-pointer
            bg-[color:var(--positive-background-color)]           
          "
        >
          Search
        </button>
      </form>
      <div
        className="user mt-10 flex justify-between items-center gap-5
      "
      >
        <img
          src="/avatar.png"
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
        <h3>UserName</h3>
        <button
          className="p-2 rounded-md border-0 cursor-pointer
            bg-[color:var(--positive-background-color)]   "
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default AddUser;
