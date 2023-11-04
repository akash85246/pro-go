// authContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialAuthToken = localStorage.getItem("authToken") || null;
  const [authToken, setAuthToken] = useState(initialAuthToken);

  const updateAuthToken = (newAuthToken) => {
    setAuthToken(newAuthToken);
    localStorage.setItem("authToken", newAuthToken);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
