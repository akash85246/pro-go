import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    const storedToken = sessionStorage.getItem("authToken");
    return storedToken || null;
  });

  const [boardId, setBoardId] = useState(null);

  const updateAuthToken = (newAuthToken) => {
    setAuthToken(newAuthToken);
    localStorage.setItem("authToken", newAuthToken);
  };

  const updateBoardId = (newBoardId) => {
    
    setBoardId(newBoardId);
    localStorage.setItem("boardId", newBoardId);
  };

  return (
    <AuthContext.Provider
      value={{ authToken, updateAuthToken, boardId, updateBoardId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
