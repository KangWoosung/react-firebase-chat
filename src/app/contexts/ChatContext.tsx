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


Usage:
  // 1. Wrap the Component with Context.Provider Component
    <GanymedeUserProvider>
      <GanymedeChatProvider>
        <AppFrame />
      </GanymedeChatProvider>
    </GanymedeUserProvider>
    
  // 2. With Context.Consumer function, you can Call out the States, functions you need from anywhere within the Context.Provider scope.
  const { targetUser, changeChat } = useGanymedeChatContextHook();
    
  

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
  checkTargetIsBlocked: (currentUser: UserType, targetUser: UserType) => void;
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
  checkTargetIsBlocked: (currentUser: UserType, targetUser: UserType) => void 0,
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
  console.log(chatState.currentUser?.blocked);

  return {
    chatId: chatState.chatId,
    targetUser: chatState.targetUser,
    currentUser: chatState.currentUser,
    // 여기 false 는 초기 값일 뿐, changeChat() 이후에는 아무 영향이 없다.
    isCurrentUserBlocked: false,
    isRecieverBlocked: false,
    changeChat: (chatId: string, targetUser: UserType) => {
      const currentUser = chatState.currentUser;
      console.log(chatState.isRecieverBlocked);
      console.log(currentUser?.blocked);
      if (!currentUser?.id || !targetUser?.id) return;

      // CHECK IF CURRENT USER IS BLOCKED
      if (targetUser.blocked.includes(currentUser.id)) {
        console.log("You are blocked");
        dispatch({
          type: REDUCER_ACTION_TYPE.SET_IS_CURRENT_USER_BLOCKED,
          payload: true,
        });
      }

      // CHECK IF RECEIVER IS BLOCKED
      // 여기까진 정상작동한다.
      // block 하지 않은 타겟에게 아래 조건절은 작동하지 않는다.
      else if (currentUser.blocked.includes(targetUser.id)) {
        console.log(chatState.isRecieverBlocked);
        console.log(currentUser.blocked);
        console.log("You blocked her");
        dispatch({
          type: REDUCER_ACTION_TYPE.SET_IS_RECIEVER_BLOCKED,
          payload: true,
        });
      }
      // 근데 여기서 무조건 true 가 나온다.
      console.log(chatState.isRecieverBlocked);

      // CHECK ELSE
      // else {
      // dispatch({
      //   type: REDUCER_ACTION_TYPE.SET_IS_CURRENT_USER_BLOCKED,
      //   payload: false,
      // });
      // dispatch({
      //   type: REDUCER_ACTION_TYPE.SET_IS_RECIEVER_BLOCKED,
      //   payload: false,
      // });
      dispatch({ type: REDUCER_ACTION_TYPE.SET_CHAT, payload: chatId });
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_TARGET_USER,
        payload: targetUser,
      });
      // }

      // 2024-05-03 08:40:08
      // targetUser 를 바꿔도 isRecieverBlocked 가 변화하지 않거나 고정 값으로 고정되는 문제...
      // 2024-05-03 10:48:08
      // 이 시점에서 isRecieverBlocked 는 실제 밸류가 아니고 어디엔가 캐시된 밸류다.

      console.log(currentUser.blocked);
      console.log(chatState.isRecieverBlocked);
    },
    changeBlock: () => {
      console.log(chatState.isRecieverBlocked);
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_IS_RECIEVER_BLOCKED,
        payload: !chatState.isRecieverBlocked,
      });
      console.log(chatState.isRecieverBlocked);
    },
    // reducer 에, blocked 처리를 담당하는 독립 펑션을 넣어주는 게 낫겠다.
    // changeChat 을 실행하는 루틴에서 await 로
    // checkTargetIsBlocked 를 이어서 실행시켜주자.
    checkTargetIsBlocked: (currentUser: UserType, targetUser: UserType) => {
      if (!targetUser.id) return;

      console.log(chatState.isRecieverBlocked);
      if (currentUser.blocked.includes(targetUser.id)) {
        // console.log(currentUser.blocked);
        console.log("You blocked her");
        dispatch({
          type: REDUCER_ACTION_TYPE.SET_IS_RECIEVER_BLOCKED,
          payload: true,
        });
      } else {
        console.log("You unlocked her");
        dispatch({
          type: REDUCER_ACTION_TYPE.SET_IS_RECIEVER_BLOCKED,
          payload: false,
        });
      }
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
  checkTargetIsBlocked: (currentUser: UserType, targetUser: UserType) => void;
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
  checkTargetIsBlocked: (currentUser: UserType, targetUser: UserType) => void 0,
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
    checkTargetIsBlocked,
    ganymedeChatDispatch,
  } = useGanymedeChatContext();
  const { currentUser } = useContext(GanymedeUserContext);

  // console.log(currentUser);
  // console.log(currentUser?.blocked);

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
        checkTargetIsBlocked,
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
    checkTargetIsBlocked,
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
    checkTargetIsBlocked,
    ganymedeChatDispatch,
  };
};
