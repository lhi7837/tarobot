import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../api/AuthContext.js";
import PastTarot from "../components/PastTarot";

const MyPage = () => {
  const authUser = useAuth();
  const [showPastTarot, setShowPastTarot] = useState(false);

  const handlePastTarotClick = () => {
    setShowPastTarot(true);
  };

  const handleGoBackClick = () => {
    setShowPastTarot(false);
  };

  return (
    <div>
      {showPastTarot ? (
        <div>
          <div className="custom-button">
            <a onClick={handleGoBackClick}>돌아가기</a>
          </div>
          <PastTarot />
        </div>
      ) : (
        <div>
          <h1>마이페이지</h1>
          <h2>
            안녕하세요. {authUser != null ? authUser.email : "사용자"}님. 무슨
            일로 하늘타로를 찾아주셨나요?
          </h2>
          <div className="user-info">
            <ul className="custom-button">
              <li>
                <Link to="/start">카드뽑기</Link>
              </li>
              <li>
                <a onClick={handlePastTarotClick}>과거 기록 보기</a>
              </li>
              <li>
                <Link to="/hello">내 정보 수정</Link>
              </li>
              <li>
                <a onClick={() => alert("아직 개발중입니다.")}>오늘의 카드</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
