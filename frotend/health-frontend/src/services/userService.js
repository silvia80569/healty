import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Creăm o instanță Axios pentru configurarea default
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funcție pentru login
export const loginUser = async (credentials) => {
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
export const registerUser = async (userData) => {
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

// Funcție pentru a obține datele utilizatorului
export const getUserData = async () => {
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

// Funcție pentru logout
export const logoutUser = () => {
  localStorage.removeItem("token"); // Ștergem token-ul din localStorage
};