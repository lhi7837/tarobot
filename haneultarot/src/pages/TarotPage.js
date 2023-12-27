import React from "react";
import { useParams } from "react-router-dom";
import CardPick from "../api/CardPick"; // CardPick 컴포넌트 파일 경로에 따라 수정

const TarotPage = () => {
  const { option } = useParams();
  const optionMap = {
    love: "애정운",
    money: "금전운",
    business: "직장운",
    job: "취업운",
  };

  return (
    <div className="tarot-page-container">
      <h1>카드 뽑기</h1>
      <h2>
        안녕하세요. 오늘은 {optionMap[option]}에 대해 타로점을 봐드릴게요.
      </h2>
      <hr />
      <div className="selected-card-container">
        <CardPick />
      </div>
    </div>
  );
};

export default TarotPage;
