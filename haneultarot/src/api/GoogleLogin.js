import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth } from "../firebase.js";
import { useAuth } from "./AuthContext.js";

function GoogleLogin() {
  const authUser = useAuth();
  function handleGoogleLogin() {
    signInWithPopup(auth, new GoogleAuthProvider()) // popup을 이용한 signup
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {authUser ? (
        <div>
          <div className="loginState">{authUser.email + "님 환영합니다."}</div>
        </div>
      ) : (
        <div onClick={handleGoogleLogin} className="loginBtn">
          구글 Login
        </div>
      )}
    </div>
  );
}

export default GoogleLogin;
