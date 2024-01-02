import React from "react";
import { Routes, Route } from "react-router-dom";
import TarotTitle from "./components/Title";
import HelloTarot from "./components/Splash";
import StartTarot from "./pages/StartTarot";
import MyPage from "./pages/MyPage";
import TarotPage from "./pages/TarotPage.js";
import Header from "./components/Header.js";
import Splash from "./components/Splash.js";
import "./App.css";
import { AuthProvider } from "./api/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Header />
      <div className="Tarobot">
        <Routes>
          <Route path="/" element={<TarotTitle />} />
          <Route path="/hello" element={<HelloTarot />} />
          <Route path="/start" element={<StartTarot />} />
          <Route path="/start/input" element={<Splash />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/tarot/:option" element={<TarotPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
