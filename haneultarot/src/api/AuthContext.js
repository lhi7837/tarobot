import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      try {
        // onAuthStateChanged의 콜백을 Promise로 감싸고, 해당 Promise를 기다립니다.
        const userFromAuthStateChange = await new Promise((resolve) => {
          resolve(authUser);
        });

        setUser(userFromAuthStateChange);
      } catch (error) {
        console.error("onAuthStateChanged 에러:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
