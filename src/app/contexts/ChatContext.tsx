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


States to handle :
1. logIn status : let Firebase handle it
2. reducer.Actions... 
    -selectChat
    -blockUser
    -unblockUser


*/

import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

import { BlockedType } from "../types/blockedType";
import { ChatType } from "../types/chatsType";

// 1. initState
type StateType = {
  currentUserId: string | null | undefined;
  currentUser?: any;
  isLoading: boolean;
  isError?: boolean;
  error?: any;
  fetchChats: (uid: string) => void;
};
const initState = {
  currentUserId: undefined,
  isLoading: false,
  isError: false,
  error: null,
  fetchChats: (uid: string) => void 0,
};

// 2. Reducer.Action_Types
export const enum REDUCER_ACTION_TYPE {
  SET_USER_ID,
  SET_USER_DATA,
  SET_ERROR,
  ISLOADING,
}
type ReducerAction =
  | { type: REDUCER_ACTION_TYPE.SET_USER_ID; payload: any }
  | { type: REDUCER_ACTION_TYPE.SET_USER_DATA; payload: any }
  | { type: REDUCER_ACTION_TYPE.ISLOADING; payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_ERROR; payload: any };

// 3. Reducer.function
const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_USER_ID:
      return { ...state, currentUserId: action.payload };
    case REDUCER_ACTION_TYPE.SET_USER_DATA:
      return { ...state, currentUser: action.payload };
    case REDUCER_ACTION_TYPE.ISLOADING:
      return { ...state, isLoading: !!action.payload };
    case REDUCER_ACTION_TYPE.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// 4. useReducer Custom hook function
const useGunymedeChatContext = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return {
    currentUserId: state.currentUserId,
    currentUser: state.currentUser,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
    fetchChats: async (uid: string) => {
      if (!uid) {
        dispatch({ type: REDUCER_ACTION_TYPE.SET_USER_DATA, payload: null });
        return;
      }

      dispatch({ type: REDUCER_ACTION_TYPE.ISLOADING, payload: true });
      try {
        // const user = await fetchUser(uid);
        const user = {
          uid: "123",
          userName: "test",
          email: "",
        };
      } catch (err) {
        dispatch({ type: REDUCER_ACTION_TYPE.SET_ERROR, payload: err });
      } finally {
        dispatch({ type: REDUCER_ACTION_TYPE.ISLOADING, payload: false });
      }
    },
  };
};

// 5. initContextState
const initContextState = {
  currentUser: null,
  isLoading: true,
  isError: false,
  error: null,
};

// 6. create createContext
const GunymedeChatContext = createContext(initContextState);

// 7. Context.Provider Component
export const GunymedeChatProvider = ({
  children,
}: {
  children: ReactElement[];
}) => {
  const { currentUser, isLoading } = useGunymedeChatContext();

  return (
    <GunymedeChatContext.Provider
      value={{
        currentUser,
        isLoading,
      }}
    >
      {children}
    </GunymedeChatContext.Provider>
  );
};
