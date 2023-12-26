import React, { useState, useEffect } from "react";
import TarotDeckJson from "./tarot_deck.json";
import CardBack from "../images/cards/back.svg";
import CardResult from "../components/CardResult";
import { format } from "date-fns"; // 추가
import { writeUserData } from "../api/UserDataService"; // 추가
import { useAuth } from "../api/AuthContext.js";

const shuffleCards = (cards) => {
  // 카드를 섞는 함수
  let shuffledCards = [...cards];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }

  // 각 카드에 대해 choiced 속성을 false로 초기화
  shuffledCards = shuffledCards.map((card) => ({
    ...card,
    choiced: false,
  }));
  // 각 카드에 대해 front 속성을 랜덤으로 true 또는 false로 초기화
  shuffledCards = shuffledCards.map((card) => ({
    ...card,
    front: Math.random() < 0.5, // 50% 확률로 true 또는 false
  }));

  return shuffledCards;
};

const CardPick = () => {
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [choicedDeck, setChoicedDeck] = useState([]);
  const [uid, setUid] = useState(""); // 추가

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 덱을 섞음
    setShuffledDeck(shuffleCards(TarotDeckJson.tarot_deck));
    const user = useAuth.currentUser;
    if (user) {
      setUid(user.uid);
    }
  }, []);

  const drawCard = () => {
    // 클릭한 div의 인덱스에 해당하는 카드를 choicedDeck에 추가하고, choiced 속성을 true로 변경
    if (shuffledDeck.length > 0 && choicedDeck.length < 7) {
      const [drawnCard, ...remainingDeck] = shuffledDeck;
      setChoicedDeck([...choicedDeck, { ...drawnCard, choiced: true }]);
      setShuffledDeck(remainingDeck);
    } else {
      alert("카드를 더 이상 뽑을 수 없습니다.");
    }
  };
  useEffect(() => {
    if (choicedDeck.length === 7) {
      // 오늘 날짜 구하기
      const todayDate = format(new Date(), "yyyyMMdd");

      // uid/"오늘날짜"/ 경로에 데이터 저장
      const path = `${uid}/${todayDate}`;
      writeUserData(path, choicedDeck);
    }
  }, [choicedDeck, uid]);

  return (
    <div>
      <h2>Tarot Card Shuffle</h2>
      {choicedDeck.length === 7 ? (
        <CardResult choicedDeck={choicedDeck} />
      ) : (
        <div>
          <div className="card-container">
            {shuffledDeck.map((card, index) => (
              <div
                key={index}
                className="card"
                style={{
                  backgroundImage: `url(${CardBack})`,
                  backgroundSize: "cover",
                  width: "200px",
                  height: "300px",
                  cursor: "pointer",
                }}
                onClick={() => drawCard(index)}
              ></div>
            ))}
          </div>
          <div className="choiced-container">
            {choicedDeck.map((card, index) => (
              <div
                key={index}
                className="choiced-card"
                style={{
                  background: "red",
                  backgroundSize: "cover",
                  width: "200px",
                  height: "300px",
                }}
              >
                {card.choiced && (
                  <div
                    className="choiced-card"
                    style={{ transform: card.front ? 0 : 180 }}
                  >
                    <div className="card-name">{card.name}</div>
                    <div className="card-front">
                      카드방향: {card.front ? "앞면" : "뒷면"}{" "}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPick;
