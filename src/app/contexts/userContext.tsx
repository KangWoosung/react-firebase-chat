/*  2024-04-27 22:14:22

Todos:
1. initState
2. Reducer.Action_Types
3. Reducer function
4. useReducer Custom hook function
5. initContextState
6. create createContext
7. Context.Provider Component
8. Context.Consumer functions

2024-04-28 01:37:21
Job finished!! 🎉

*/
import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

import { BlockedType } from "../types/blockedType";
import { ChatType } from "../types/chatTypes";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/lib/firebase";
import { create } from "zustand";

// 1. initState
type StateType = {
  currentUserId: string | null | undefined;
  currentUser?: any;
  isLoading: boolean;
  isError?: boolean;
  error?: any;
  fetchUserInfo: (uid: string) => void;
};
const initState: StateType = {
  currentUserId: undefined,
  isLoading: false,
  isError: false,
  error: null,
  fetchUserInfo: (uid: string) => void 0,
};

// 2. Reducer.Action_Types
export const enum REDUCER_ACTION_TYPE {
  SET_USER_ID,
  SET_USER_DATA,
  SET_ERROR,
  ISLOADING,
}
// type ReducerAction = {
//   type: REDUCER_ACTION_TYPE;
//   payload?: any;
// };

type ReducerAction =
  | { type: REDUCER_ACTION_TYPE.SET_USER_ID; payload: any }
  | { type: REDUCER_ACTION_TYPE.SET_USER_DATA; payload: any }
  | { type: REDUCER_ACTION_TYPE.ISLOADING; payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_ERROR; payload: string | Error };

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
      return {
        ...state,
        isError: true,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

// 4. useReducer Custom hook function
const useUserContext = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  console.log(`useUserContext: ${state}`);

  const fetchUserInfo = useCallback(async (uid: string) => {
    dispatch({ type: REDUCER_ACTION_TYPE.ISLOADING, payload: true });

    if (!uid)
      return dispatch({
        type: REDUCER_ACTION_TYPE.SET_ERROR,
        payload: "uid is missing",
      });

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch({
          type: REDUCER_ACTION_TYPE.SET_USER_ID,
          payload: docSnap.data(),
        });
        dispatch({
          type: REDUCER_ACTION_TYPE.SET_USER_DATA,
          payload: docSnap.data(),
        });
      } else {
        dispatch({
          type: REDUCER_ACTION_TYPE.SET_ERROR,
          payload: "User document does not exist",
        });
      }
    } catch (e) {
      console.error(e);
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_ERROR,
        payload: e instanceof Error ? e : "Unknown Error",
      });
    } finally {
      dispatch({ type: REDUCER_ACTION_TYPE.ISLOADING, payload: false });
    }
  }, []);

  return { state, dispatch, fetchUserInfo };
};

// 5. initContextState
type UseUserContextType = {
  state: StateType;
  userDispatch: React.Dispatch<ReducerAction>;
  error: string | Error | null;
  fetchUserInfo: (uid: string) => Promise<void>;
};
const initContextState: UseUserContextType = {
  state: initState,
  userDispatch: () => {},
  error: null,
  fetchUserInfo: async (uid: string) => {},
};

// 6. create createContext
export const UserContext = createContext<UseUserContextType>(initContextState);

// 7. Context.Provider Component
export const UserContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const { state, dispatch: userDispatch, fetchUserInfo } = useUserContext();
  return (
    <UserContext.Provider
      value={{
        state,
        userDispatch,
        error: state.isError ? state.error : null,
        fetchUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 8. useContext Custom hook functions
type UseFetchUserInfoType = {
  fetchUserInfo: (uid: string) => Promise<void>;
  state: StateType;
  userDispatch: React.Dispatch<ReducerAction>;
  error: string | Error | null;
};
export const useFetchUserInfo = (): UseFetchUserInfoType => {
  const { state, userDispatch, error, fetchUserInfo } = useContext(UserContext);
  console.log(state);
  return { state, userDispatch, error, fetchUserInfo };
};

export const useCurrentUserId = (userId: string) => {
  const { userDispatch } = useContext(UserContext);
  console.log(userId);
  userDispatch({
    type: REDUCER_ACTION_TYPE.SET_USER_ID,
    payload: userId,
  });
};

///////////////////////////////////////////////////////
//// Zustand Code..  2024-04-28 21:22:22
/* 
  fetch 와 메인 상태관리를 전담하는, Zustand 의 핵심 커스텀 훅이다. 
  이 훅의 기능이 내 게이트웨이 커스텀훅으로 편입되어야 한다. 
  커스텀훅 내부에서 fetch 와 객체 구성이 완료되고 객체 데이터가 구성된다는 것이 중요함!! 
  결과가 리턴되는 것이 아니다!! 구성된 객체가 전역에서 사용된다는 것이 중요하다.
  이 커스텀훅이 AppFrame.tsx 의, 
  onAuthStateChanged(auth, (user) => {}) 내부에서 호출되어야 한다. 
  onAuthStateChanged(auth, (user) => {
    // useUserStore() 훅이 호출되는 시점에 fetch.action 이 발생하는 것이 아니라,
    const {currentUser, isLoading, fetchUserInfo} = useUserStore()
    // fetchUserInfo(uid) 가 호출되는 시점에 fetch.action 이 실행된다!!!! 이 문제가 내 코드와의 가장 큰 차이점.. 
  })
*/
export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  zustandFetchUserInfo: async (uid: string | undefined | null) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      // Firebase fetch...
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error(err);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
