import React, { createContext, useReducer, useContext } from "react";
import {
  createAsyncDispatcher,
  initialAsyncState,
  createAsyncHandler,
} from "./asyncActionUtils";
import * as api from "./api";

//UsersContext에서 사용할 기본 상태
const initialState = {
  users: initialAsyncState,
  user: initialAsyncState,
};

const userHandler = createAsyncHandler("GET_USER", "user");
const usersHandler = createAsyncHandler("GET_USERS", "users");

export const getUsers = createAsyncDispatcher("GET_USERS", api.getUsers);
export const getUser = createAsyncDispatcher("GET_USERS", api.getUser);

//위에서 만든 객체 / 유틸 함수들을 사용하여 리듀서 작성
function usersReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
    case "GET_USERS_SUCCESS":
    case "GET_USERS_ERROR":
      return usersHandler(state, action);

    case "GET_USER":
    case "GET_USER_SUCCESS":
    case "GET_USER_ERROR":
      return userHandler(state, action);
    default:
      throw new Error(`unhandled action type : ${action.type}`);
  }
}

//State용 Context와 Dispatch용 Context 따로 만들어주기
const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

//위에서 선언한 두가지 Context 들의 Provider로 감싸주는 컴포넌트
export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

// State를 쉽게 조회할 수 있게 해주는 커스텀 Hook
export function useUsersState() {
  const state = useContext(UserStateContext);
  if (!state) {
    throw new Error("Cannot find UsersProvider");
  }
  return state;
}

// Dispatch를 쉽게 사용할 수 있게 해주는 커스텀 Hook
export function useUsersDispatch() {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find UsersProvider");
  }
  return dispatch;
}
