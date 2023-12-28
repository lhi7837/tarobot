/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Gemini from "../api/Gemini";
import { readUserDataOnce } from "../api/UserDataService";
import { useAuth } from "../api/AuthContext";
import { useParams } from "react-router-dom"; // useParams 추가

// CardResult 컴포넌트에서 result를 받을 때 result 속성을 직접 추출하여 사용
const CardResult = ({ result, choicedDeck }) => {
  const [geminiProps, setGeminiProps] = useState(null);
  const user = useAuth();
  const { option } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 만약 choicedDeck이 없고 result 존재하면 유저 정보를 불러오기
        const { todayData, userInfo } = await readUserDataOnce(
          user.uid,
          option
        );
        if (choicedDeck) {
          // 만약 choicedDeck이 전달되면 실행
          const userData = { choicedDeck, userInfo };
          setGeminiProps(userData);
        } else if (result) {
          const userData = { todayData, userInfo };
          setGeminiProps(userData);
        }
      } catch (error) {
        console.error("유저 정보 불러오기 에러:", error);
      }
    };

    fetchUserInfo();
  }, [user]);

  return (
    <div>
      <h1>전체 카드 리딩</h1>
      <h2>뽑으신 카드를 바탕으로 오늘의 운세를 리딩해드리겠습니다.</h2>
      <div className="gemini-result">
        {result ? (
          // result가 문자열이라면 그대로 전달
          <div>
            <h2>*오늘의 결과가 있어 불러옵니다.*</h2>
            <div dangerouslySetInnerHTML={{ __html: result }}></div>
          </div>
        ) : geminiProps ? (
          <Gemini geminiProps={geminiProps} />
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default CardResult;
