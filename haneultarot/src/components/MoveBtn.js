import React from "react";
import NextBtn from "../img/next_button.svg";
import PrevBtn from "../img/prev_button.svg";
import PropTypes from "prop-types";
// MoveBtn 컴포넌트에서 onClick 추가
const MoveBtn = ({ currentPage, maxPage, onClick }) => {
  return (
    <div>
      <div className="userInfoSubmit">
        <div className="custom-button">
          {currentPage <= maxPage && currentPage > 1 ? (
            <img
              src={PrevBtn}
              onClick={() => onClick(currentPage, "prev")}
              alt="prev button"
            />
          ) : null}
        </div>
        <div className="custom-button">
          {currentPage < maxPage && currentPage >= 0 ? (
            <img
              src={NextBtn}
              onClick={() => onClick(currentPage, "next")}
              alt="next button"
            />
          ) : null}
        </div>
      </div>
      <div className="custom-button">
        {currentPage === maxPage ? (
          <button
            onClick={() => onClick(currentPage, "submit")}
            alt="tarot-start-button"
          >
            타로보러가기
          </button>
        ) : null}
      </div>
    </div>
  );
};

MoveBtn.propTypes = {
  currentPage: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MoveBtn;
