/*  2024-04-24 02:58:47


*/

import React, { useEffect, useState } from "react";
import { ChatType, MessageType } from "@/app/types/chatTypes";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useGanymedeUserFetchHook } from "@/app/contexts/UserContextV2";
import { UserType } from "@/app/types/userType";
import { useGanymedeChatContextHook } from "@/app/contexts/ChatContext";

// ChatDisplay가 받을 Props 타입 정의
type ChatDisplayProps = {
  chatId: string; // ChatType의 배열
};

const ChatDisplay = ({ chatId }: ChatDisplayProps) => {
  const chatTailRef = React.useRef<HTMLDivElement>(null);
  const [chatData, setChatData] = useState<ChatType | null>(null);

  const { currentUser } = useGanymedeUserFetchHook();
  const { targetUser } = useGanymedeChatContextHook();

  console.log(chatId);
  useEffect(() => {
    chatTailRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      console.log("Current data: ", res.data());
      setChatData(res.data() as ChatType);
    });

    return () => {
      unSub();
    };
  }, [targetUser]);

  console.log(chatData);

  return (
    <div className="middle flex flex-col gap-4  overflow-y-auto scroll">
      {chatData &&
        chatData?.messages?.map((message: MessageType, index: number) => (
          <div className="message" key={index}>
            <div
              className={`messageHeader flex flex-row items-center gap-2 ${
                message.senderId === (currentUser as UserType).id
                  ? "justify-end mr-4"
                  : ""
              }`}
            >
              {!(message.senderId === (currentUser as UserType).id) ? (
                <img
                  src={(targetUser as UserType).avatar || "/avatar.png"}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                ""
              )}

              <div className="flex flex-col max-w-[70%]  gap-2 ">
                {message.image ? (
                  <img
                    src={message.image}
                    alt=""
                    className="max-w-[100%] rounded-md"
                  />
                ) : (
                  ""
                )}
                <p
                  className={`chat-body whitespace-pre-line p-4 text-sm font-extralight text-gray-100 rounded-md 
              bg-[color:var(--chat-bubble-background-color)]
            ${
              message.senderId === (currentUser as UserType).id
                ? "ownMessage"
                : "notOwn"
            }
            `}
                >
                  {message.text}
                </p>
              </div>
            </div>
            <div
              className={`messageInfo flex flex-row items-center gap-2 ${
                message.senderId === (currentUser as UserType).id
                  ? "justify-end mr-4"
                  : "ml-12"
              }`}
            >
              <span className="text-sm font-extralight text-gray-400">
                {/* {message.createdAt.toISOString()} */}
              </span>
            </div>
          </div>
        ))}
      <div ref={chatTailRef}></div>
    </div>
  );
};

export default ChatDisplay;
