import React, { useState, useEffect } from "react";
import "./App.css";

const ComponentB = () => {
  const [text, setText] = useState("안녕하세요!");

  useEffect(() => {
    const customButton = document.querySelector(".custom-button");
    if (customButton) {
      customButton.style.display = "none";
    }
  }, []);

  useEffect(() => {
    const helloText = document.querySelector(".start_hello");
    const timeout1 = setTimeout(() => {
      helloText.classList.add("fade-out"); // fade-out 클래스 추가
    }, 0);
    const timeout2 = setTimeout(() => {
      helloText.classList.remove("fade-out"); // fade-out 클래스 제거
      setText("다른 글자로!"); // 텍스트 변경
    }, 1000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      helloText.classList.remove("fade-out"); // Cleanup 시 fade-out 클래스 제거
    };
  }, []);

  return <div className="start_hello">{text}</div>;
};

export default ComponentB;
