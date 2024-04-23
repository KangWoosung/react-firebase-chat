/*  2024-04-24 02:24:27


*/

import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { IoIosImages, IoMdMic } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";

// 일반 함수 타입 선언
type EmojiClickEvent = {
  emoji: string;
};

const ChatInput = () => {
  const [inputText, setInputText] = useState<string>("");
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);

  const handleEmoji = (e: EmojiClickEvent) => {
    console.log("Emoji clicked", e);
    setInputText((prev) => prev + e.emoji);
    setEmojiOpen(false);
  };

  return (
    <div className="bottom flex flex-row justify-between items-center gap-2 border-t border-gray-500 mt-auto pt-4">
      <div className="icons flex gap-2">
        <IoIosImages className="w-4 h-4" />
        <IoCameraOutline className="w-4 h-4" />
        <IoMdMic className="w-4 h-4" />
      </div>
      <div className="chatInput w-5/6">
        <input
          type="text"
          placeholder="Type a message..."
          className="bg-transparent border-0 outline-0 p-2 text-white font-semibold "
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="emoji flex justify-center items-center gap-2 ">
        <div className="emoji-wrapper relative w-8 h-8 p-2 rounded-full">
          <BsEmojiSunglasses
            className="w-4 h-4 text-amber-300"
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
        <button className="bg-sky-600 py-2 px-4 rounded-md">Send</button>
      </div>
    </div>
  );
};

export default ChatInput;
