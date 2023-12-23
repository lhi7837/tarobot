import React, { useState, useEffect, Suspense } from "react";
import TarotDataInput from "../pages/TarotDataInput";

const HelloTarot = () => {
  const [text, setText] = useState("안녕하세요!");

  useEffect(() => {
    const helloText = document.querySelector(".start_hello");
    const timeout1 = setTimeout(() => {
      helloText.classList.add("fade-out"); // fade-out 클래스 추가
    }, 0);
    const timeout2 = setTimeout(() => {
      helloText.classList.remove("fade-out"); // fade-out 클래스 제거
      setText(null);
    }, 1000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      helloText.classList.remove("fade-out"); // Cleanup 시 fade-out 클래스 제거
    };
  }, []);

  return (
    <div>
      {text ? (
        <div className="start_hello">{text}</div>
      ) : (
        // Suspense를 사용하여 동적으로 불러온 컴포넌트가 준비될 때까지 기다립니다.
        <Suspense fallback={<div>Loading...</div>}>
          <TarotDataInput />
        </Suspense>
      )}
    </div>
  );
};

export default HelloTarot;
