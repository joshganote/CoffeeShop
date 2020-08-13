import React, { createContext, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { UserAgent } from 'amazon-cognito-identity-js';

export const AuthContext = createContext({
  user: UserAgent,
  login: () => T,
  logout: () => T,
},{
  user: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider value={{
      user,
      login: () => {
        const fakeUser = { username: 'Josh'};
        setUser(fakeUser);
        AsyncStorage.setItem("user", JSON.stringify(fakeUser));
      },
      logout: () => {
        setUser(null);
        AsyncStorage.removeItem("user");
      }
    }}>{children}</AuthContext.Provider>
  )
}