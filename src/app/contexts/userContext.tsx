/*  2024-04-24 00:00:20

Context 의 분리는 매우 아름답지만,
문제는, 여기 분리된 컴포넌트에서 ChatUser 관련 상태 값이 입출력 되어야 한다는 것인데...
이건 또다른 어려운 문제이다. 
Firebase 와 통신을 시작한 뒤에 다시 생각해 보기로 한다. 

2024-04-24 07:19:43
데자뷰가 오네..정신이 몽롱해진 듯...
unread 도 필요하고, chatRoom 에 대해 필요한 상태 값이 많아졌으므로, 상태를 객체로 하던지, useReducer 가 나오던지 변화를 줘야 할 시점에 왔다.

오늘은 너무 오랫동안 무리했으므로, 더이상 손 대지 않는 게 좋겠다. 

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
  unread?: boolean;
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
