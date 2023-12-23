import React from "react";
import NextBtn from "../img/next_button.svg";
import PrevBtn from "../img/prev_button.svg";

// MoveBtn 컴포넌트에서 onClick 추가
const MoveBtn = ({ currentPage, maxPage, onClick }) => {
  return (
    <div>
      <div>
        {currentPage > 0 ? (
          <img
            className="custom-button"
            src={PrevBtn}
            onClick={() => onClick(currentPage, "prev")}
            alt="prev button"
          />
        ) : null}
      </div>
      <div>
        {currentPage < maxPage && currentPage >= 0 ? (
          <img
            className="custom-button"
            src={NextBtn}
            onClick={() => onClick(currentPage, "next")}
            alt="next button"
          />
        ) : null}
      </div>
      <div>
        {currentPage === maxPage ? (
          <div
            className="custom-button"
            onClick={() => onClick(currentPage, "submit")}
            alt="submit button"
          >
            타로보러가기
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MoveBtn;
