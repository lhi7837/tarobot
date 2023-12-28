/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import TarotDeckJson from "./tarot_deck.json";
import CardResult from "../components/CardResult";
import Cards from "./Cards";
import { format } from "date-fns";
import { writeTarotData, readTarotResultData } from "../api/UserDataService";
import { useAuth } from "../api/AuthContext.js";
import PickedCards from "./PickedCards.js";
import { useParams } from "react-router-dom";

const shuffleCards = (cards) => {
  let shuffledCards = [...cards];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }

  shuffledCards = shuffledCards.map((card) => ({
    ...card,
    choiced: false,
  }));

  shuffledCards = shuffledCards.map((card) => ({
    ...card,
    front: Math.random() < 0.5,
  }));

  return shuffledCards;
};

const CardPick = () => {
  const { option } = useParams();
  const user = useAuth();
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [choicedDeck, setChoicedDeck] = useState([]);
  const [uid, setUid] = useState("");
  const [initialShuffledDeck, setInitialShuffledDeck] = useState([]);
  const [hasTarotResultData, setHasTarotResultData] = useState(null);
  const [hasTarotData, setHasTarotData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { resultData, cardsData } = await readTarotResultData(
          user.uid,
          option
        );
        if (cardsData && resultData) {
          setHasTarotResultData(resultData);
          setHasTarotData(cardsData);
        } else {
          console.log("불러올 수 있는 데이터가 없음");
          // result가 없는 경우에 대한 처리 추가
        }
      } catch (error) {
        console.error("Error fetching tarot result data:", error);
      }
    };
    fetchData();
  }, [user.uid, option]);

  useEffect(() => {
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
      const drawnCard = shuffledDeck[clickedIndex];
      setChoicedDeck([...choicedDeck, { ...drawnCard, choiced: true }]);
      setShuffledDeck((prevDeck) =>
        prevDeck.filter((card, index) => index !== clickedIndex)
      );
    }
  };

  useEffect(() => {
    if (choicedDeck.length === 7) {
      try {
        // 뽑은 카드 저장
        writeTarotData(user.uid, option, choicedDeck);
      } catch (error) {
        console.error("뽑은 카드 저장 오류", error);
      }
    }
  }, [choicedDeck, uid, option, hasTarotResultData]);

  return (
    <div>
      {hasTarotResultData ? (
        // hasTarotResultData가 있을 때의 렌더링
        <div className="tarot-result">
          <CardResult result={hasTarotResultData} />
          <PickedCards choicedDeck={hasTarotData} />
        </div>
      ) : (
        // hasTarotResultData가 없을 때의 렌더링
        <div>
          {choicedDeck.length === 7 ? (
            // choicedDeck의 길이가 7일 때의 렌더링
            <div className="tarot-result">
              <CardResult choicedDeck={choicedDeck} />
              <PickedCards choicedDeck={choicedDeck} />
            </div>
          ) : (
            // choicedDeck의 길이가 7이 아닐 때의 렌더링
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
          )}
        </div>
      )}
    </div>
  );
};

export default CardPick;
