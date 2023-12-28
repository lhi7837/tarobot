import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../api/AuthContext";
const Header = () => {
  const authUser = useAuth();

  return (
    <header>
      <div className="login-info">
        {authUser ? `로그인 아이디: ${authUser.email}` : "-계정정보 로딩중-"}
      </div>

      <div>
        <nav>
          <ul className="custom-button">
            <li>
              <Link to="/">Main Page</Link>
            </li>
            <li>
              <Link to="/start">Start Page</Link>
            </li>
            <li>
              <Link to="/mypage">My Page</Link>
            </li>
            <li>
              <a onClick={() => window.history.back()}>Back</a>
            </li>
            {authUser ? (
              <li>
                <a onClick={() => useAuth.signOut()}>로그아웃</a>
              </li>
            ) : (
              <li>구글로그인필요</li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
