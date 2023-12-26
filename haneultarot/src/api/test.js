import React, { useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

let text = "";
const Gemini = () => {
  useEffect(() => {
    const fetchData = async () => {
      const genAI = new GoogleGenerativeAI(
        process.env.REACT_APP_GOOGLE_GEMINI_API_KEY
      );
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = "Write a story about a magic backpack.";

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = response.text();
        console.log(text);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행됨을 의미합니다.

  return <div>{text}</div>;
};

export default Gemini;
