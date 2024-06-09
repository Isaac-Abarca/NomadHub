// src/context/UserContext.js
import  { createContext, useState } from 'react';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
