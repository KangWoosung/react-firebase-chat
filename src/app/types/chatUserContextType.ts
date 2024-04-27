import { Dispatch, SetStateAction } from "react";
import { UserType } from "./userType";
import { ChatsType } from "./chatsType";
import { MessageType } from "./messageType";

export type ChatUserContextType = {
  user: UserType | undefined;
  // setUser: Dispatch<SetStateAction<UserType | undefined>>;
  chats?: ChatsType | undefined;
  messages?: MessageType | undefined;
  loggedIn: boolean;
  userContext: UserType | undefined;
  setUserContext: Dispatch<SetStateAction<UserType | undefined>>;
};
