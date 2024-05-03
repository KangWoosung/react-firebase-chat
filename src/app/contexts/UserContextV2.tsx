/*   2024-04-28 23:29:10

Todos:
1. initState
2. Reducer.Action_Types
3. Reducer function
4. useReducer Custom hook function
5. initContextState
6. create createContext
7. Context.Provider Component
8. Context.Consumer functions

이번 커스텀 유틸리티에 고유 네임을 부여한다: GanymedeUserContext 

ZuStand 코드의 펑션들과 객체구조를 참조하여 리빌드한다.

ZuStand 의 Context State Object 구조:
{
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
}

혼란을 최소화하기 위해, GanymedeUserContext 에서 변수, 속성 명을 동일하게 유지하고, 펑션 명만 바꾸자. 
{
    currentUser: null,
    isLoading: true,
    ganymedeUserFetch: async (uid: string | undefined | null) => {
    },
}

*/

import { ReactElement, useContext, useEffect, useReducer } from "react";
import { UserType } from "../types/userType";
import { doc, getDoc } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { db } from "../lib/firebase";
import { createContext } from "react";

// type UserType = {
//     id: string;
//     userName: string;
//     email: string;
//     avatar: string;
//     blocked: string[];
// }
// 1. initState
type StateType = {
  currentUser: UserType | null;
  isLoading: boolean;
  isError: boolean;
  error: string | Error | null;
  ganymedeUserFetch: (uid: string | undefined | null) => void;
  ganymedeUserDispatch: React.Dispatch<ReducerAction>;
};
const initState = {
  currentUser: null,
  isLoading: false,
  isError: false,
  error: null,
  ganymedeUserFetch: async (uid: string | undefined | null) => void 0,
  ganymedeUserDispatch: (action: ReducerAction) => void 0,
};

// 2. Reducer.Action_Types
export const enum REDUCER_ACTION_TYPE {
  SET_USER,
  SET_LOADING,
  SET_IS_ERROR,
  SET_ERROR,
}
type ReducerAction =
  | { type: REDUCER_ACTION_TYPE.SET_USER; payload: any }
  | { type: REDUCER_ACTION_TYPE.SET_LOADING; payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_IS_ERROR; payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_ERROR; payload: string | Error };

// 3. Reducer.function
const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_USER:
      return { ...state, currentUser: action.payload };
    case REDUCER_ACTION_TYPE.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case REDUCER_ACTION_TYPE.SET_IS_ERROR:
      return { ...state, isError: !!action.payload };
    case REDUCER_ACTION_TYPE.SET_ERROR:
      return { ...state, error: action.payload as Error | string };
    default:
      return state;
  }
};

// 4. useReducer Custom hook function
const useGanymedeUserContext = (): StateType => {
  const [state, dispatch] = useReducer(reducer, initState);

  return {
    currentUser: state.currentUser,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
    ganymedeUserFetch: async (uid: string | undefined | null) => {
      if (!uid)
        return dispatch({ type: REDUCER_ACTION_TYPE.SET_USER, payload: null });

      try {
        // Firebase fetch...
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch({
            type: REDUCER_ACTION_TYPE.SET_USER,
            payload: docSnap.data(),
          });
        } else {
          dispatch({ type: REDUCER_ACTION_TYPE.SET_USER, payload: null });
          dispatch({
            type: REDUCER_ACTION_TYPE.SET_IS_ERROR,
            payload: true,
          });
          dispatch({
            type: REDUCER_ACTION_TYPE.SET_ERROR,
            payload: "User document does not exist in Firebase.",
          });
        }
      } catch (err) {
        console.error(err);
        return dispatch({ type: REDUCER_ACTION_TYPE.SET_USER, payload: null });
      } finally {
        dispatch({ type: REDUCER_ACTION_TYPE.SET_LOADING, payload: false });
      }
    },
    ganymedeUserDispatch: dispatch,
  };
};

// 5. initContextState
type UseGanymedeUserContextType = {
  currentUser: UserType | null;
  ganymedeUserDispatch?: React.Dispatch<ReducerAction>;
  ganymedeUserFetch?: (uid: string | undefined | null) => void;
  error?: string | Error | null;
  isError?: boolean;
  isLoading: boolean;
};
export const initGanymedeUserContextState = {
  currentUser: null,
  ganymedeUserDispatch: (action: ReducerAction) => void 0,
  ganymedeUserFetch: async (uid: string | undefined | null) => void 0,
  error: null,
  isError: false,
  isLoading: false,
};

// 6. create createContext
export const GanymedeUserContext = createContext<UseGanymedeUserContextType>(
  initGanymedeUserContextState
);

// 7. Context.Provider Component
export const GanymedeUserProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const { currentUser, isLoading, ganymedeUserFetch, ganymedeUserDispatch } =
    useGanymedeUserContext();

  return (
    <GanymedeUserContext.Provider
      value={{
        currentUser,
        isLoading,
        ganymedeUserFetch,
        ganymedeUserDispatch,
      }}
    >
      {children}
    </GanymedeUserContext.Provider>
  );
};

// 8. Context.Consumer functions
/* 
    // Usage :
    // Just call this Context.Consumer function : 
    const { currentUser, ganymedeUserFetch, isLoading, isError, error } = useGanymedeUserFetchHook();
    // and call fetch function
    ganymedeUserFetch(user.id);
    // then the userData and fetch error states will be there : { currentUser, error, isError }
*/
export const useGanymedeUserFetchHook = () => {
  const {
    currentUser,
    ganymedeUserFetch,
    ganymedeUserDispatch,
    isLoading,
    isError,
    error,
  } = useContext(GanymedeUserContext);
  return {
    currentUser,
    ganymedeUserFetch,
    ganymedeUserDispatch,
    isLoading,
    isError,
    error,
  };
};
