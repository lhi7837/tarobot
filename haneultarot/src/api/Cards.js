/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import CardBack from "../images/cards/back.svg";

const Cards = ({ index, drawCard, isActive }) => {
  return (
    <div
      className={`card card_${index} ${isActive ? "active" : ""}`}
      style={{
        backgroundImage: `url(${CardBack})`,
      }}
      onClick={() => {
        drawCard(index);
      }}
    ></div>
  );
};

export default Cards;
