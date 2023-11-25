import React, { useState } from "react";

const TarotDataInput = ({ pageNumber, onPrev, onNext }) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <p>{`${pageNumber}/4`}</p>
      </div>
      <div style={{ textAlign: "center", margin: "20px" }}>
        <p>당신의 이름을 알려주세요.</p>
        <input type="text" value={inputText} onChange={handleInputChange} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onPrev}>⬅️</button>
        <button onClick={onNext}>➡️</button>
      </div>
    </div>
  );
};

export default TarotDataInput;
