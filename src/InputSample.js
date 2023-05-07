import React from "react";

function InputSample() {
  const [text, setText] = React.useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div>
      <input />
      <button>초기화</button>
      <div>
        <b>값 : </b>
      </div>
    </div>
  );
}

export default InputSample;
