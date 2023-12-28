// UserDataService.js
import { ref, set, get, onValue } from "firebase/database";
import { app, database, auth } from "../firebase.js";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

const writeUserData = (userId, data) => {
  const userRef = ref(database, `users/${userId}/userInfo`);
  return set(userRef, data);
};

const writeTarotData = (userId, option, pickedCards) => {
  const todayDate = getTodayDate();
  const cardsPath = `${option}_${todayDate}/cards`;
  const userCardsRef = ref(database, `users/${userId}/${cardsPath}`);

  return set(userCardsRef, pickedCards)
    .then(() => {
      console.log("뽑은 카드 저장 완료 :", pickedCards);
    })
    .catch((error) => {
      console.error("뽑은 카드 저장 실패:", error);
    });
};

const wrtieTarotResultData = (userId, option, tarotResult) => {
  const todayDate = getTodayDate();
  const resultsPath = `${option}_${todayDate}/result`;
  const userResultsRef = ref(database, `users/${userId}/${resultsPath}`);
  console.log("1. 저장할 데이터 userid :", userId);
  console.log("2. 저장할 데이터 option :", option);
  console.log("3. 저장할 데이터 tarotResult :", tarotResult);
  return set(userResultsRef, tarotResult)
    .then(() => {
      console.log("타로 결과 저장 완료");
    })
    .catch((error) => {
      console.error("타로 결과 저장 실패:", error);
    });
};

const readTarotResultData = (userId, option) => {
  const todayDate = getTodayDate();
  const dataPath = `${option}_${todayDate}`;
  const userRef = ref(database, `users/${userId}/${dataPath}`);

  return get(userRef)
    .then((dataSnapshot) => {
      const resultData = dataSnapshot.val()?.result;
      const cardsData = dataSnapshot.val()?.cards;
      return { resultData, cardsData };
    })
    .catch((error) => {
      // 해당 경로에 값이 존재하지 않는 경우에 대한 처리
      if (error.code === "PERMISSION_DENIED") {
        console.error("Permission denied. The data may not exist.");
        return null;
      } else {
        console.error("Error reading data from Firebase:", error);
        throw error; // 다른 예외는 다시 던집니다.
      }
    });
};

const readUserDataOnce = (userId, option = null) => {
  const todayDate = getTodayDate();

  if (option) {
    const dataPath = `${option}_${todayDate}`;
    const userRef = ref(database, `users/${userId}/${dataPath}`);

    return get(userRef)
      .then((dataSnapshot) => {
        const userInfoRef = ref(database, `users/${userId}/userInfo`);
        const todayData = dataSnapshot.val();

        return get(userInfoRef).then((userInfoSnapshot) => {
          const userInfo = userInfoSnapshot.val();
          return { todayData, userInfo };
        });
      })
      .catch((error) => {
        console.error("Error reading data from Firebase:", error);
      });
  } else {
    // option이 없는 경우에는 userInfo만 읽어옴
    const userInfoRef = ref(database, `users/${userId}/userInfo`);

    return get(userInfoRef)
      .then((userInfoSnapshot) => {
        const userInfo = userInfoSnapshot.val();
        return { todayData: null, userInfo };
      })
      .catch((error) => {
        console.error("Error reading data from Firebase:", error);
      });
  }
};

const readUserDataRealtime = (userId, callback) => {
  const userRef = ref(database, `users/${userId}`);
  return onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

const dataSubmit = (currentPage, maxPage, userId, formData) => {
  if (currentPage === maxPage) {
    writeUserData(userId, formData)
      .then(() => {
        console.log("Data saved to Firebase!");
      })
      .catch((error) => {
        console.error("Error saving data to Firebase:", error);
      });
  }
};

export {
  writeUserData,
  readUserDataOnce,
  readUserDataRealtime,
  dataSubmit,
  writeTarotData,
  wrtieTarotResultData,
  readTarotResultData,
  app,
  auth,
};
