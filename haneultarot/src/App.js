import React, { useState } from "react";
import TarotTitle from "./components/Title";
import HelloTarot from "./components/Splash";
import StartTarot from "./pages/StartTarot";
import GoogleLogin from "./api/GoogleLogin";
import "./App.css";
import { AuthProvider } from "./api/AuthContext";

function App() {
  const [PageNumber, setPageNumber] = useState(0);
  const nextPage = () => {
    setPageNumber((page) => page + 1);
  };

  return (
    <AuthProvider>
      <div className="Tarobot">
        <div className="custom-button">
          {PageNumber === 0 ? (
            <div className="starting">
              <button className="next-button" onClick={nextPage}>
                시작하기
              </button>
              <GoogleLogin />
            </div>
          ) : null}
        </div>
        &nbsp;
        {PageNumber === 0 ? <TarotTitle /> : null}
        {PageNumber === 1 ? <HelloTarot /> : null}
        {PageNumber === 2 ? <StartTarot /> : null}
        {PageNumber === 3 ? <h1>페이지넘버3</h1> : null}
      </div>
    </AuthProvider>
  );
}

export default App;
