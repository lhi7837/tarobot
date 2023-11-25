import React, { useState } from "react";
import ComponentA from "./ComponentA";
import ComponentB from "./ComponentB";
import "./App.css";

function App() {
  const [showComponentA, setShowComponentA] = useState(true);

  const toggleComponent = () => {
    setShowComponentA((prev) => !prev);
  };

  return (
    <div className="Tarobot">
      <button className="custom-button" onClick={toggleComponent}>
        시작하기
      </button>
      &nbsp;
      {showComponentA ? <ComponentA /> : <ComponentB />}
    </div>
  );
}

export default App;
