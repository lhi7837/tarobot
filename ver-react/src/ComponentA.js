// ComponentA.js
import React, { useState } from "react";

const ComponentA = ({ onButtonClick }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    // ComponentA에서 버튼 클릭 시, 부모 컴포넌트에서 전달받은 콜백 함수 호출
    onButtonClick(inputValue);
  };

  return (
    <div>
      <div className="title">
        <img
          className="main_logo"
          alt="sun1 with sky"
          src="img/main_logo.svg"
        />
        <h1 className="main_title">하늘타로</h1>
      </div>
    </div>
  );
};

export default ComponentA;
