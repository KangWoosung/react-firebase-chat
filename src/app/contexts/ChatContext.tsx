/*   2024-04-27 04:11:52

useReducer & useContext utility functions.

Todos:
1. initState
2. Reducer.Action_Types
3. Reducer function
4. useReducer Custom hook function
5. initContextState
6. create createContext
7. Context.Provider Component
8. Context.Consumer functions

ZuStand  Object :
{
  chatId: null
  user: null
  isCurrentUserBlocked: false
  isRecieverBlocked: false
  changeChat: (chatId: string, user: UserType) => {
    const currentUser = useUserStore.getState().currentUser;

    // CHECK IF CURRENT USER IS BLOCKED
    if(user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isRecieverBlocked: false
      });
    }

    // CHECK IF RECEIVER IS BLOCKED
    if(currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: user,
        isCurrentUserBlocked: false,
        isRecieverBlocked: true
      });
    },
    set({
      chatId,
      user: null,
      isCurrentUserBlocked: true,
      isRecieverBlocked: false
    });
  }
  // CHANGE RECEIVER BLOCK STATE
  changeBlock: () => {
    set(state => ({...state, isRecieverBlocked: !state.isRecieverBlocked}))
  }
}


{
  lastMessage: '',
  receiverId: 'p41uSfnA0CbHDpjU4xoqJtJSPoH2',
  isSeen: false,
  chatId: 'BNoZoiYpAcnzfr5wUbWT',
  updatedAt: 1714346881106,
  user: {
    email: 'seola@gmail.com',
    blocked: [],
    avatar: 
      'https://firebasestorage.googleapis.com/v0/b/lamadev-chat-8c463.appspot.com/o/images%2FMon%20Apr%2029%202024%2005%3A56%3A51%20GMT%2B0900%20(%ED%95%9C%EA%B5%AD%20%ED%91%9C%EC%A4%80%EC%8B%9C)03-NIMeYVV.jpg?alt=media&token=5adff277-0be5-4512-a428-f1ecc99c06db',
    userName: 'Seol a',
    id: 'p41uSfnA0CbHDpjU4xoqJtJSPoH2'
  }
}

*/

import { createContext, useContext, useReducer } from "react";
import { UserType } from "../types/userType";
import { GanymedeUserContext } from "./UserContextV2";

// 1. initState
type GanymedeChatContextStateType = {
  chatId: string | null;
  targetUser: UserType | null;
  currentUser: UserType | null;
  isCurrentUserBlocked: boolean;
  isRecieverBlocked: boolean;
  changeChat: (chatId: string, targetUser: UserType) => void;
  changeBlock: () => void;
  ganymedeChatDispatch?: React.Dispatch<ReducerAction>;
};
const initGanymedeChatContextState = {
  chatId: null,
  targetUser: null,
  currentUser: null,
  isCurrentUserBlocked: false,
  isRecieverBlocked: false,
  changeChat: (chatId: string, targetUser: UserType) => void 0,
  changeBlock: () => void 0,
  setCurrentUser: (user: UserType | null) => void 0,
};

// 2. Reducer.Action_Types
export const enum REDUCER_ACTION_TYPE {
  SET_CHAT,
  SET_TARGET_USER,
  SET_IS_CURRENT_USER_BLOCKED,
  SET_IS_RECIEVER_BLOCKED,
}
type ReducerAction =
  | { type: REDUCER_ACTION_TYPE.SET_CHAT; payload: string }
  | { type: REDUCER_ACTION_TYPE.SET_TARGET_USER; payload: UserType | null }
  | { type: REDUCER_ACTION_TYPE.SET_IS_CURRENT_USER_BLOCKED; payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_IS_RECIEVER_BLOCKED; payload: boolean };

// 3. Reducer.function
const ganymedeChatContextReducer = (
  state: GanymedeChatContextStateType,
  action: ReducerAction
): GanymedeChatContextStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_CHAT:
      return {
        ...state,
        chatId: action.payload,
      };
    case REDUCER_ACTION_TYPE.SET_TARGET_USER:
      return {
        ...state,
        targetUser: action.payload,
      };
    case REDUCER_ACTION_TYPE.SET_IS_CURRENT_USER_BLOCKED:
      return {
        ...state,
        isCurrentUserBlocked: action.payload,
      };
    case REDUCER_ACTION_TYPE.SET_IS_RECIEVER_BLOCKED:
      return {
        ...state,
        isRecieverBlocked: action.payload,
      };
    default:
      return state;
  }
};

