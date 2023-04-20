import { createContext, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Create our Provider (wrapper component)
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const contextValue = {
    token,
    setToken
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;