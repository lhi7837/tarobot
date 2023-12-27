/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const PickedCards = ({ choicedDeck }) => {
  return (
    <div className="choiced-container">
      {choicedDeck.map((card, index) => (
        <div key={index} className={"choiced-card box" + (index + 1)}>
          {card.choiced && (
            <div className="choiced-card-content">
              <img
                src={`/images/cards/${card.id}.svg`}
                alt={card.name}
                style={{
                  transform: card.front ? "rotate(0deg)" : "rotate(180deg)",
                }}
              />
              <div className="card-name">{card.name}</div>
              <div className="card-front">
                {card.front ? "정방향" : "역방향"}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PickedCards;
