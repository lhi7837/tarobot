import React, { useState } from "react";
import MainTarot from "./components/main";
import HelloTarot from "./components/hello";
import "./App.css";

function App() {
  const [ShowMainTarot, setShowMainTarot] = useState(true);

  const toggleComponent = () => {
    setShowMainTarot((prev) => !prev);
  };

  return (
    <div className="Tarobot">
      <button className="custom-button" onClick={toggleComponent}>
        시작하기
      </button>
      &nbsp;
      {ShowMainTarot ? <MainTarot /> : <HelloTarot />}
    </div>
  );
}

export default App;