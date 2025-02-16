import axios from 'axios';

// API URL din fișierul de mediu (.env)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Creăm o instanță Axios pentru configurarea default
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funcție pentru login
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Stocăm token-ul
      return response.data; // Returnăm user-ul și token-ul
    }
    throw new Error("Login failed");
  } catch (error) {
    console.error("❌ Login error:", error.message);
    throw error; // Aruncăm eroarea pentru a fi gestionată în componentă
  }
};

// Funcție pentru register
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Stocăm token-ul
      return response.data; // Returnăm user-ul și token-ul
    }
    throw new Error("Registration failed");
  } catch (error) {
    console.error("❌ Registration error:", error.message);
    throw error; // Aruncăm eroarea pentru a fi gestionată în componentă
  }
};

// Funcție pentru logout
export const logout = () => {
  localStorage.removeItem("token"); // Ștergem token-ul din localStorage
};

// Funcție pentru verificarea dacă utilizatorul este autentificat
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

// Funcție pentru obținerea datelor utilizatorului autentificat
export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axiosInstance.get("/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching user data:", error.message);
    throw error;
  }
};
