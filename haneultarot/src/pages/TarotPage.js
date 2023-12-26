import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardPick from "../api/CardPick"; // CardPick 컴포넌트 파일 경로에 따라 수정

const TarotPage = () => {
  const { option } = useParams();
  const [selectedCard, setSelectedCard] = useState(null);
  const optionMap = {
    love: "애정운",
    money: "금전운",
    business: "직장운",
    job: "취업운",
  };
  useEffect(() => {
    // 여기에서 선택된 운에 따라 API 호출 또는 로컬 데이터를 이용해 카드를 가져오는 로직을 추가할 수 있습니다.
    // 예시로 CardPick 컴포넌트에서 사용할 임시 데이터를 생성하겠습니다.
    const temporaryCardData = {
      id: 0,
      name: "Temporary Card",
      type: "Major Arcana",
      front: true,
    };
    setSelectedCard(temporaryCardData);
  }, [option]);

  return (
    <div className="tarot-page-container">
      <h1>당신이 선택한 운은 {optionMap[option]}입니다.</h1>

      {selectedCard && (
        <div className="selected-card-container">
          <h2>선택된 카드</h2>
          <CardPick card={selectedCard} />
        </div>
      )}

      <p>공통적으로 나타나는 내용이 있다면 이 곳에 추가할 수 있습니다.</p>
    </div>
  );
};

export default TarotPage;
