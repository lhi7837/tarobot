import React, { useState, useEffect } from "react";
import TarotDeckJson from "./tarot_deck.json";
import CardBack from "../images/cards/back.svg";
const shuffleCards = (cards) => {
  // 카드를 섞는 함수
  let shuffledCards = [...cards];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }

  // 각 카드에 대해 front 속성을 랜덤으로 true 또는 false로 설정
  shuffledCards = shuffledCards.map((card) => ({
    ...card,
    front: Math.random() < 0.5, // 50% 확률로 true 또는 false
  }));

  return shuffledCards;
};

const RandomCard = () => {
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);
  const tarotDeck = TarotDeckJson.tarot_deck;

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 덱을 섞음
    setShuffledDeck(shuffleCards(tarotDeck));
  }, []); // 두 번째 매개변수로 빈 배열을 전달하여 처음 마운트될 때만 호출되도록 함

  const drawCard = () => {
    // 클릭한 div의 인덱스에 해당하는 카드를 drawnCards에 추가
    if (shuffledDeck.length > 0) {
      const [drawnCard, ...remainingDeck] = shuffledDeck;
      setDrawnCards([...drawnCards, drawnCard]);
      setShuffledDeck(remainingDeck);
      alert(drawnCard.name + " 카드를 뽑았습니다.");
    } else {
      alert("덱에 더 이상 카드가 없습니다.");
    }
  };

  return (
    <div>
      <h2>Tarot Card Shuffle</h2>
      <img src={CardBack} alt="card" />
      <div className="card-container">
        {shuffledDeck.map((card, index) => (
          <div
            key={index}
            className="card"
            style={{
              backgroundImage: `url(${CardBack})`,
              backgroundSize: "cover",
              transform: card.front ? "rotateY(0deg)" : "rotateY(180deg)", // 앞면은 0도, 뒷면은 180도 회전
              width: "200px",
              height: "300px",
              cursor: "pointer",
            }}
            onClick={() => drawCard(index)}
          >
            {drawnCards.length > index && (
              <div className="card-name">{drawnCards[index].name}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomCard;
