import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    const storedToken = sessionStorage.getItem("authToken");
    return storedToken || null;
  });

  const updateAuthToken = (newAuthToken) => {
    setAuthToken(newAuthToken);
    sessionStorage.setItem("authToken", newAuthToken);
  };

  return (
    <AuthContext.Provider value={{ authToken, updateAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
