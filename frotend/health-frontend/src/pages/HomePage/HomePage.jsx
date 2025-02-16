import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [height, setHeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [age, setAge] = useState("");
  const [desiredWeight, setDesiredWeight] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [recommendedCalories, setRecommendedCalories] = useState(null);
  const [foodsToAvoid, setFoodsToAvoid] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchedCalories = 2800;
    const fetchedFoodsToAvoid = [
      "Flour products",
      "Milk",
      "Red meat",
      "Smoked meats",
    ];

    setRecommendedCalories(fetchedCalories);
    setFoodsToAvoid(fetchedFoodsToAvoid);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      <h1>Calculate your daily calorie intake right now</h1>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="height">Height *</label>
          <input
            type="number"
            id="height"
            placeholder="Enter your height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="age">Age *</label>
          <input
            type="number"
            id="age"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="currentWeight"> Current Weight * </label>
          <input
            type="number"
            id="currentWeight"
            placeholder="Enter your weight"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="desiredWeight"> Desired Weight * </label>
          <input
            type="number"
            id="desiredWeight"
            placeholder="Enter your weight"
            value={desiredWeight}
            onChange={(e) => setDesiredWeight(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Blood Type *</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="bloodType"
                value="A"
                checked={bloodType === "A"}
                onChange={(e) => setBloodType(e.target.value)}
              />
              A
            </label>
            <label>
              <input
                type="radio"
                name="bloodType"
                value="B"
                checked={bloodType === "B"}
                onChange={(e) => setBloodType(e.target.value)}
              />
              B
            </label>
            <label>
              <input
                type="radio"
                name="bloodType"
                value="AB"
                checked={bloodType === "AB"}
                onChange={(e) => setBloodType(e.target.value)}
              />
              AB
            </label>
            <label>
              <input
                type="radio"
                name="bloodType"
                value="0"
                checked={bloodType === "0"}
                onChange={(e) => setBloodType(e.target.value)}
              />
              0
            </label>
          </div>
        </div>
        <div>
          <button type="submit" className={styles.button}>
            Start Losing Weight
          </button>
        </div>
      </form>

      {modalVisible && (
        <Modal
          recommendedCalories={recommendedCalories}
          foodsToAvoid={foodsToAvoid}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default HomePage;
