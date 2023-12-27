import React, { useEffect, useState } from "react";
import Gemini from "../api/Gemini";
import { readUserDataOnce } from "../api/UserDataService";
import { useAuth } from "../api/AuthContext";
import { useParams } from "react-router-dom"; // useParams 추가

const CardResult = () => {
  const [userInfo, setUserInfo] = useState(null);
  const user = useAuth(); // useAuth() 함수 호출을 통해 사용자 정보를 얻습니다.
  const { option } = useParams(); // useParams로 URL 파라미터 읽어오기

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { todayData, userInfo } = await readUserDataOnce(
          user.uid,
          option
        );
        const userData = { todayData, userInfo };
        console.log("userData:", userData);
        setUserInfo(userData);
      } catch (error) {
        console.error("유저 정보 불러오기 에러:", error);
      }
    };

    fetchUserInfo();
  }, [user]);

  return (
    <div>
      <h1>전체 카드 리딩</h1>
      <h2>오늘 뽑으신 카드를 리딩해드리겠습니다.</h2>
      <div className="gemini-result">
        {userInfo ? (
          <Gemini geminiProps={userInfo} />
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default CardResult;
