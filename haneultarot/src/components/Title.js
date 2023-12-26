import React, { useEffect, useState } from "react";
import mainLogo from "../img/main_logo.svg";
import GoogleLogin from "../api/GoogleLogin";
import { Link } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
import { readUserDataOnce } from "../api/UserDataService";

const TarotTitle = () => {
  const authUser = useAuth();
  const [emailExists, setEmailExists] = useState(false);

  useEffect(() => {
    // authUser가 존재하고, email이 존재하는 경우에만 RTDB를 확인
    if (authUser && authUser.email) {
      const userId = authUser.uid;

      // RTDB에서 해당 유저의 데이터를 읽어옴
      readUserDataOnce(userId)
        .then((userData) => {
          // userData가 존재하는 경우 email이 존재하는 것으로 간주
          setEmailExists(!!userData?.email);
        })
        .catch((error) => {
          console.error("Error reading data from Firebase:", error);
        });
    }
  }, [authUser]);

  return (
    <div>
      <div className="title">
        <img className="main_logo" alt="sun1 with sky" src={mainLogo} />
        <h1 className="main_title">하늘타로</h1>
      </div>
      <div className="userInfoSubmit">
        <div className="custom-button">
          {emailExists ? (
            <div>
              <Link to="/start">바로 시작하기</Link>
            </div>
          ) : (
            <div>
              <Link to="/hello">시작하기</Link>
            </div>
          )}
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default TarotTitle;
