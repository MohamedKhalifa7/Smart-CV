import { createContext, useContext } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Stored Token:", storedToken);
    if (!storedToken) {
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:3001/auth/verify-token", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        if (res.data && res.data.user) {
          setUser(res.data.user);
          setToken(res.data.token);
        } else {
          throw new Error("Invalid response from server.");
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
