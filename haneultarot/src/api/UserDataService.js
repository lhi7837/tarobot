// UserDataService.js
import { ref, set, get, onValue } from "firebase/database";
import { app, database, auth } from "../firebase.js";

const writeUserData = (userId, data) => {
  console.log("writeUserData: userId, data", userId, data);
  const userRef = ref(database, `users/${userId}`);
  return set(userRef, data);
};

const readUserDataOnce = (userId) => {
  const userRef = ref(database, `users/${userId}`);
  return get(userRef).then((snapshot) => snapshot.val());
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
    const userId = app.auth().currentUser.uid;
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
  app,
  auth,
};
