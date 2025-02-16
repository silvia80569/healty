import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserData,
} from "../services/userService";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      getUserDataFromAPI();
    } else {
      setLoading(false);
    }
  }, []);

  const getUserDataFromAPI = async () => {
    try {
      const data = await getUserData();
      setUser(data);
    } catch (error) {
      console.error("❌ Error fetching user data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      console.log("🔹 Login success:", data.user);
      return data.user;
    } catch (error) {
      console.error("❌ Login error:", error.message);
      return null;
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerUser(userData);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      console.log("🔹 Register success:", data.user);
      return data.user;
    } catch (error) {
      console.error("❌ Registration error:", error.message);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    logoutUser();
    localStorage.removeItem("token");
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
