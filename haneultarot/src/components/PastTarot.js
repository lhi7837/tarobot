/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { readUserDataExceptUserInfo } from "../api/UserDataService";
import { useAuth } from "../api/AuthContext.js";
import PickedCards from "../api/PickedCards.js";
const PastTarot = () => {
  const [tarotData, setTarotData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const authUser = useAuth();
  const [isSetTarotData, setIsSetTarotData] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // 대분류(운세 종류)의 열림 여부
  const [isDateOpen, setIsDateOpen] = useState(false); // 소분류(날짜)의 열림 여부

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

  const handleCategoryClick = (category) => {
    setSelectedOption((prev) => (prev === category ? null : category));
    setSelectedDate(null);
    setIsCategoryOpen((prev) => !prev); // 토글
    setIsDateOpen(false); // 날짜 닫기
  };

  const handleDateClick = (date) => {
    setSelectedDate((prev) => (prev === date ? null : date));
    setIsDateOpen((prev) => !prev); // 토글
  };
  const callPickedCards = (dateDetails) => {
    const pickedCards = dateDetails.cards; // dateDetails.cards를 변수에 저장
    return <PickedCards choicedDeck={pickedCards} />;
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
                <h2
                  className="lv1-category"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category === "love" && "애정운"}
                  {category === "money" && "금전운"}
                  {category === "business" && "직장운"}
                  {category === "job" && "취업운"}
                </h2>
                {selectedOption === category && (
                  <>
                    {Object.entries(categoryDetails).map(
                      ([date, dateDetails]) => (
                        <div key={date}>
                          <h3
                            className="lv2-date"
                            onClick={() => handleDateClick(date)}
                          >
                            {date} 일자 결과
                          </h3>
                          {/* dateDetails에는 cards와 result 등이 있으므로 원하는대로 활용 */}
                          {selectedDate === date && (
                            <>
                              {callPickedCards(dateDetails)}
                              <div
                                className="gemini-result"
                                dangerouslySetInnerHTML={{
                                  __html: dateDetails.result,
                                }}
                              />
                            </>
                          )}
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default PastTarot;
