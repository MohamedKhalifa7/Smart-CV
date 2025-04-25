import { createContext, useContext } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verify-token", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data && res.data.user) {
          setUser(res.data.user);
          setToken("from-cookie"); // Just a placeholder to make isAuthenticated true
        } else {
          throw new Error("Invalid response from server.");
        }
      })
      .catch((error) => {
        console.log("Error verifying token:", error);
        setUser(null);
        setToken(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  

  const isAuthenticated = !!token;
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    // Ensure that the user data is stringified before saving to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{  isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
