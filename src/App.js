import React, { useRef, useState, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveusers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  }, []);

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: true,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ]);
  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers([...users, user]);
    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  }, [users, username, email]);

  const onRemove = useCallback((id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);

  const count = useMemo(() => countActiveusers(users), [users]);

  return (
    <div>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수 : " {count}</div>
    </div>
  );
}

export default App;

// React.memo 를 사용한 컴포넌트 리렌더링 방지
// 사용방법 : (1) export default React.memo(함수);
// (2) const User = React.memo(function User({ user, onRemove, onToggle }) {

// User 리랜더링 막기
// User 중 하나라도 수정하면 모든 User 들이 리렌더링되고, CreateUser 도 리렌더링이 된다.
// 이유는 users 배열이 바뀔때마다 onCreate 도 새로 만들어지고, onToggle,onRemove 도 새로 만들어지기 때문
// deps 에 users 가 들어있기 때문에 배열이 바뀔때마다 함수가 새로 만들어지는건, 당연
// 함수형 업데이트를 하게 되면 setUsers 에 등록하는 콜백함수의 파라미터에서 최신 users 를 참조 할 수 있기 때문에 deps 에 users 를 넣지 않아도 됨
