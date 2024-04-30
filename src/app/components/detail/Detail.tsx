/*  2024-04-23 18:09:21


*/

"use client";
import "./detail.css";
import DetailHeader from "./detailHeader/DetailHeader";
import DetailOptions from "./detailOptions/DetailOptions";
import DetailFooter from "./detailFooter/DetailFooter";
import { useGanymedeChatContextHook } from "@/app/contexts/ChatContext";

const Detail = () => {
  const {
    chatId,
    targetUser,
    currentUser: currentChatUser,
  } = useGanymedeChatContextHook();
  // console.log(chatId, targetUser, currentChatUser);

  return (
    <div className="detail flex flex-col w-1/4 p-5">
      <DetailHeader targetUser={targetUser} />
      <DetailOptions />
      <DetailFooter />
    </div>
  );
};

export default Detail;