// 4. useReducer Custom hook function
export const useGanymedeChatContext = (): GanymedeChatContextStateType => {
  const [chatState, dispatch] = useReducer(
    ganymedeChatContextReducer,
    initGanymedeChatContextState
  );
  const { currentUser: userContextCurrentUser } =
    useContext(GanymedeUserContext);
  if (!chatState.currentUser) {
    chatState.currentUser = userContextCurrentUser;
  }

  return {
    chatId: chatState.chatId,
    targetUser: chatState.targetUser,
    currentUser: chatState.currentUser,
    isCurrentUserBlocked: chatState.isCurrentUserBlocked,
    isRecieverBlocked: chatState.isRecieverBlocked,
    changeChat: (chatId: string, user: UserType) => {
      const currentUser = chatState.currentUser;
      if (!currentUser?.id || !user?.id) return;

      // CHECK IF CURRENT USER IS BLOCKED
      if (user.blocked.includes(currentUser.id)) {
        console.log("blocked");
        return dispatch({
          type: REDUCER_ACTION_TYPE.SET_IS_CURRENT_USER_BLOCKED,
          payload: true,
        });
      }

      // CHECK IF RECEIVER IS BLOCKED
      else if (currentUser.blocked.includes(user.id)) {
        console.log("blocked");
        return dispatch({
          type: REDUCER_ACTION_TYPE.SET_IS_RECIEVER_BLOCKED,
          payload: true,
        });
      }

      // CHECK ELSE
      else {
        dispatch({
          type: REDUCER_ACTION_TYPE.SET_IS_CURRENT_USER_BLOCKED,
          payload: false,
        });
        dispatch({
          type: REDUCER_ACTION_TYPE.SET_IS_RECIEVER_BLOCKED,
          payload: false,
        });
        dispatch({ type: REDUCER_ACTION_TYPE.SET_CHAT, payload: chatId });
        dispatch({ type: REDUCER_ACTION_TYPE.SET_TARGET_USER, payload: user });
      }

      console.log("changeChat", chatId, user);
    },
    changeBlock: () => {
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_IS_RECIEVER_BLOCKED,
        payload: !chatState.isRecieverBlocked,
      });
    },
  };
};

// 5. initContextState
type UseGanymedeChatContextType = {
  chatId: string | null;
  targetUser: UserType | null;
  currentUser: UserType | null;
  isCurrentUserBlocked: boolean;
  isRecieverBlocked: boolean;
  changeChat: (chatId: string, targetUser: UserType) => void;
  changeBlock: () => void;
  ganymedeChatDispatch: React.Dispatch<ReducerAction>;
};
export const initUseGanymedeChatContextType = {
  chatId: null,
  targetUser: null,
  currentUser: null,
  isCurrentUserBlocked: false,
  isRecieverBlocked: false,
  changeChat: (chatId: string, targetUser: UserType) => void 0,
  changeBlock: () => void 0,
  ganymedeChatDispatch: (action: ReducerAction) => void 0,
};

// 6. create createContext
export const GanymedeChatContext = createContext<UseGanymedeChatContextType>(
  initUseGanymedeChatContextType
);

// 7. Context.Provider Component
export const GanymedeChatProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    chatId,
    targetUser,
    isCurrentUserBlocked,
    isRecieverBlocked,
    changeChat,
    changeBlock,
    ganymedeChatDispatch,
  } = useGanymedeChatContext();
  const { currentUser } = useContext(GanymedeUserContext);

  console.log(currentUser);

  return (
    <GanymedeChatContext.Provider
      value={{
        chatId,
        targetUser,
        currentUser,
        isCurrentUserBlocked,
        isRecieverBlocked,
        changeChat,
        changeBlock,
        ganymedeChatDispatch: (action: ReducerAction) => void 0,
      }}
    >
      {children}
    </GanymedeChatContext.Provider>
  );
};

// 8. useContext Custom hook functions
export const useGanymedeChatContextHook = (): UseGanymedeChatContextType => {
  const {
    chatId,
    targetUser,
    currentUser,
    isCurrentUserBlocked,
    isRecieverBlocked,
    changeChat,
    changeBlock,
    ganymedeChatDispatch,
  } = useContext(GanymedeChatContext);

  return {
    chatId,
    targetUser,
    currentUser,
    isCurrentUserBlocked,
    isRecieverBlocked,
    changeChat,
    changeBlock,
    ganymedeChatDispatch,
  };
};
