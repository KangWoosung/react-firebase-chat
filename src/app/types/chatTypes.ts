/*

2024-05-01 04:53:40
Chat 의 데이터 타입에 대한 사전정보가 전혀 없어서 
알고리즘을 이해하는 데 애를 먹었다. 
본 프로젝트에서 Firebase Database 에는 총 3개의 테이블이 필요하고,
1. users : UserType
2. userChats :
    {
      chatId: string,
      isSeen: boolean,
      lastMessage: string,
      receiverId: string,
      updatedAt: Date,
    }[]
    
3. chats :
    chatId: string,
    {
      createdAt: Date,
      messages: 
        {
          createdAt: Date,
          image: string,
          senderId: string,
          text: string,
        }[],
    }[]

  {
    messages: [],
    createdAt: Timestamp { seconds: 1714347796, nanoseconds: 759000000 }
  }

  
  senderId: (currentUser as UserType).id,
  text: inputText,
  createdAt: new Date(),


*/

import { UserType } from "./userType";

export type MessageType = {
  senderId: string;
  image?: string;
  createdAt: Date;
  text: string;
};

export type ChatType = {
  chatId: string;
  messages: MessageType[];
};

export type UserChatsType = {
  chatId: string;
  isSeen: boolean;
  lastMessage: string;
  receiverId: string;
  updatedAt: Date;
};

// type ChatsAndUsersType = UserChatsType & UserType;
export type ChatsAndUsersType = UserChatsType & {
  user: UserType;
};

export type ChatRoomType = {
  chatId: string;
  user: UserType;
  lastMessage: string;
  updatedAt: number;
};
