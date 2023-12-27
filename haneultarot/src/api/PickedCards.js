/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const PickedCards = ({ choicedDeck }) => {
  return (
    <div className="choiced-container">
      {choicedDeck.map((card, index) => (
        <div key={index} className={"choiced-card box" + index}>
          {card.choiced && (
            <div className="choiced-card-content">
              <img
                src={`/images/cards/${card.id}.svg`}
                alt={card.name}
                style={{
                  width: "200px",
                  height: "auto",
                  transform: card.front ? "rotate(0deg)" : "rotate(180deg)",
                }}
              />
              <div className="card-name">{card.name}</div>
              <div className="card-front">
                카드방향: {card.front ? "앞면" : "뒷면"}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PickedCards;
