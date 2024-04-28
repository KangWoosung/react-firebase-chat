/*   2024-04-28 23:29:10

이번 커스텀 유틸리티에 고유 네임을 부여한다: GunymedianContext 

ZuStand 코드의 펑션들과 객체구조를 참조하여 리빌드한다.

ZuStand 의 커스텀 훅 구조:
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

혼란을 최소화하기 위해, GunymedianContext 에서 변수, 속성 명을 동일하게 유지하고, 펑션 명만 바꾸자. 
{
    currentUser: null,
    isLoading: true,
    gunymedeFetch: async (uid: string | undefined | null) => {
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
  gunymedeUserFetch: (uid: string | undefined | null) => void;
  gunymedeUserDispatch: React.Dispatch<ReducerAction>;
};
const initState = {
  currentUser: null,
  isLoading: false,
  isError: false,
  error: null,
  gunymedeUserFetch: async (uid: string | undefined | null) => void 0,
  gunymedeUserDispatch: (action: ReducerAction) => void 0,
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
const useGunymedeUserContext = (): StateType => {
  const [state, dispatch] = useReducer(reducer, initState);

  return {
    currentUser: state.currentUser,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
    gunymedeUserFetch: async (uid: string | undefined | null) => {
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
            payload: "User document does not exist is Firebase.",
          });
        }
      } catch (err) {
        console.error(err);
        return dispatch({ type: REDUCER_ACTION_TYPE.SET_USER, payload: null });
      } finally {
        dispatch({ type: REDUCER_ACTION_TYPE.SET_LOADING, payload: false });
      }
    },
    gunymedeUserDispatch: dispatch,
  };
};

// 5. initContextState
type UseGunymedeUserContextType = {
  currentUser: UserType | null;
  gunymedeUserDispatch?: React.Dispatch<ReducerAction>;
  gunymedeUserFetch?: (uid: string | undefined | null) => void;
  error?: string | Error | null;
  isError?: boolean;
  isLoading: boolean;
};
export const initGunymedeUserContextState = {
  currentUser: null,
  gunymedeUserDispatch: (action: ReducerAction) => void 0,
  gunymedeUserFetch: async (uid: string | undefined | null) => void 0,
  error: null,
  isError: false,
  isLoading: false,
};

// 6. create createContext
export const GunymedeUserContext = createContext<UseGunymedeUserContextType>(
  initGunymedeUserContextState
);

// 7. Context.Provider Component
export const GunymedeUserProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const { currentUser, isLoading, gunymedeUserFetch, gunymedeUserDispatch } =
    useGunymedeUserContext();
  //  gunymedeUserFetch, gunymedeUserDispatch
  // 검토해야 할 부분: 이 부분에서 상태 업데이트로 인해 무한 루프가 발생하는지 확인
  // `useEffect`가 필요하다면, 종속성 배열을 신중하게 설정하고, 무한 루프를 방지
  //   useEffect(() => {
  //     if (isLoading) {
  //       gunymedeUserDispatch({
  //         type: REDUCER_ACTION_TYPE.SET_LOADING,
  //         payload: false,
  //       });
  //     }
  //   }, [isLoading, gunymedeUserDispatch]); // 종속성 배열을 최소화하여 무한 루프 방지

  return (
    <GunymedeUserContext.Provider
      value={{
        currentUser,
        isLoading,
        gunymedeUserFetch,
        gunymedeUserDispatch,
      }}
    >
      {children}
    </GunymedeUserContext.Provider>
  );
};

// 8. useContext Custom hook functions
/* We've got the function.
    Just call : 
    gunymedeUserFetch(user.uid)
    then the userData will be there :
    currentUser
*/
export const useGunymedeUserFetch = () => {
  const {
    currentUser,
    gunymedeUserFetch,
    gunymedeUserDispatch,
    isLoading,
    isError,
    error,
  } = useContext(GunymedeUserContext);
  return {
    currentUser,
    gunymedeUserFetch,
    gunymedeUserDispatch,
    isLoading,
    isError,
    error,
  };
};
