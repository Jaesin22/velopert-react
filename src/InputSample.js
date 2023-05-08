import React from "react";

function InputSample() {
  const [text, setText] = React.useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };
  const onReset = () => setText("");
  return (
    <div>
      <input onChange={onChange} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값 : {text}</b>
      </div>
    </div>
  );
}

export default InputSample;
