import React, { useState } from "react";

const StartTarot = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCard, setShowCard] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowCard(true);
    // 여기에서 실제로 API를 호출하거나, 로컬 데이터를 이용해 카드 이미지를 가져오는 로직을 추가할 수 있습니다.
  };

  const handleShowTodayCard = () => {
    // 오늘의 카드를 보여주는 로직을 추가할 수 있습니다.
  };

  return (
    <div className="tarot-container">
      <h1>무엇이 고민인가요?</h1>
      <h2>보고싶은 점괘를 선택해주세요.</h2>

      <div className="button-container">
        <button onClick={() => handleOptionSelect("애정운")}>애정운</button>
        <button onClick={() => handleOptionSelect("금전운")}>금전운</button>
        <button onClick={() => handleOptionSelect("직장운")}>직장운</button>
        <button onClick={() => handleOptionSelect("취업운")}>취업운</button>
      </div>

      {showCard && (
        <div className="card-image-container">
          {/* 여기에 선택된 옵션에 맞는 카드 이미지를 보여주는 로직을 추가하세요. */}
          <img
            src={`images/${selectedOption}.jpg`}
            alt={`${selectedOption} 카드`}
          />
        </div>
      )}

      <button onClick={handleShowTodayCard}>오늘의 카드</button>
    </div>
  );
};

export default StartTarot;
