### 링크
https://haneultarot-47911.web.app/

# 1. 캡스톤디자인 개요
## 1.1 캡스톤디자인 배경
최근 타로, 사주 등 다양한 점술을 통해 본인의 현재 고민 사항을 해소하기 위해 상황을
판단하고, 선택에 도움을 받고자 하는 현대인에게 최근 여러 산업에 접목되고 있는 AI 기술을
활용하여 인공지능에게 타로 분석을 받는 서비스를 제공하고자 개발하였다. 
## 1.2 캡스톤디자인 목표
- LLM이 적용된 AI를 활용하여 인공지능이 적용된 웹앱을 제작한다. - 다양한 외부 라이브러리(React, React-router-dom, Firebase, Gemini,
indiana-drag-scroll 등) 를 활용하여 하나의 완성된 웹앱을 제작한다.
## 1.3 캡스톤디자인 관련 조사(연구)
1. 띵스플로우: 헬로봇(https://hellobot.co/)
가. 모바일 앱 위주의 서비스
나. 챗봇 형태로 구성
2. 원지랩스: 마이타로AI(https://www.aitimes.com/news/articleView.html?idxno=151535)
가. 모바일 앱 위주의 서비스
나. GPT를 활용한 분석

# 사용 기술 스택
- React.js
- Firebase Realtime Database
- Firebase Authentication
- Firebase Hosting

# 전체 설계
<img width="581" alt="하늘타로 구조도" src="https://github.com/user-attachments/assets/0df11d39-071f-40eb-bc11-724c50fe6a2f" />
- Users가 웹브라우저(크롬과 같은)를 통해 사이트에 접속한다.
- 사이트에서는 React를 이용해 화면을 구성한다.
- 구글 로그인 후 데이터 입력을 시작한다.
- Data Input
  - 유저의 개인정보(계정정보, 이름, 연령대, 성별, 연인유무, 최근 고민 등) - 랜덤하게 섞인 총 78장(메이저, 마이너 포함)의 카드 중 7장의 카드 선택
- AI(ChatGPT)
  - 입력받은 유저의 정보를 통해 다이아몬드 배치 형태로 타로 리딩 진행
  - 유저가 선택한 7장의 카드는 정방향/역방향 중 하나가 랜덤하게 부여됨
- Firebase
  - 유저가 입력한 정보 및 AI의 리딩 결과를 저장
  - 구글 로그인을 통해 Auth 관리
  - Firebase를 통해 deploy하여 웹페이지 Hosting 구현
- Data Output
  - 유저가 입력한 정보를 바탕으로 AI가 분석한 결과를 제공 받는다.
## 사용 라이브러리
![image](https://github.com/user-attachments/assets/61f9bc65-e235-4429-958f-539ff32635ec)

## 데이터베이스 구조
![image](https://github.com/user-attachments/assets/ad19d448-ef81-44dc-9203-fbfee9ca7f2f)
- users/{uid}/ 내에 각 {선택한 운세}/{날짜}/cards, result 구조로 구성
- 로그인한 유저, 본인의 uid에 맞는 데이터만 입/출력 가능하게 rules 설정

# 화면 내용
## 메인 페이지
![image](https://github.com/user-attachments/assets/9cd8d914-4c5d-43b5-a375-4e363e19efef)
- 로고와 타이틀 노출
- 로그인이 된 유저만 실행 가능

## 점괘 선택 화면
![image](https://github.com/user-attachments/assets/328dc6a9-505b-4b3a-a67b-0c0033c7f959)
- 저장된 정보가 없으면, 개인정보(이름, 연령대 등)을 입력하는 페이지로 이동
- 애정운/금전운/직장운/취업운 중 선택하여 타로 진행

## 카드 선택 화면
![image](https://github.com/user-attachments/assets/4789d870-a052-4d34-a9eb-2fa3ca7ccf5e)
- 랜덤하게 셔플된 78장의 카드 중 7장 선택
- 선택된 카드는 선택했음이 눈에 보이게 표현
- 가로 슬라이드 형태로 배치

## 결과 화면
![image](https://github.com/user-attachments/assets/77dfe47c-59ab-427d-91c0-5310fb46871b)
![image](https://github.com/user-attachments/assets/c5423116-728c-4629-90b2-8d891c3516ec)
- AI를 활용하여 분석 결과 리딩
- 타로 카드를 다이아몬드 셔플 형태로 배치하여 보여줌

## 이전 결과 보기
![image](https://github.com/user-attachments/assets/8f49ce65-cecd-43cc-b46c-5cd10f580aee)
- 과거 기록을 볼 수 있는 페이지 구현
- 입력했던 개인정보를 수정할 수 있는 페이지 구현
