import React, { useState } from "react";
import TarotTitle from "./components/Title";
import HelloTarot from "./components/Splash";
import StartTarot from "./pages/StartTarot";
import "./App.css";

function App() {
  const [PageNumber, setPageNumber] = useState(0);
  const nextPage = () => {
    setPageNumber((page) => page + 1);
  };

  return (
    <div className="Tarobot">
      <div className="custom-button">
        {PageNumber === 0 ? (
          <button className="next-button" onClick={nextPage}>
            시작하기
          </button>
        ) : null}
      </div>
      &nbsp;
      {PageNumber === 0 ? <TarotTitle /> : null}
      {PageNumber === 1 ? <HelloTarot /> : null}
      {PageNumber === 2 ? <StartTarot /> : null}
      {PageNumber === 3 ? <h1>페이지넘버3</h1> : null}
    </div>
  );
}

export default App;
