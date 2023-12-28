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
    // authUser가 존재하고, email이 존재하는 경우에만 RTDB를 확인
    if (authUser && authUser.email) {
      const fetchData = async () => {
        try {
          const { userInfo } = await readUserDataOnce(userId);
          // userData가 존재하는 경우 email이 존재하는 것으로 간주
          setEmailExists(!!userInfo?.email);
        } catch (error) {
          console.error("Error reading data from Firebase:", error);
        }
      };

      // fetchData 함수 호출
      fetchData();
    }
  }, [userId, emailExists]);

  return (
    <div className="title-page">
      <div className="title">
        <img className="main_logo" alt="sun1 with sky" src={mainLogo} />
        <h1 className="main_title">하늘타로</h1>
      </div>
      <div className="userInfoSubmit">
        <div className="custom-button">
          {emailExists ? (
            <Link to="/start">바로 시작하기</Link>
          ) : (
            "상단 Google 로그인 버튼을 통해 로그인하셔야 시작이 가능합니다."
          )}
        </div>
      </div>
    </div>
  );
};

export default TarotTitle;
