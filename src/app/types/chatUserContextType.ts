import { Dispatch, SetStateAction } from "react";
import { UserType } from "./userType";
import { ChatType } from "./chatTypes";
import { MessageType } from "./messageType";

export type ChatUserContextType = {
  user: UserType | undefined;
  // setUser: Dispatch<SetStateAction<UserType | undefined>>;
  chats?: ChatType | undefined;
  messages?: MessageType | undefined;
  loggedIn: boolean;
  userContext: UserType | undefined;
  setUserContext: Dispatch<SetStateAction<UserType | undefined>>;
};
