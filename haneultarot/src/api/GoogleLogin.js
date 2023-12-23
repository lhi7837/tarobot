import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { app, database, auth } from "../firebase.js";

function GoogleLogin() {
  const [userData, setUserData] = useState(null);

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data); // console로 들어온 데이터 표시
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {userData ? (
        userData.email + "님 환영합니다."
      ) : (
        <button onClick={handleGoogleLogin} className="loginBtn">
          구글 Login
        </button>
      )}
    </div>
  );
}

export default GoogleLogin;
