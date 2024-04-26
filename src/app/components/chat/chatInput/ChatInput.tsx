/*  2024-04-24 02:24:27


*/

import EmojiPicker from "emoji-picker-react";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { IoIosImages, IoMdMic } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { ChatType } from "../Chat";

// 일반 함수 타입 선언
type EmojiClickEvent = {
  emoji: string;
};

// ChatInput의 Props 타입 정의
type ChatInputProps = {
  displayChats: ChatType[]; // ChatType의 배열
  setDisplayChats: (chats: ChatType[]) => void; // setState 함수 타입
};

const ChatInput: React.FC<ChatInputProps> = ({
  displayChats,
  setDisplayChats,
}) => {
  const [inputText, setInputText] = useState<string>("");
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<File | null>(null);
  const uploadRef = useRef(null);

  const handleEmoji = (e: EmojiClickEvent) => {
    console.log("Emoji clicked", e);
    setInputText((prev) => prev + e.emoji);
    setEmojiOpen(false);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Upload Image");
    if (e.target.files && e.target.files[0]) {
      setFiles(e.target.files[0]);
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

        // 기존 채팅에 새로운 채팅 추가
        setDisplayChats([...displayChats, newChat]);
      };

      // 파일을 데이터 URL로 읽기
      // reader.readAsDataURL(file);
    }
  };

  const handleAddChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(uploadRef.current);
    if (inputText) {
      // 새로운 채팅 객체 생성
      const newChat = {
        name: "New User",
        lastMessage: inputText,
        own: true,
        time: "Just now",
      };

      // 기존 채팅에 새로운 채팅 추가
      setDisplayChats([...displayChats, newChat]);
      setInputText("");
    }
  };

  return (
    <form onSubmit={(e) => handleAddChat(e)}>
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
            onChange={handleUpload}
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
