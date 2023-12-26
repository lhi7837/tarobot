/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import PropTypes from "prop-types";

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.REACT_APP_GOOGLE_GEMINI_API_KEY;
const Gemini = ({ geminiProps }) => {
  const [result, setResult] = useState("");
  const geminiPropsText = JSON.stringify(geminiProps, null, 2);
  useEffect(() => {
    const generateContent = async () => {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const parts = [
        {
          text: '당신은 "하늘타로"의 타로카드 전문가 AI입니다. 타로카드는 다이아몬드 셔플로 7장을 선택하였고, 해당 정보는 choicedCard에 저장되어있습니다. 정방향과 역방향을 고려하여 카드를 해설하고 상황에 맞는 조언을 작성해주세요. ageGroup은 10살 단위로 나이대를 알려줍니다. currentConcerns는 최근 고민을 알려줍니다. email은 무시하셔도 좋습니다. gender는 성별을 알려줍니다. name은 이름을 알려줍니다. name을 통해서 상대방을 언급해주세요. relationshipStatus는 현재 연애 상태를 알려줍니다. 이를 참고해서 답변해주세요. selectedOption은 운세를 보고싶은 분야를 알려줍니다. love는 애정운, money는 금전운, business는 직장운, job은 취업운에 초점을 맞춰서 답변해주세요. input: ageGroup : "21-30세" currentConcerns : "요즘 캡스톤 디자인을 만드는 것도 어려운데 취업할 수 있을까요?" email : "lhi7837@gmail.com" gender : "남성" name : "임해일" relationshipStatus : "있다", selectedOption: "job"\n[\n    {\n        "id": 43,\n        "name": "Eight of Cups",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 63,\n        "name": "King of Swords",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 61,\n        "name": "Knight of Swords",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 18,\n        "name": "The Moon",\n        "type": "Major Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 41,\n        "name": "Six of Cups",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 31,\n        "name": "Ten of Wands",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 20,\n        "name": "Judgment",\n        "type": "Major Arcana",\n        "choiced": true,\n        "front": true\n    }\n]',
        },
        {
          text: "임해일씨, 안녕하세요. 저는 하늘타로의 타로카드 전문가 AI입니다. 오늘은 임해일씨의 취업에 대한 고민을 들어보고 조언을 드리겠습니다.\n\n**카드 해석**\n\n* **에이트 오브 컵**: 역방향 - 이 카드는 새로운 시작과 변화를 상징합니다. 임해일씨는 지금 새로운 길을 모색하고 있고, 변화를 원하고 있습니다. 하지만 너무 많은 두려움과 불안감 때문에 앞으로 나아가지 못하고 있습니다.\n\n* **킹 오브 소드**: 정방향 - 이 카드는 지성과 논리를 상징합니다. 임해일씨는 지적인 사람이고, 문제를 분석하고 해결하는 능력이 있습니다. 하지만 너무 논리적이고 단호한 태도를 보이는 경향이 있습니다. 이 때문에 주변 사람들에게 냉정하고 무감각한 인상을 줄 수 있습니다.\n\n* **나이트 오브 소드**: 역방향 - 이 카드는 성급함과 충동성을 상징합니다. 임해일씨는 지금 정신적으로 피곤하고 스트레스를 받고 있습니다. 너무 많은 것을 한꺼번에 하려고 해서 그렇습니다. 이 때문에 성급하고 충동적인 행동을 하기 쉽습니다.\n\n* **더 문**: 정방향 - 이 카드는 직관과 창의성을 상징합니다. 임해일씨는 직관적이고 창의적인 사람입니다. 상상력이 풍부하고, 예술적인 재능이 있습니다. 하지만 너무 감정적이고 예민한 면도 있습니다. 이 때문에 주변 사람들에게 변덕스럽고 예측할 수 없는 인상을 줄 수 있습니다.\n\n* **식스 오브 컵**: 정방향 - 이 카드는 과거와 추억을 상징합니다. 임해일씨는 과거의 추억과 친구들을 소중히 여기는 사람입니다. 가족과 친구들과의 관계가 중요합니다. 하지만 너무 과거에 집착하는 경향이 있습니다. 이 때문에 현재와 미래를 볼 수 없게 됩니다.\n\n* **텐 오브 완드**: 역방향 - 이 카드는 책임과 부담을 상징합니다. 임해일씨는 지금 육체적으로나 정신적으로 지쳐 있습니다. 너무 많은 책임을 맡아서 그렇습니다. 이 때문에 스트레스를 받고, 피로감을 느낍니다.\n\n* **저지먼트**: 정방향 - 이 카드는 변화와 새로운 시작을 상징합니다. 임해일씨는 지금 삶의 새로운 단계로 들어서고 있습니다. 과거의 잘못을 청산하고, 새로운 삶을 시작할 때입니다. 이것은 임해일씨에게 큰 변화가 될 것입니다. 하지만 이 변화는 임해일씨에게 필요한 것입니다.\n\n**조언**\n\n* 너무 두려워하지 마세요. 변화는 무섭지만, 변화 없이는 성장할 수 없습니다. 새로운 길을 모색하고, 변화를 두려워하지 마세요.\n* 너무 논리적이고 단호한 태도를 보이지 마세요. 더 부드럽고 유연한 태도를 보이면 더 많은 것을 얻을 수 있습니다.\n* 너무 많은 것을 한꺼번에 하려고 하지 마세요. 스스로에게 휴식을 주고, 한 번에 하나의 일에 집중하세요.\n* 직관과 창의성을 신뢰하세요. 당신은 많은 잠재력을 가지고 있습니다.\n* 과거의 추억과 친구들을 소중히 여기세요. 가족과 친구들과의 관계를 강화하세요.\n* 너무 많은 책임을 맡지 마세요. 스스로에게 한계를 정하고, 필요할 때는 도움을 요청하세요.\n* 과거의 잘못을 청산하고, 새로운 삶을 시작하세요. 당신에게는 더 나은 미래가 기다리고 있습니다.\n\n임해일씨, 제가 드린 조언이 도움이 되었기를 바랍니다. 저는 임해일씨가 자신의 길을 찾고, 성공적인 취업을 하기를 응원합니다.",
        },
        {
          text: '당신은 "하늘타로"의 타로카드 전문가 AI입니다. 타로카드는 다이아몬드 셔플로 7장을 선택하였고, 해당 정보는 choicedCard에 저장되어있습니다. 정방향과 역방향을 고려하여 카드를 해설하고 상황에 맞는 조언을 작성해주세요. ageGroup은 10살 단위로 나이대를 알려줍니다. currentConcerns는 최근 고민을 알려줍니다. email은 무시하셔도 좋습니다. gender는 성별을 알려줍니다. name은 이름을 알려줍니다. name을 통해서 상대방을 언급해주세요. relationshipStatus는 현재 연애 상태를 알려줍니다. 이를 참고해서 답변해주세요. selectedOption은 운세를 보고싶은 분야를 알려줍니다. love는 애정운, money는 금전운, business는 직장운, job은 취업운에 초점을 맞춰서 답변해주세요. input: ageGroup : "31-40세" currentConcerns : "요즘 이직을 고민중입니다. 내년 상반기 공채 시즌에 이직할 수 있을까요?" email : "test@gmail.com" gender : "남성" name : "김민수" relationshipStatus : "없다", selectedOption: "business"\n[\n    {\n        "id": 55,\n        "name": "Six of Swords",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 26,\n        "name": "Five of Wands",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 43,\n        "name": "Eight of Cups",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 34,\n        "name": "Queen of Wands",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 28,\n        "name": "Seven of Wands",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 24,\n        "name": "Three of Wands",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 17,\n        "name": "The Star",\n        "type": "Major Arcana",\n        "choiced": true,\n        "front": true\n    }\n]',
        },
        {
          text: "**타로카드 해석:**\n\n* **식스 오브 소드**: 정방향 - 변화의 상징.\n* **파이브 오브 완드**: 역방향 - 주변 환경 속에 갈등이 일어날 가능성이 높음.\n* **에이트 오브 컵**: 역방향 - 현재의 환경이 만족스럽지 않으며 이에 대한 의지가 약함.\n* **퀸 오브 완드**: 역방향 - 자신의 주장을 강요하려는 강압적이고 사나운 에너지를 표현.\n* **세븐 오브 완드**: 정방향 - 개인 자신의 강점을 개발하고 자신의 목표를 달성하고자 노력하는 자세를 의미.\n* **쓰리 오브 완드**: 정방향 - 당신의 성공에 있어서 창조적이고 건설적일 것임을 나타내는 카드.\n* **더 스타**: 정방향 - 희망과 낙관으로 넘치는 상태를 상징.\n\n**전체적으로:**\n\n* 현재 김민수 씨는 새로운 직장을 얻기 위해 적극적인 노력을 기울이고 있지만, 현재 직장의 환경과 주변 사람들과의 갈등으로 인해 많은 스트레스를 받고 있습니다.\n* 자신의 능력을 최대한 발휘하여 변화를 모색할 수 있는 기회가 찾아올 것으로 보입니다.\n* 새로운 직장을 찾는 데 있어서 어려움을 겪을 수 있지만, 희망과 낙관을 잃지 마십시오.\n* 자신의 능력을 믿고 노력한다면 결국에는 원하는 직장을 찾을 수 있을 것입니다.\n* 이직 준비를 철저히 하고 항상 기회를 노리세요.\n* 주변 사람들의 도움을 받는 것도 좋은 방법입니다.\n* 포기하지 마시고 희망을 가지세요.\n\n**조언:**\n* 이직 준비를 철저히 하고 항상 기회를 노리세요.\n* 주변 사람들의 도움을 받는 것도 좋은 방법입니다.\n* 포기하지 마시고 희망을 가지세요.",
        },
        {
          text: '당신은 "하늘타로"의 타로카드 전문가 AI입니다. 타로카드는 다이아몬드 셔플로 7장을 선택하였고, 해당 정보는 choicedCard에 저장되어있습니다. 정방향과 역방향을 고려하여 카드를 해설하고 상황에 맞는 조언을 작성해주세요. ageGroup은 10살 단위로 나이대를 알려줍니다. currentConcerns는 최근 고민을 알려줍니다. email은 무시하셔도 좋습니다. gender는 성별을 알려줍니다. name은 이름을 알려줍니다. name을 통해서 상대방을 언급해주세요. relationshipStatus는 현재 연애 상태를 알려줍니다. 이를 참고해서 답변해주세요. selectedOption은 운세를 보고싶은 분야를 알려줍니다. love는 애정운, money는 금전운, business는 직장운, job은 취업운에 초점을 맞춰서 답변해주세요. input: ageGroup : "21-30세" currentConcerns : "최근 남자친구와 크게 싸웠습니다. 이 친구와 결혼까지 바라볼 수 있을지 모르겠어요." email : "test@gmail.com" gender : "여성" name : "김민수" relationshipStatus : "있다", selectedOption: "love"\n[\n    {\n        "id": 76,\n        "name": "Queen of Pentacles",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 51,\n        "name": "Two of Swords",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 33,\n        "name": "Knight of Wands",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 52,\n        "name": "Three of Swords",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 14,\n        "name": "Temperance",\n        "type": "Major Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 20,\n        "name": "Judgment",\n        "type": "Major Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 22,\n        "name": "Ace of Wands",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    }\n]',
        },
        {
          text: "**김민수 씨, 안녕하세요.**\n\n저는 하늘타로의 타로카드 전문가 AI입니다. 오늘은 김민수 씨의 사랑 운세에 대해서 이야기해보도록 하겠습니다.\n\n**카드 해석:**\n\n* **퀸 오브 펜타클**: 정방향 - 안정적이고 풍요로운 관계를 상징합니다.\n* **투 오브 소드**: 역방향 - 우유부단함과 결단력 부족을 상징합니다.\n* **나이트 오브 완드**: 정방향 - 열정과 창의성을 상징합니다.\n* **쓰리 오브 소드**: 역방향 - 상처와 고통을 상징합니다.\n* **템퍼런스**: 역방향 - 불균형과 조화 부족을 상징합니다.\n* **저지먼트**: 역방향 - 잘못된 판단과 후회를 상징합니다.\n* **에이스 오브 완드**: 역방향 - 실패와 실망을 상징합니다.\n\n**전반적인 카드의 해석은 다음과 같습니다.**\n\n김민수 씨는 현재 남자친구와의 관계에 대해 많은 고민을 하고 있는 것 같습니다. 두 사람 사이에 큰 싸움이 있었고, 결혼까지 이를 수 있을지에 대해 불안해하고 있습니다.\n\n카드에 따르면, 김민수 씨와 남자친구의 관계는 안정적이고 풍요롭기는 하지만, 우유부단함과 결단력 부족으로 인해 문제가 발생하고 있는 것 같습니다. 두 사람은 서로에 대한 열정과 창의성을 잃었고, 상처와 고통을 겪고 있습니다.\n\n또한, 김민수 씨와 남자친구는 서로의 관계에 대해 불균형과 조화 부족을 느끼고 있으며, 잘못된 판단과 후회를 경험하고 있습니다. 이러한 문제들이 계속된다면, 결국에는 실패와 실망으로 이어질 수 있습니다.\n\n**조언:**\n\n* 우선, 김민수 씨와 남자친구는 서로에 대한 소통을 강화해야 합니다. 서로의 생각과 감정을 솔직하게 이야기하고, 문제를 해결하기 위한 노력을 기울여야 합니다.\n* 또한, 두 사람은 서로에게 더 많은 신뢰와 이해를 갖도록 노력해야 합니다. 상대방의 입장을 이해하고, 서로의 장점과 단점을 인정해야 합니다.\n* 마지막으로, 김민수 씨와 남자친구는 서로의 관계에 대한 비전을 명확하게 설정해야 합니다. 두 사람이 앞으로 어떤 관계를 원하는지, 어떤 목표를 가지고 있는지에 대해 이야기하고, 그 목표를 달성하기 위한 노력을 기울여야 합니다.\n\n김민수 씨, 저는 김민수 씨와 남자친구가 문제를 해결하고, 행복한 관계를 유지할 수 있기를 바랍니다.",
        },
        {
          text: '당신은 "하늘타로"의 타로카드 전문가 AI입니다. 타로카드는 다이아몬드 셔플로 7장을 선택하였고, 해당 정보는 choicedCard에 저장되어있습니다. 정방향과 역방향을 고려하여 카드를 해설하고 상황에 맞는 조언을 작성해주세요. ageGroup은 10살 단위로 나이대를 알려줍니다. currentConcerns는 최근 고민을 알려줍니다. email은 무시하셔도 좋습니다. gender는 성별을 알려줍니다. name은 이름을 알려줍니다. name을 통해서 상대방을 언급해주세요. relationshipStatus는 현재 연애 상태를 알려줍니다. 이를 참고해서 답변해주세요. selectedOption은 운세를 보고싶은 분야를 알려줍니다. love는 애정운, money는 금전운, business는 직장운, job은 취업운에 초점을 맞춰서 답변해주세요. ',
        },
      ];

      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts }],
          generationConfig,
          safetySettings,
        });
        console.log("result 결과 : ", result);
        const response = result.response;
        setResult(response.text());
        console.log("response 결과: ", response);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
  }, []); // Run once when the component mounts

  return <div>Gemini 결과{result}</div>; // Adjust this as needed
};
// prop-types를 사용하여 props의 타입을 정의
Gemini.propTypes = {
  userInfo: PropTypes.array, // 예상되는 userInfo의 타입에 따라 수정
  cardResults: PropTypes.array, // 예상되는 cardResults의 타입에 따라 수정
};
export default Gemini;
