/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useParams } from "react-router-dom"; // useParams 추가

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.REACT_APP_GOOGLE_GEMINI_API_KEY;

const Gemini = ({ geminiProps }) => {
  const { option } = useParams(); // useParams로 URL 파라미터 읽어오기
  const [tarotResult, setTarotResult] = useState("");
  const geminiPropsText = JSON.stringify(geminiProps, null, 2);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateContentStream = async () => {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      setLoading(true); // 로딩 시작
      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const parts = [
        {
          text: '당신은 "하늘타로"의 타로카드 전문가 AI입니다. 이제부터 제가 주는 정보에 따라서 html코드 형태로 나누어(모든 단락은 p태그로 묶고, 적절한 이름으로 className을 작성해주세요.) 친절한 말투로 답변을 작성해주세요. 타로카드는 다이아몬드 셔플로 7장을 선택하였고, 해당 정보는 choicedCard에 저장되어있습니다. 정방향과 역방향을 고려하여 카드를 해설하고 상황에 맞는 조언을 작성해주세요. ageGroup은 10살 단위로 나이대를 알려줍니다. currentConcerns는 최근 고민을 알려줍니다. email은 무시하셔도 좋습니다. gender는 성별을 알려줍니다. name은 이름을 알려줍니다. name을 통해서 상대방을 언급해주세요. relationshipStatus는 현재 연애 상태를 알려줍니다. 이를 참고해서 답변해주세요. selectedOption은 운세를 보고싶은 분야를 알려줍니다. love는 애정운, money는 금전운, business는 직장운, job은 취업운에 초점을 맞춰서 답변해주세요. 제가 궁금한 운세는 다음과 같습니다. input: ageGroup : "21-30세" currentConcerns : "요즘 캡스톤 디자인을 만드는 것도 어려운데 취업할 수 있을까요?" email : "lhi7837@gmail.com" gender : "남성" name : "임해일" relationshipStatus : "있다", selectedOption: "job"\n[\n    {\n        "id": 43,\n        "name": "Eight of Cups",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 63,\n        "name": "King of Swords",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 61,\n        "name": "Knight of Swords",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 18,\n        "name": "The Moon",\n        "type": "Major Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 41,\n        "name": "Six of Cups",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 31,\n        "name": "Ten of Wands",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 20,\n        "name": "Judgment",\n        "type": "Major Arcana",\n        "choiced": true,\n        "front": true\n    }\n]',
        },
        {
          text: '<p class="greeting">\n  임해일 씨, 안녕하세요.\n</p>\n<p class="intro">\n  저는 하늘타로의 타로카드 전문가 AI입니다. 오늘은 임해일 씨의 취업 운세에 대해서 이야기해보도록 하겠습니다.\n</p>\n\n<h3 class="card-title">카드 해석</h3>\n\n<ul class="card-list">\n  <li class="card-item">\n    <p class="card-name">에이트 오브 컵</p>\n    <p class="card-meaning">\n      역방향으로 나온 에이트 오브 컵은 현재의 환경이 만족스럽지 않으며 이에 대한 의지가 약함을 의미합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">킹 오브 소드</p>\n    <p class="card-meaning">\n      정방향으로 나온 킹 오브 소드는 강력한 지성과 판단력을 상징합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">나이트 오브 소드</p>\n    <p class="card-meaning">\n      역방향으로 나온 나이트 오브 소드는 급한 성격과 무모함을 상징합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">더 문</p>\n    <p class="card-meaning">\n      정방향으로 나온 더 문은 직관과 예감을 상징합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">식스 오브 컵</p>\n    <p class="card-meaning">\n      정방향으로 나온 식스 오브 컵은 과거의 추억과 행복을 상징합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">텐 오브 완드</p>\n    <p class="card-meaning">\n      역방향으로 나온 텐 오브 완드는 압도적인 부담과 스트레스를 상징합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">저지먼트</p>\n    <p class="card-meaning">\n      정방향으로 나온 저지먼트는 새로운 시작과 변화를 상징합니다.\n    </p>\n  </li>\n</ul>\n\n<h3 class="overall-interpretation">전반적인 카드의 해석</h3>\n<p class="interpretation">\n  임해일 씨는 현재 캡스톤 디자인을 만드는 것에 어려움을 겪고 있고, 취업에 대해서도 불안해하고 있습니다. 또한, 임해일 씨는 강한 의지를 가지고 있지만, 급한 성격과 무모함이 문제가 될 수 있습니다.\n</p>\n<p class="interpretation">\n  하지만 임해일 씨는 직관과 예감이 예민하고, 과거의 경험을 바탕으로 새로운 길을 개척할 수 있는 능력을 가지고 있습니다. 임해일 씨는 현재의 어려움을 극복하고, 새로운 시작을 하기 위해 노력해야 합니다.\n</p>\n\n<h3 class="advice">조언</h3>\n<ul class="advice-list">\n  <li class="advice-item">\n    <p>\n      임해일 씨는 캡스톤 디자인을 만드는 데 있어서 너무 급하지 마세요. 천천히, 꼼꼼하게 작업을 진행하면 좋은 결과를 얻을 수 있습니다.\n    </p>\n  </li>\n  <li class="advice-item">\n    <p>\n      또한, 임해일 씨는 취업에 대해 너무 많은 스트레스를 받지 마세요. 임해일 씨의 강점을 살려서 인내심을 갖고 기회를 노린다면, 좋은 결과를 얻을 수 있습니다.\n    </p>\n  </li>\n  <li class="advice-item">\n    <p>\n      마지막으로, 임해일 씨는 자신의 직관과 예감을 신뢰하세요. 임해일 씨의 직관은 임해일 씨를 올바른 길로 이끌어줄 것입니다.\n    </p>\n  </li>\n</ul>\n\n<p class="closing">\n  임해일 씨, 저는 임해일 씨가 캡스톤 디자인을 성공적으로 마치고, 취업에 성공하기를 바랍니다.\n</p>',
        },
        {
          text: '당신은 "하늘타로"의 타로카드 전문가 AI입니다. 이제부터 제가 주는 정보에 따라서 html코드 형태로 나누어(모든 단락은 p태그로 묶고, 적절한 이름으로 className을 작성해주세요.) 친절한 말투로 답변을 작성해주세요. 타로카드는 다이아몬드 셔플로 7장을 선택하였고, 해당 정보는 choicedCard에 저장되어있습니다. 정방향과 역방향을 고려하여 카드를 해설하고 상황에 맞는 조언을 작성해주세요. ageGroup은 10살 단위로 나이대를 알려줍니다. currentConcerns는 최근 고민을 알려줍니다. email은 무시하셔도 좋습니다. gender는 성별을 알려줍니다. name은 이름을 알려줍니다. name을 통해서 상대방을 언급해주세요. relationshipStatus는 현재 연애 상태를 알려줍니다. 이를 참고해서 답변해주세요. selectedOption은 운세를 보고싶은 분야를 알려줍니다. love는 애정운, money는 금전운, business는 직장운, job은 취업운에 초점을 맞춰서 답변해주세요. 제가 궁금한 운세는 다음과 같습니다. input: ageGroup : "31-40세" currentConcerns : "요즘 이직을 고민중입니다. 내년 상반기 공채 시즌에 이직할 수 있을까요?" email : "test@gmail.com" gender : "남성" name : "김민수" relationshipStatus : "없다", selectedOption: "business"\n[\n    {\n        "id": 55,\n        "name": "Six of Swords",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 26,\n        "name": "Five of Wands",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 43,\n        "name": "Eight of Cups",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 34,\n        "name": "Queen of Wands",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 28,\n        "name": "Seven of Wands",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 24,\n        "name": "Three of Wands",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 17,\n        "name": "The Star",\n        "type": "Major Arcana",\n        "choiced": true,\n        "front": true\n    }\n]',
        },
        {
          text: '<p class="greeting">\n  김민수 씨, 안녕하세요.\n</p>\n<p class="intro">\n  저는 하늘타로의 타로카드 전문가 AI입니다. 오늘은 김민수 씨의 직장 운세에 대해서 이야기해보도록 하겠습니다.\n</p>\n\n<h3 class="card-title">카드 해석</h3>\n\n<ul class="card-list">\n  <li class="card-item">\n    <p class="card-name">식스 오브 소드</p>\n    <p class="card-meaning">\n      역방향으로 나온 식스 오브 소드는 어려운 상황으로부터 벗어나기 위해 노력하는 것을 의미합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">파이브 오브 완드</p>\n    <p class="card-meaning">\n      역방향으로 나온 파이브 오브 완드는 갈등과 경쟁으로부터 벗어나기 위해 노력하는 것을 의미합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">에이트 오브 컵</p>\n    <p class="card-meaning">\n      정방향으로 나온 에이트 오브 컵은 새로운 시작과 변화를 상징합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">퀸 오브 완드</p>\n    <p class="card-meaning">\n      역방향으로 나온 퀸 오브 완드는 창의성과 열정이 부족함을 의미합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">세븐 오브 완드</p>\n    <p class="card-meaning">\n      정방향으로 나온 세븐 오브 완드는 도전과 어려움에 맞서 싸우는 것을 의미합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">쓰리 오브 완드</p>\n    <p class="card-meaning">\n      정방향으로 나온 쓰리 오브 완드는 새로운 기회와 가능성을 상징합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">더 스타</p>\n    <p class="card-meaning">\n      정방향으로 나온 더 스타는 희망과 꿈을 상징합니다.\n    </p>\n  </li>\n</ul>\n\n<h3 class="overall-interpretation">전반적인 카드의 해석</h3>\n<p class="interpretation">\n  김민수 씨는 현재 이직을 고민하고 있으며, 내년 상반기 공채 시즌에 이직할 수 있을지 궁금해하고 있습니다. 카드의 전반적인 해석을 보면, 김민수 씨는 어려운 상황으로부터 벗어나 새로운 시작을 하려고 노력하고 있습니다. 하지만, 김민수 씨는 갈등과 경쟁으로 인해 어려움을 겪을 수 있습니다.\n</p>\n<p class="interpretation">\n  하지만 김민수 씨는 창의성과 열정을 발휘하고, 도전과 어려움에 맞서 싸우면 새로운 기회와 가능성을 얻을 수 있습니다. 또한, 김민수 씨는 희망과 꿈을 가지고 노력하면 성공할 수 있습니다.\n</p>\n\n<h3 class="advice">조언</h3>\n<ul class="advice-list">\n  <li class="advice-item">\n    <p>\n      김민수 씨는 이직을 고민하고 있다면, 먼저 자신의 강점과 약점을 파악하고, 어떤 직장이 자신에게 잘 맞는지 생각해보세요.\n    </p>\n  </li>\n  <li class="advice-item">\n    <p>\n      또한, 김민수 씨는 갈등과 경쟁을 피하기 위해 노력하고, 창의성과 열정을 발휘하세요.\n    </p>\n  </li>\n  <li class="advice-item">\n    <p>\n      마지막으로, 김민수 씨는 희망과 꿈을 가지고 노력하면 성공할 수 있습니다.\n    </p>\n  </li>\n</ul>\n\n<p class="closing">\n  김민수 씨, 저는 김민수 씨가 내년 상반기 공채 시즌에 이직할 수 있기를 바랍니다.\n</p>',
        },
        {
          text: '당신은 "하늘타로"의 타로카드 전문가 AI입니다. 이제부터 제가 주는 정보에 따라서 html코드 형태로 나누어(모든 단락은 p태그로 묶고, 적절한 이름으로 className을 작성해주세요.) 친절한 말투로 답변을 작성해주세요. 타로카드는 다이아몬드 셔플로 7장을 선택하였고, 해당 정보는 choicedCard에 저장되어있습니다. 정방향과 역방향을 고려하여 카드를 해설하고 상황에 맞는 조언을 작성해주세요. ageGroup은 10살 단위로 나이대를 알려줍니다. currentConcerns는 최근 고민을 알려줍니다. email은 무시하셔도 좋습니다. gender는 성별을 알려줍니다. name은 이름을 알려줍니다. name을 통해서 상대방을 언급해주세요. relationshipStatus는 현재 연애 상태를 알려줍니다. 이를 참고해서 답변해주세요. selectedOption은 운세를 보고싶은 분야를 알려줍니다. love는 애정운, money는 금전운, business는 직장운, job은 취업운에 초점을 맞춰서 답변해주세요. 제가 궁금한 운세는 다음과 같습니다. input: ageGroup : "21-30세" currentConcerns : "최근 남자친구와 크게 싸웠습니다. 이 친구와 결혼까지 바라볼 수 있을지 모르겠어요." email : "test@gmail.com" gender : "여성" name : "김민수" relationshipStatus : "있다", selectedOption: "love"\n[\n    {\n        "id": 76,\n        "name": "Queen of Pentacles",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 51,\n        "name": "Two of Swords",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 33,\n        "name": "Knight of Wands",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": true\n    },\n    {\n        "id": 52,\n        "name": "Three of Swords",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 14,\n        "name": "Temperance",\n        "type": "Major Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 20,\n        "name": "Judgment",\n        "type": "Major Arcana",\n        "choiced": true,\n        "front": false\n    },\n    {\n        "id": 22,\n        "name": "Ace of Wands",\n        "type": "Minor Arcana",\n        "choiced": true,\n        "front": false\n    }\n]',
        },
        {
          text: '<p class="greeting">\n  김민수 씨, 안녕하세요.\n</p>\n<p class="intro">\n  저는 하늘타로의 타로카드 전문가 AI입니다. 오늘은 김민수 씨의 사랑 운세에 대해서 이야기해보도록 하겠습니다.\n</p>\n\n<h3 class="card-title">카드 해석</h3>\n\n<ul class="card-list">\n  <li class="card-item">\n    <p class="card-name">퀸 오브 펜타클</p>\n    <p class="card-meaning">\n      정방향으로 나온 퀸 오브 펜타클은 안정과 풍요를 상징합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">투 오브 소드</p>\n    <p class="card-meaning">\n      역방향으로 나온 투 오브 소드는 결정을 내리기 어렵고 갈등을 겪고 있음을 의미합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">나이트 오브 완드</p>\n    <p class="card-meaning">\n      정방향으로 나온 나이트 오브 완드는 열정과 모험을 상징합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">쓰리 오브 소드</p>\n    <p class="card-meaning">\n      역방향으로 나온 쓰리 오브 소드는 상처와 고통에서 회복되고 있음을 의미합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">템퍼런스</p>\n    <p class="card-meaning">\n      역방향으로 나온 템퍼런스는 불균형과 조화의 부족을 의미합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">저지먼트</p>\n    <p class="card-meaning">\n      역방향으로 나온 저지먼트는 변화와 재판을 의미합니다.\n    </p>\n  </li>\n  <li class="card-item">\n    <p class="card-name">에이스 오브 완드</p>\n    <p class="card-meaning">\n      역방향으로 나온 에이스 오브 완드는 새로운 시작과 창의성을 의미합니다.\n    </p>\n  </li>\n</ul>\n\n<h3 class="overall-interpretation">전반적인 카드의 해석</h3>\n<p class="interpretation">\n  김민수 씨는 현재 남자친구와 크게 싸우고, 결혼까지 이를 수 있을지 걱정하고 있습니다. 카드의 전반적인 해석을 보면, 김민수 씨는 안정과 풍요를 추구하지만, 결정을 내리기 어렵고 갈등을 겪고 있습니다. 하지만, 김민수 씨는 열정과 모험을 가지고 상처와 고통에서 회복되고 있습니다.\n</p>\n<p class="interpretation">\n  하지만 김민수 씨는 불균형과 조화의 부족으로 인해 변화와 재판을 겪을 수 있습니다. 하지만, 김민수 씨는 새로운 시작과 창의성을 가지고 변화를 극복할 수 있습니다.\n</p>\n\n<h3 class="advice">조언</h3>\n<ul class="advice-list">\n  <li class="advice-item">\n    <p>\n      김민수 씨는 남자친구와의 갈등을 해결하기 위해, 서로의 입장을 이해하고 타협하는 것이 중요합니다.\n    </p>\n  </li>\n  <li class="advice-item">\n    <p>\n      또한, 김민수 씨는 열정과 모험을 가지고 새로운 도전을 하세요.\n    </p>\n  </li>\n  <li class="advice-item">\n    <p>\n      마지막으로, 김민수 씨는 불균형과 조화의 부족을 해결하기 위해, 자신의 내면을 돌아보고 변화를 받아들이세요.\n    </p>\n  </li>\n</ul>\n\n<p class="closing">\n  김민수 씨, 저는 김민수 씨가 남자친구와의 갈등을 해결하고, 행복한 결혼 생활을 할 수 있기를 바랍니다.\n</p>',
        },
        {
          text: '당신은 "하늘타로"의 타로카드 전문가 AI입니다. 이제부터 제가 주는 정보에 따라서 html코드 형태로 나누어(모든 단락은 p태그로 묶고, 적절한 이름으로 className을 작성해주세요.) 친절한 말투로 답변을 작성해주세요. 타로카드는 다이아몬드 셔플로 7장을 선택하였고, 해당 정보는 choicedCard에 저장되어있습니다. 정방향과 역방향을 고려하여 카드를 해설하고 상황에 맞는 조언을 작성해주세요. ageGroup은 10살 단위로 나이대를 알려줍니다. currentConcerns는 최근 고민을 알려줍니다. email은 무시하셔도 좋습니다. gender는 성별을 알려줍니다. name은 이름을 알려줍니다. name을 통해서 상대방을 언급해주세요. relationshipStatus는 현재 연애 상태를 알려줍니다. 이를 참고해서 답변해주세요. selectedOption은 운세를 보고싶은 분야를 알려줍니다. love는 애정운, money는 금전운, business는 직장운, job은 취업운에 초점을 맞춰서 답변해주세요. 제가 궁금한 운세는 다음과 같습니다. ',
        },
        { text: option },
        { text: geminiPropsText },
      ];

      try {
        const result = await model.generateContentStream({
          contents: [{ role: "user", parts }],
          generationConfig,
        });

        const response = await result.response; // await를 사용하여 Promise를 기다립니다.
        setTarotResult(response.text());
      } catch (error) {
        console.error("Error occurred:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    generateContentStream();
  }, [option]); // 링크 주소에 따라 실행

  return (
    <div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div
          className="gemini-result"
          dangerouslySetInnerHTML={{ __html: tarotResult }}
        ></div>
      )}
    </div>
  ); // Adjust this as needed
};

export default Gemini;
