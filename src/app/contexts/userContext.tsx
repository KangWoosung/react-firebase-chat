/*  2024-04-24 00:00:20

Context 의 분리는 매우 아름답지만,
문제는, 여기 분리된 컴포넌트에서 ChatUser 관련 상태 값이 입출력 되어야 한다는 것인데...
이건 또다른 어려운 문제이다. 
Firebase 와 통신을 시작한 뒤에 다시 생각해 보기로 한다. 

*/
"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type ChatUserContextComponentProps = {
  children: React.ReactNode;
};
// 타입 정의
type ChatUserContextType = {
  userName: string | undefined;
  setUserName: Dispatch<SetStateAction<string | undefined>>;
};

const initValue = {
  userName: undefined,
  setUserName: () => {},
};

export const ChatUserContext = createContext<ChatUserContextType>(initValue);

export default function ChatUserContextComponent({
  children,
}: ChatUserContextComponentProps) {
  const [userName, setUserName] = useState<string | undefined>("Jane Doe");

  if (!userName)
    throw new Error(
      "You probably forgot to put <ChatUserContextComponent> around your component tree"
    );

  return (
    <ChatUserContext.Provider value={{ userName, setUserName }}>
      {children}
    </ChatUserContext.Provider>
  );
}
