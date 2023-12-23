import React, { useState, useEffect } from "react";
import OpenAI from "openai";

const ChatGPT = () => {
  const [prompt, setPrompt] = useState(
    "지금부터 당신은 30대 여성인 타로카드 상담 전문가입니다. 평소, 따뜻하게 말을 전달하며 어려운 상황에 대해서는 직설적으로 조언을 해주는 타입입니다. 최대한 내가 이해하기 쉬운 방식으로 풀어서 얘기해주면 좋겠습니다. 나의 정보를 전달해줄테니, 내 상황에 맞춰서 타로점을 봐주십시오. 메이저와 마이너 카드를 모두 합쳐 총 78장의 카드로 보름달 스프레드 형태로 카드를 놓았습니다.  보름달 스프레드 형태에 맞춰서 타로를 7장 뽑았고, 내가 뽑은 카드는 다음과 같습니다. 1. The Star, 정방향 2.  Death, 역방향 3. The Sun, 역방향 4. The Hanged Man, 역방향 5. The Magician, 정방향 6. 마이너 퀸, 정방향 7. 마이너 10, 정방향 내 상황에 맞춰서 점을 봐주고, 내 정보를 알지 못한다면 말 못할 고민이 있는 20대 학생으로 가정하되 누구에게나 공통적으로 적용될만한 부분으로 이야기 해주시오. 즉, 학업이나 졸업, 성별, 차별적인 요소 등을 포함하지 말고 이야기 해주시오. 전체 카드에 대한 종합적인 해석을 먼저 이야기 한 다음, 각 카드의 방향에 맞춘 의미를 해석해주시오. 답변 형식은 다음에 맞춰주세요. 전체적인 해석: {} 뽑은 카드 개별 해석:  1. ~~~ 2. ~~~ ~~~ 7. ~~~"
  );
  const [response, setResponse] = useState("");

  const openAI = new OpenAI({
    key: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    const generateResponse = async () => {
      const completion = await openAI.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      setResponse(completion.choices[0].text);
    };

    generateResponse();
  }, [prompt]);

  const handleChangePrompt = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="프롬프트 입력"
        value={prompt}
        onChange={handleChangePrompt}
      />
      <br />
      <span>응답: {response}</span>
    </div>
  );
};

export default ChatGPT;
