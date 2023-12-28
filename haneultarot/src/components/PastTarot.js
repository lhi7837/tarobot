/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { readUserDataExceptUserInfo } from "../api/UserDataService";
import { useAuth } from "../api/AuthContext.js";

const PastTarot = () => {
  const [tarotData, setTarotData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const authUser = useAuth();
  const [isSetTarotData, setIsSetTarotData] = useState(false);
  useEffect(() => {
    // Firebase에서 데이터를 가져오는 함수
    const fetchData = async () => {
      // 사용자 ID 가져오기
      const userId = authUser.uid;
      try {
        if (!isSetTarotData) {
          const data = await readUserDataExceptUserInfo(userId);
          // 중복된 데이터가 없으면 상태에 추가
          if (
            !tarotData.some(
              (existingData) => existingData.option === data.option
            )
          ) {
            await setTarotData((prev) => [...prev, data]);
          }
          setIsSetTarotData(true);
        }
      } catch (error) {
        console.error("Error fetching tarot data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOptionClick = (option) => {
    // 대분류(운세 종류)를 클릭했을 때 호출되는 함수
    setSelectedOption(option);
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    // 소분류(날짜)를 클릭했을 때 호출되는 함수
    setSelectedDate(date);
  };

  return (
    <div className="tarot-page-container">
      <h1>내 과거 타로 보기</h1>
      <hr />

      <div className="past-tarot-result">
        {tarotData.map((categoryData) => {
          // categoryData는 { "love": {...}, "job": {...}, "business": {...}, "money": {...} } 형태의 객체
          return Object.entries(categoryData).map(
            ([category, categoryDetails]) => (
              <div key={category}>
                <h2>{category} 운세</h2>
                {Object.entries(categoryDetails).map(([date, dateDetails]) => (
                  <div key={date}>
                    <h3>{date} 운세</h3>
                    {/* dateDetails에는 cards와 result 등이 있으므로 원하는대로 활용 */}
                    <ul>
                      {dateDetails.cards.map((card) => (
                        <li key={card.id}>
                          {card.name} - {card.type}
                          {card.front ? "(정방향)" : "(역방향)"}
                        </li>
                      ))}
                    </ul>
                    <div
                      dangerouslySetInnerHTML={{ __html: dateDetails.result }}
                    />
                  </div>
                ))}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default PastTarot;
