// 메인 로고 시작페이지.js
import React from "react";
import mainLogo from "../img/main_logo.svg";
const TarotTitle = () => {
  return (
    <div>
      <div className="title">
        <img className="main_logo" alt="sun1 with sky" src={mainLogo} />
        <h1 className="main_title">하늘타로</h1>
      </div>
    </div>
  );
};

export default TarotTitle;
