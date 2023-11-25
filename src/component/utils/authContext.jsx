import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    const storedToken = localStorage.getItem("authToken");
    return storedToken || null;
  });

  const [boardId, setBoardId] = useState(() => {
    const storedBoardId = localStorage.getItem("boardId");
    return storedBoardId || null;
  });

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
