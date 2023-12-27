import React, { useEffect, useState } from "react";
import Gemini from "../api/Gemini";
import { readUserDataOnce } from "../api/UserDataService";
import { useAuth } from "../api/AuthContext";

const CardResult = () => {
  const [userInfo, setUserInfo] = useState(null);
  const user = useAuth(); // useAuth() 함수 호출을 통해 사용자 정보를 얻습니다.

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await readUserDataOnce(user.uid);
        setUserInfo(userData);
      } catch (error) {
        console.error("유저 정보 불러오기 에러:", error);
      }
    };

    fetchUserInfo();
  }, [user]); // useEffect의 dependency 배열에 user를 추가하여 해당 값이 변경될 때마다 실행되도록 합니다.

  return (
    <div>
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
