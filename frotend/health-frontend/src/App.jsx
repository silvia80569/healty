import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import DiaryPage from "./pages/DiaryPage/DiaryPage";
import CalculatorPage from "./pages/CalculatorPage/CalculatorPage";
//import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        {/*temporar fac aceasta pagina*/}
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />

        {/* <Route element={<PrivateRoute />}>
          <Route path="/privat" element={< />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
