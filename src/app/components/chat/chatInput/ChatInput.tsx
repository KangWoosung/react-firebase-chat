/*  2024-04-24 02:24:27


*/

import EmojiPicker from "emoji-picker-react";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { IoIosImages, IoMdMic } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { ChatType, MessageType } from "@/app/types/chatTypes";
import { useGanymedeUserFetchHook } from "@/app/contexts/UserContextV2";
import { UserType } from "@/app/types/userType";
import { useGanymedeChatContextHook } from "@/app/contexts/ChatContext";
import upload from "@/app/lib/upload";

// 일반 함수 타입 선언
type EmojiClickEvent = {
  emoji: string;
};

type UploadImgType = {
  file: File;
  url: string;
};

// ChatInput의 Props 타입 정의
type ChatInputProps = {
  chatId: string;
  displayChats: ChatType[]; // ChatType의 배열
  setDisplayChats: (chats: ChatType[]) => void; // setState 함수 타입
};

const ChatInput: React.FC<ChatInputProps> = ({
  chatId,
  displayChats,
  setDisplayChats,
}) => {
  const [inputText, setInputText] = useState<string>("");
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [uploadImg, setUploadImg] = useState<UploadImgType | null>(null);
  const uploadRef = useRef(null);
  const { currentUser } = useGanymedeUserFetchHook();
  const { targetUser } = useGanymedeChatContextHook();

  const handleEmoji = (e: EmojiClickEvent) => {
    console.log("Emoji clicked", e);
    setInputText((prev) => prev + e.emoji);
    setEmojiOpen(false);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let imgUrl;
    if (e.target.files && e.target.files[0]) {
      setUploadImg({
        file: e.target.files[0],
        url: "",
      });
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Upload Image");
    if (e.target.files && e.target.files[0]) {
      const uploadFile = {
        file: e.target.files[0],
        url: "",
      };
      setUploadImg(uploadFile);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageUrl = event.target?.result as string; // 파일의 데이터 URL
        console.log(imageUrl);

        // 새로운 채팅 객체 생성
        const newChat = {
          name: "New User",
          lastMessage: "Here is a new image",
          own: true,
          time: "Just now",
          image: imageUrl, // 업로드된 이미지의 URL
        };
      };
    }
  };

  const handleSendChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(uploadRef.current);
    if (inputText === "") return;
    if (!currentUser?.id) return;

    let imageUrl = null;

    try {
      // 0. Check if upload image exists
      if (uploadImg?.file) {
        imageUrl = await upload(uploadImg.file);
      }

      // 1. chats 테이블: 대화내용 테이블 update ...
      // 기존재하는 data.array 에 새로운 array 를 추가한다.
      // `imageUrl`이 존재할 때만 `image` 필드를 추가합니다.
      const messageData: MessageType = {
        senderId: currentUser.id,
        text: inputText,
        createdAt: new Date(),
      };

      // `imageUrl`이 존재하고 유효한 값이면 `image` 필드를 추가합니다.
      if (imageUrl) messageData.image = imageUrl as string;

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion(messageData),
      });

      // 2. userChats 테이블: 대화방 상태 테이블..
      // userChats 는 양방향 대화 참여자에게 각각 update 된다.
      // 중복되는 작업을 userIDs 어레이 루프 작업으로 처리해주자.
      const userIDs = [
        (currentUser as UserType).id,
        (targetUser as UserType).id,
      ];

      userIDs.forEach(async (id) => {
        // Ref 를 생성하고 작업하자..
        const userChatsRef = doc(db, "userchats", id as string);

        // Snapshot creation and listen.
        const userChatsSnapshot = await getDoc(userChatsRef);
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          // look for chatIndex
          const chatIndex = userChatsData.chats.findIndex(
            (c: ChatType) => c.chatId === chatId
          );

          console.log(chatId, chatIndex, userChatsData.chats[chatIndex]);
          // lastMessage and etc.
          userChatsData.chats[chatIndex].lastMessage = inputText;
          userChatsData.chats[chatIndex].isSeen =
            id === (currentUser as UserType).id ? false : true;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          // update Action
          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        } else {
          console.error("No userChats data found");
        }
      });
      setInputText("");
    } catch (err) {
      console.error(err);
    } finally {
      setUploadImg(null);
    }
  };

  return (
    <form onSubmit={(e) => handleSendChat(e)}>
      <div className="bottom flex flex-row justify-between items-center gap-2 border-t border-gray-500 mt-auto pt-4">
        <div className="icons flex gap-2">
          <label htmlFor="fileInput">
            <IoIosImages className="w-4 h-4" />
          </label>
          <input
            type="file"
            id="fileInput"
            ref={uploadRef}
            style={{ display: "none" }}
            onChange={handleImage}
          />
          <IoCameraOutline className="w-4 h-4" />
          <IoMdMic className="w-4 h-4" />
        </div>
        <div className="chatInput w-5/6 bg-[color:var(--chat-bubble-background-color)] rounded-md">
          <input
            type="text"
            placeholder="Type a message..."
            className="bg-transparent border-0 outline-0 p-2 text-white font-semibold "
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div className="emoji flex justify-center items-center gap-2 ">
          <div
            className="emoji-wrapper relative w-8 h-8 p-2 rounded-full 
          bg-[color:var(--chat-bubble-background-color)]
          hover:bg-[color:var(--chat-bubble-deep-background-color)]
          "
          >
            <BsEmojiSunglasses
              className="w-4 h-4 text-amber-100"
              onClick={(e) => setEmojiOpen((prev) => !prev)}
            />
            <EmojiPicker
              className="absolute"
              open={emojiOpen}
              onEmojiClick={handleEmoji}
              style={{
                position: "absolute",
                bottom: "40px",
                right: "20px",
              }}
            />
          </div>
          <button
            className="py-2 px-4 rounded-md
            bg-[color:var(--positive-background-color)] 
            hover:bg-[color:var(--positive-deep-background-color)]
            "
            type="submit"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
