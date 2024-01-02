import React, { useEffect, useState } from "react";
import mainLogo from "../images/ico.svg";
import GoogleLogin from "../api/GoogleLogin";
import { Link } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import { readUserDataOnce } from "../api/UserDataService";

const TarotTitle = () => {
  const authUser = useAuth();
  const [emailExists, setEmailExists] = useState(false);
  const userId = authUser?.uid;

  useEffect(() => {
    // authUser의 email이 존재하는 경우에만 RTDB를 확인
    if (authUser && authUser.email) {
      const fetchData = async () => {
        try {
          const { userInfo } = await readUserDataOnce(userId);
          // userData가 존재하고 email이 존재하는 경우
          if (userInfo && userInfo.email) {
            setEmailExists(true);
          } else {
            // userData가 존재하지 않거나 email이 존재하지 않는 경우
            setEmailExists(false);
          }
        } catch (error) {
          console.error("Error reading data from Firebase:", error);
        }
      };
      // fetchData 함수 호출
      fetchData();
    }
  }, [authUser, emailExists]);

  return (
    <div className="title-page">
      <div className="title">
        <img className="main_logo" alt="하늘타로 로고" src={mainLogo} />
        <h1 className="main_title">하늘타로</h1>
      </div>
      <div className="userInfoSubmit">
        <div className="custom-button">
          {userId ? (
            emailExists ? (
              <Link to="/start">바로 시작하기</Link>
            ) : (
              <Link to="/start/input">시작하기</Link>
            )
          ) : (
            "상단 Google 로그인 버튼을 통해 로그인하셔야 시작이 가능합니다."
          )}
        </div>
      </div>
    </div>
  );
};

export default TarotTitle;
