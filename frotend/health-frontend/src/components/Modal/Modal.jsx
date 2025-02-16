import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Modal.module.css";

const Modal = ({ recommendedCalories, foodsToAvoid, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartLosingWeight = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/save-weight-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          calories: recommendedCalories,
          foodsToAvoid,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data.");
      }

      alert("Data saved successfully!");

      onClose();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        <h2>
          Your recommended daily calorie intake is {recommendedCalories} ккал
        </h2>
        <h3>Foods you should not eat:</h3>
        <ul>
          {foodsToAvoid.map((food, index) => (
            <li key={index}>{food}</li>
          ))}
        </ul>
        <div className={styles.buttonContainer}>
          <button onClick={handleStartLosingWeight} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Start Losing Weight"}
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  recommendedCalories: PropTypes.number.isRequired,
  foodsToAvoid: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
