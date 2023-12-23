// TarotDataInput.js
import React, { useState } from "react";
import { dataSubmit } from "../api/UserDataService";
import MoveBtn from "../components/MoveBtn";

const TarotDataInput = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    relationshipStatus: "",
    ageGroup: "",
    currentConcerns: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  const maxPageNumber = 5;

  const onPaging = (pageNumber, nextstep) => {
    if (nextstep === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (nextstep === "prev") {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (nextstep === "submit") {
      dataSubmit(pageNumber, maxPageNumber, "testUser", formData);
      setCurrentPage(0); // 혹은 필요에 따라 다른 페이지로 설정
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <p>{`${currentPage}/${maxPageNumber}`}</p>
      </div>
      <div style={{ textAlign: "center", margin: "20px" }}>
        {currentPage === 1 && (
          <div>
            <p>당신의 이름을 알려주세요.</p>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
        )}
        {currentPage === 2 && (
          <div>
            <p>성별을 선택해주세요.</p>
            <label>
              <input
                type="radio"
                value="남성"
                checked={formData.gender === "남성"}
                onChange={() => handleInputChange("gender", "남성")}
              />
              남성
            </label>
            <label>
              <input
                type="radio"
                value="여성"
                checked={formData.gender === "여성"}
                onChange={() => handleInputChange("gender", "여성")}
              />
              여성
            </label>
            <label>
              <input
                type="radio"
                value="선택하지 않음"
                checked={formData.gender === "선택하지 않음"}
                onChange={() => handleInputChange("gender", "선택하지 않음")}
              />
              선택하지 않음
            </label>
          </div>
        )}
        {currentPage === 3 && (
          <div>
            <p>연인 여부를 선택해주세요.</p>
            <label>
              <input
                type="radio"
                value="있다"
                checked={formData.relationshipStatus === "있다"}
                onChange={() => handleInputChange("relationshipStatus", "있다")}
              />
              있다
            </label>
            <label>
              <input
                type="radio"
                value="없다"
                checked={formData.relationshipStatus === "없다"}
                onChange={() => handleInputChange("relationshipStatus", "없다")}
              />
              없다
            </label>
            <label>
              <input
                type="radio"
                value="없고 앞으로도 연애할 생각이 없다"
                checked={
                  formData.relationshipStatus ===
                  "없고 앞으로도 연애할 생각이 없다"
                }
                onChange={() =>
                  handleInputChange(
                    "relationshipStatus",
                    "없고 앞으로도 연애할 생각이 없다"
                  )
                }
              />
              없고 앞으로도 연애할 생각이 없다
            </label>
          </div>
        )}
        {currentPage === 4 && (
          <div>
            <p>연령대를 선택해주세요.</p>
            <select
              value={formData.ageGroup}
              onChange={(e) => handleInputChange("ageGroup", e.target.value)}
            >
              <option value="">연령대를 선택하세요</option>
              <option value="0-10세">0~10세</option>
              <option value="11-20세">11~20세</option>
              <option value="21-30세">21~30세</option>
              <option value="31-40세">31~40세</option>
              <option value="41-50세">41~50세</option>
              <option value="51-60세">51~60세</option>
              <option value="60세 이상">60세 이상</option>
            </select>
          </div>
        )}

        {currentPage === 5 && (
          <div>
            <p>요즘의 고민을 입력하세요.</p>
            <textarea
              value={formData.currentConcerns}
              onChange={(e) =>
                handleInputChange("currentConcerns", e.target.value)
              }
            />
          </div>
        )}
      </div>
      <MoveBtn
        currentPage={currentPage}
        maxPage={maxPageNumber}
        onClick={(pageNumber, nextstep) => onPaging(pageNumber, nextstep)}
      />
    </div>
  );
};

export default TarotDataInput;
