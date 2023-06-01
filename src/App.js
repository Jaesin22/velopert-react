// import React, { useRef, useMemo, useCallback, useReducer } from "react";
// import UserList from "./UserList";
// import CreateUser from "./CreateUser";
// import useInputs from "./hooks/useInputs";
// import produce from "immer";

// function countActiveUsers(users) {
//   console.log("활성 사용자 수를 세는중...");
//   return users.filter((user) => user.active).length;
// }

// const initialState = {
//   inputs: {
//     username: "",
//     email: "",
//   },
//   users: [
//     {
//       id: 1,
//       username: "velopert",
//       email: "public.velopert@gmail.com",
//       active: true,
//     },
//     {
//       id: 2,
//       username: "tester",
//       email: "tester@example.com",
//       active: false,
//     },
//     {
//       id: 3,
//       username: "liz",
//       email: "liz@example.com",
//       active: false,
//     },
//   ],
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "CREATE_USER":
//       return produce(state, (draft) => {
//         draft.users.push(action.user);
//       });
//     case "`TOGGLE_`USER":
//       return produce(state, (draft) => {
//         const user = draft.users.find((user) => user.id === action.id);
//         user.active = !user.active;
//       });
//     case "REMOVE_USER":
//       return produce(state, (draft) => {
//         const index = draft.users.findIndex((user) => user.id === action.id);
//         draft.users.splice(index, 1);
//       });
//     default:
//       return state;
//   }
// }

// // UserDispatch라는 이름으로 내보내준다.
// export const UserDispatch = React.createContext(null);

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const nextId = useRef(4);
//   const { users } = state;
//   const [{ username, email }, onChange, reset] = useInputs({
//     username: "",
//     email: "",
//   });

//   const onCreate = useCallback(() => {
//     dispatch({
//       type: "CREATE_USER",
//       user: {
//         id: nextId.current,
//         username,
//         email,
//       },
//     });
//     reset();
//     nextId.current += 1;
//   }, [username, email, reset]);

//   const count = useMemo(() => countActiveUsers(users), [users]);

//   return (
//     <UserDispatch.Provider value={dispatch}>
//       <CreateUser
//         username={username}
//         email={email}
//         onChange={onChange}
//         onCreate={onCreate}
//       />
//       <UserList users={users} />
//       <div>활성사용자 수 : {count}</div>
//     </UserDispatch.Provider>
//   );
// }

// export default App;

// // Context API를 사용한 전역 값 관리
// // 특정 함수를 특정 컴포넌트를 거쳐서 원하는 컴포넌트에게 전달하는 작업은 리액트로 개발을 하다보면 자주 발생 할 수 있는 작업임.
// // 그럴 땐, 리액트의 Context API 와 이전 섹션에서 배웠던 dispatch 를 함께 사용하면 이러한 복잡한 구조를 해결 할 수 있다.

// // 리액트의 Context API를 사용하면, 프로젝트 안에서 전역적으로 사용할 수 있는 값을 관리할 수 있다.
// // 예시 : const UserDispatch = React.createContext(null);

import React from "react";
import CheckBox from "./components/CheckBox";

function App() {
  const [check, setCheck] = React.useState(false);
  const onChange = (e) => {
    setCheck(e.target.checked);
  };
  return (
    <div>
      <CheckBox onChange={onChange} checked={check}>
        다음 약관에 모두 동의
      </CheckBox>
      <p>
        <b>check :</b>
        {check ? "true" : "false"}
      </p>
    </div>
  );
}

export default App;
