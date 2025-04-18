import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user, token) => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
