/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Create a new file, e.g., Card.js
import CardBack from "../images/cards/back.svg";

import React, { useState, useEffect } from "react";

const Cards = ({ index, drawCard }) => {
  return (
    <div
      className={"card card_" + index}
      style={{
        backgroundImage: `url(${CardBack})`,
        color: "white",
      }}
      onClick={() => {
        drawCard(index);
      }}
    ></div>
  );
};

export default Cards;
