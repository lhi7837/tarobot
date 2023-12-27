/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const StartTarot = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCard, setShowCard] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowCard(true);
    // 여기에서 실제로 API를 호출하거나, 로컬 데이터를 이용해 카드 이미지를 가져오는 로직을 추가할 수 있습니다.
  };

  return (
    <div className="tarot-container">
      <h1>무엇이 고민인가요?</h1>
      <h2>보고싶은 점괘를 선택해주세요.</h2>

      <div className="custom-button">
        {/* Link 컴포넌트를 사용하여 선택된 점괘에 대한 동적인 URL 생성 */}
        <Link to="/tarot/love" onClick={() => handleOptionSelect("애정운")}>
          애정운
        </Link>
        <Link to="/tarot/money" onClick={() => handleOptionSelect("금전운")}>
          금전운
        </Link>
        <Link to="/tarot/business" onClick={() => handleOptionSelect("직장운")}>
          직장운
        </Link>
        <Link to="/tarot/job" onClick={() => handleOptionSelect("취업운")}>
          취업운
        </Link>
      </div>
    </div>
  );
};

export default StartTarot;
