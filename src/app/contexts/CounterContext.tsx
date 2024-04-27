/*  2024-04-26 23:20:21

[useContext + useReducer] custom hook example from Dave Gray.
Ref: 
https://github.com/gitdagray/typescript-course/blob/main/lesson15/src/context/


= 코드 분석
1. reducer
2. 커스텀 훅 useCounterContext
  const [state, dispatch] = useReducer(reducer, initState);
  return { state, increment, decrement, handleTextInput };
3. context 프로바이더 선언 CounterContext
  const CounterContext = createContext<UseCounterContextType>(initContextState);
4. context 프로바이더 컴포넌트 선언 CounterProvider
  <CounterContext.Provider value={useCounterContext(initState)}>
5. useCounter
  return { count, increment, decrement };
6. useCounterContext
  return { text, handleTextInput };

* useCounterContext 는 useReducer 로 분기되는 펑션들과 state 를 리턴한다. 
* <CounterProvider> 로 컨텍스트의 스코프를 감쌀 수 있는 컴포넌트를 export 한다. 
* useContext(CounterContext) 로, 컨텍스트의 항목들을 읽어서 훅으로 리턴해준다.
    const { state, increment, decrement } = useContext(CounterContext);

이 라이브러리 전체에서 가장 중요한 역할을 하고 있는 건, useCounterContext 훅이다. 
useCounterContext 훅이, useReducer 로 분기 펑션들을 생성해 리턴해주고,
2차 파생 훅들이 이 분기 펑션들을 사용하는 구조이다. 

* useReducer 와 useContext 를 모두 커스텀 훅에 수용해서, 비즈니스 로직에는 커스텀 훅만 사용되도록 하였다. 

혼란스러운 부분..
initState 와 initContextState 의 역할과 구분을 정리하기 어렵다. 
- initState : useReducer 의 초기 상태값
- initContextState : useContext 의 초기 상태값


핵심은 이 코드다
  return { state, increment, decrement, handleTextInput };
이 리턴 객체들이 전 과정을 지배하고, 이 과정의 목적이기도 하다. 

*/

import {
  createContext,
  useReducer,
  ChangeEvent,
  ReactElement,
  useCallback,
  useContext,
} from "react";

type StateType = {
  count: number;
  text: string;
};

// useReducer 에 전달하는 초기 상태 값
const initState: StateType = { count: 0, text: "" };

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, text: action.payload ?? "" };
    default:
      throw new Error();
  }
};

// useReducer 커스텀 훅...
// 훅 이름에 context 가 포함되었지만, 여기서 context 는 사용되지 않았다.
//
// useReducer 를 배우던 시점에는, 이 펑션에서 연산을 종료, 상태를 업데이트하고 코드런은 마무리됐었다.
// 하지만 커스텀 훅에서는, 연산과 상태 업데이트를 담당하는 펑션을 리턴하는 방식으로 확장되고 있는 것이다.
// 실제 연산과 상태 업데이트는 리턴한 각 펑션이 트리거 되면서 수행된다.
// 여기 state 는 리턴되어, context 의 스코프 내에서 공유되는 state 가 된다.
const useCounterContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const increment = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT }),
    []
  );

  const decrement = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT }),
    []
  );

  const handleTextInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.NEW_INPUT,
      payload: e.target.value,
    });
  }, []);

  return { state, increment, decrement, handleTextInput };
};

type UseCounterContextType = ReturnType<typeof useCounterContext>;

// createContext 에 전달하는 초기 상태 값
const initContextState: UseCounterContextType = {
  state: initState,
  increment: () => {},
  decrement: () => {},
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => {},
};

export const CounterContext =
  createContext<UseCounterContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

export const CounterProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CounterContext.Provider value={useCounterContext(initState)}>
      {children}
    </CounterContext.Provider>
  );
};

type UseCounterHookType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const useCounter = (): UseCounterHookType => {
  const {
    state: { count },
    increment,
    decrement,
  } = useContext(CounterContext);
  return { count, increment, decrement };
};

type UseCounterTextHookType = {
  text: string;
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useCounterText = (): UseCounterTextHookType => {
  const {
    state: { text },
    handleTextInput,
  } = useContext(CounterContext);
  return { text, handleTextInput };
};
