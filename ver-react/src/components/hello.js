import React, { useState, useEffect, lazy, Suspense } from "react";

const TarotDataInput = lazy(() => import("./datainput"));

const HelloTarot = () => {
  const [text, setText] = useState("안녕하세요!");
  const [currentPage, setCurrentPage] = useState(1);

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
      // setText("다른 글자로!"); // 텍스트 변경

      // 새로운 컴포넌트를 불러오기
      setText(null);
    }, 1000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      helloText.classList.remove("fade-out"); // Cleanup 시 fade-out 클래스 제거
    };
  }, []);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, 4));
  };

  return (
    <div>
      {text ? (
        <div className="start_hello">{text}</div>
      ) : (
        // Suspense를 사용하여 동적으로 불러온 컴포넌트가 준비될 때까지 기다립니다.
        <Suspense fallback={<div>Loading...</div>}>
          <TarotDataInput
            pageNumber={currentPage}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
          />
        </Suspense>
      )}
    </div>
  );
};

export default HelloTarot;
