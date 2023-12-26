import React, { useEffect, useState } from "react";
import Gemini from "../api/Gemini";
import { auth } from "../firebase.js";
import PropTypes from "prop-types";
import { useAuth } from "../api/AuthContext.js";
import { readUserDataOnce } from "../api/UserDataService";

const CardResult = ({ choicedDeck }) => {
  const [userInfo, setUserInfo] = useState(useAuth());

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = auth.currentUser;
        const userSnapshot = await readUserDataOnce(user.uid);
        setUserInfo(userSnapshot);
      } catch (error) {
        console.error("Fetching 에러 ", error);
      }
    };

    fetchUserInfo();
  }, []);

  // CardResult에서 Gemini에 전달할 props
  const geminiProps = {
    userInfo,
    cardResults: choicedDeck,
  };

  return (
    <div>
      <Gemini geminiProps={geminiProps} />
    </div>
  );
};

CardResult.propTypes = {
  choicedDeck: PropTypes.array.isRequired,
};

export default CardResult;
