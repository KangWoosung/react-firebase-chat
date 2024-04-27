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
