export type ChatsType = {
  chatId: string;
  receiverId: string;
  lastMessage: string;
  updatedAt: Date;
  isSeen: boolean;
};

export type ChatType = {
  id: string;
  name: string;
  lastMessage: string;
  own?: boolean;
  time: string;
  image?: string;
  unread?: boolean;
};
