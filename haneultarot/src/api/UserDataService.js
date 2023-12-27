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

const writeTarotData = (userId, data, option) => {
  const todayDate = getTodayDate();
  const userRef = ref(database, `users/${userId}/${option}_${todayDate}`);
  return set(userRef, data);
};

const wrtieTarotResultData = (userId, data, option) => {
  const todayDate = getTodayDate();
  const userRef = ref(
    database,
    `users/${userId}/${option}_${todayDate}/result`
  );
  return set(userRef, data);
};

const readTarotResultData = (userId, option) => {
  const todayDate = getTodayDate();
  const userRef = ref(
    database,
    `users/${userId}/${option}_${todayDate}/result`
  );
  return get(userRef)
    .then((dataSnapshot) => {
      const resultData = dataSnapshot.val();
      return resultData;
    })
    .catch((error) => {
      console.error("Error reading data from Firebase:", error);
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
