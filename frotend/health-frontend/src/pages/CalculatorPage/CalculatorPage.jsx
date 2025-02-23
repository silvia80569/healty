import { useState } from "react";
import styles from "./CalculatorPage.module.css";

const CalculatorPage = () => {
  const [formData, setFormData] = useState({
    height: "",
    currentWeight: "",
    desiredWeight: "",
    age: "",
    bloodType: "1",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Calculating daily calorie intake with:", formData);
  };
  return (
    <div>
      <div className={styles.formSection}>
        <h1>Calculate your daily calorie intake right now</h1>
        <form onSubmit={handleSubmit} className={styles.calculatorForm}>
          <input
            type="number"
            name="height"
            placeholder="Height *"
            value={formData.height}
            onChange={handleChange}
          />
          <input
            type="number"
            name="currentWeight"
            placeholder="Current weight *"
            value={formData.currentWeight}
            onChange={handleChange}
          />
          <input
            type="number"
            name="desiredWeight"
            placeholder="Desired weight *"
            value={formData.desiredWeight}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age *"
            value={formData.age}
            onChange={handleChange}
          />
          <div className={styles.bloodType}>
            <label>Blood type *</label>
            {[1, 2, 3, 4].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="bloodType"
                  value={type}
                  checked={formData.bloodType === String(type)}
                  onChange={handleChange}
                />
                {type}
              </label>
            ))}
          </div>
          <button type="submit" className={styles.submitButton}>
            Start losing weight
          </button>
        </form>
      </div>
      <div className={styles.summarySection}>
        <h3>Summary for 13.08.2023</h3>
        <p>Left: 000 kcal</p>
        <p>Consumed: 000 kcal</p>
        <p>Daily rate: 000 kcal</p>
        <p>n% of normal: 000 kcal</p>
        <h4>Food not recommended</h4>
        <p>Your diet will be displayed here</p>
      </div>
    </div>
  );
};

export default CalculatorPage;
