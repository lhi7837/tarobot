import React from "react";
import { Routes, Route } from "react-router-dom";
import TarotTitle from "./components/Title";
import HelloTarot from "./components/Splash";
import StartTarot from "./pages/StartTarot";
import MyPage from "./pages/MyPage";
import TarotPage from "./pages/TarotPage.js";
import "./App.css";
import { AuthProvider } from "./api/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="Tarobot">
        <Routes>
          <Route path="/" element={<TarotTitle />} />
          <Route path="/hello" element={<HelloTarot />} />
          <Route path="/start" element={<StartTarot />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/tarot/:option" element={<TarotPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
