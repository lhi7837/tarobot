/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import TarotDeckJson from "./tarot_deck.json";
import CardResult from "../components/CardResult";
import Cards from "./Cards";
import { format } from "date-fns"; // 추가
import { writeUserData } from "../api/UserDataService"; // 추가
import { useAuth } from "../api/AuthContext.js";
import PickedCards from "./PickedCards.js";

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
  const user = useAuth();
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [choicedDeck, setChoicedDeck] = useState([]);
  const [uid, setUid] = useState(""); // 추가
  const [initialShuffledDeck, setInitialShuffledDeck] = useState([]); // 추가

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 덱을 섞음
    const initialDeck = shuffleCards(TarotDeckJson.tarot_deck);
    setInitialShuffledDeck(initialDeck);
    setShuffledDeck(initialDeck);
    try {
      if (user.uid) {
        setUid(user.uid);
      }
    } catch (error) {
      console.error("user.uid 로딩 오류", error);
    }
  }, [user.uid]);

  const drawCard = (clickedIndex) => {
    if (choicedDeck.length < 7) {
      // 클릭한 카드의 정보 가져오기
      const drawnCard = shuffledDeck[clickedIndex];

      // 클릭한 카드를 choicedDeck에 추가
      setChoicedDeck([...choicedDeck, { ...drawnCard, choiced: true }]);

      // 클릭한 카드를 shuffledDeck에서 제거
      setShuffledDeck((prevDeck) =>
        prevDeck.filter((card, index) => index !== clickedIndex)
      );
    } else {
      // alert("카드를 더 이상 뽑을 수 없습니다.");
    }
  };

  useEffect(() => {
    if (choicedDeck.length === 7) {
      // 오늘 날짜 구하기
      const todayDate = format(new Date(), "yyyyMMdd");

      // uid/"오늘날짜"/ 경로에 데이터 저장
      const path = `${uid}/${todayDate}`;
      try {
        writeUserData(path, choicedDeck);
      } catch (error) {
        console.error("뽑은 카드 저장 오류", error);
      }
    }
  }, [choicedDeck]);

  return (
    <div>
      <h2>Tarot Card Shuffle</h2>
      {choicedDeck.length === 7 ? (
        <div className="tarot-result">
          <PickedCards choicedDeck={choicedDeck} />
          <CardResult choicedDeck={choicedDeck} />
        </div>
      ) : (
        <div>
          <div className="card-container">
            <div
              className="card-wrapper"
              style={{
                transform: `translateX(${-choicedDeck.length * 106}px)`,
                transition: `all 0.3s linear`,
              }}
            >
              {shuffledDeck.map((card, index) => (
                <Cards
                  key={index}
                  index={shuffledDeck.indexOf(card)}
                  drawCard={drawCard}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPick;
