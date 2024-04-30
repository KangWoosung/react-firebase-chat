/*   2024-04-25 20:56:40



*/

import { useGanymedeUserFetch } from "@/app/contexts/UserContextV2";
import { db } from "@/app/lib/firebase";
import { UserType } from "@/app/types/userType";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";

const AddUser = () => {
  const [user, setUser] = useState<UserType | null>(null);

  const { currentUser } = useGanymedeUserFetch();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement; // 명시적 캐스팅
    const formData = new FormData(formElement);
    const userName = formData.get("userName");
    console.log(userName);

    try {
      const usersRef = collection(db, "users");
      // Create a query against the collection.
      const q = query(usersRef, where("userName", "==", userName));

      const querySnapShot = await getDocs(q);
      console.log(querySnapShot.docs[0].data());

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data() as UserType);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // user 가 확보되었으므로, userchats 에 user 를 추가해주면 된다.
  const handleAddChat = async () => {
    console.log("Add Chat");
    if (!user || !user.id || !currentUser || !currentUser.id) {
      return;
    }
    // chats 테이블 : 모든 대화 문자 데이터
    const chatRef = collection(db, "chats");
    // userchats 테이블 : currentUser 와 연결이 생성된 대화 상대방
    const userChatsRef = collection(db, "userchats");

    try {
      // chats 는 채팅 대화 테이블이고, chats.id 를 키로 삼는다.
      // newChatRef.id 확보를 위해서, doc 의 생성부터 해줘야 한다.
      const newChatRef = await doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      console.log(newChatRef.id);

      // userchats 테이블 : currentUser 와 연결이 생성된 대화 상대방
      // 나와, 상대방 모두가 rows 로 insert 되어야 한다.
      // 먼저 상대방을 대화방에 입장시킨다.
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          receiverId: currentUser.id,
          lastMessage: "",
          updatedAt: Date.now(),
          isSeen: false,
        }),
      });
      // 다음, 나도 대화방에 입장한다.
      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          receiverId: user.id,
          lastMessage: "",
          updatedAt: Date.now(),
          isSeen: false,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

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
        onSubmit={handleSearch}
        className="flex flex-row justify-between items-center gap-5
        "
      >
        <input
          type="text"
          name="userName"
          placeholder="User name"
          className="p-4 rounded-md text-gray-200 border-0 text-black
            bg-white   "
        />
        <button
          type="submit"
          className="p-4 rounded-md border-0 cursor-pointer
            bg-[color:var(--positive-background-color)]           
          "
        >
          Search
        </button>
      </form>
      {user && (
        <div
          className="user mt-10 flex justify-between items-center gap-5
      "
        >
          <img
            src={user.avatar || "/avatar.png"}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          <h3>{user.userName}</h3>
          <button
            onClick={handleAddChat}
            className="p-2 rounded-md border-0 cursor-pointer
            bg-[color:var(--positive-background-color)]   "
          >
            Add User
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
