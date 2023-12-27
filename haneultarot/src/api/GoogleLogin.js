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
          <p>{authUser.email + "님 환영합니다."}</p>
          <button onClick={() => auth.signOut()}>로그아웃</button>
        </div>
      ) : (
        <button onClick={handleGoogleLogin} className="loginBtn">
          구글 Login
        </button>
      )}
    </div>
  );
}

export default GoogleLogin;
