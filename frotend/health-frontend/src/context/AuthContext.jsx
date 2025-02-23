/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserData,
} from "../services/userService";
import Loader from "../components/Loader/Loader";
import ErrorAlert from "../components/ErrorAlert/ErrorAlert";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      getUserDataFromAPI(token);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getUserDataFromAPI = async (token) => {
    try {
      setError(null);
      const data = await getUserData(token);
      setUser(data);
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
      setError(
        error.response?.data?.message ||
          "Failed to fetch user data. Please try logging in again."
      );
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const data = await loginUser(credentials);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      console.log("🔹 Login success:", data.user);
      return data.user;
    } catch (error) {
      console.error("❌ Login error:", error.message);
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      return null;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const data = await registerUser(userData);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      console.log("🔹 Register success:", data.user);
      return data.user;
    } catch (error) {
      console.error("❌ Registration error:", error.message);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
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
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {error && <ErrorAlert message={error} />}
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
