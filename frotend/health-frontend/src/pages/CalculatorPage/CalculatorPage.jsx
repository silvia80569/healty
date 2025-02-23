import { useEffect, useState } from "react";
import styles from "./CalculatorPage.module.css";
import api from "../../services/api";
import CalculatorForm from "../../components/CalculatorForm/CalculatorForm";
import CalculatorResult from "../../components/CalculatorResult/CalculatorResult";
import SummarySection from "../../components/SummarySection/SummarySection";
import Loader from "../../components/Loader/Loader";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";

const CalculatorPage = () => {
  const [formData, setFormData] = useState({
    height: "",
    currentWeight: "",
    desiredWeight: "",
    age: "",
    bloodType: "1",
  });

  const [result] = useState({
    date: new Date().toLocaleDateString(),
    left: 0,
    consumed: 0,
    dailyRate: 0,
    normalPercentage: 0,
    normalKcal: 0,
  });

  const [recommendedFoods, setRecommendedFoods] = useState([]);
  const [, setCalorieLog] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Calculating daily calorie intake with:", formData);

    const today = new Date().toLocaleDateString();
    const newResult = {
      ...result,
      date: today,
      left: 2000,
      consumed: 1500,
      dailyRate: 1800,
      normalPercentage: 80,
      normalKcal: 1440,
    };

    setIsLoading(true);
    setError(null);

    try {
      await api.post("/api/calorie-log", newResult);

      setCalorieLog((prevLog) => [...prevLog, newResult]);

      setRecommendedFoods(["Soda", "Fast food", "Candy"]);
    } catch (error) {
      setError("Failed to save calorie log.");
      console.error("Error saving calorie log:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.formSection}>
        <h1>Calculate your daily calorie intake right now</h1>
        <CalculatorForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>

      {isLoading && <Loader />}
      {error && <ErrorAlert message={error} />}
      <CalculatorResult result={result} />
      <SummarySection recommendedFoods={recommendedFoods} />
    </div>
  );
};
export default CalculatorPage;
