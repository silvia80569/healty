import PropTypes from "prop-types";
import styles from "./CalculatorForm.module.css";

const CalculatorForm = ({ formData, handleChange, handleSubmit }) => {
  return (
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
  );
};

CalculatorForm.propTypes = {
  formData: PropTypes.shape({
    height: PropTypes.string.isRequired,
    currentWeight: PropTypes.string.isRequired,
    desiredWeight: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    bloodType: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CalculatorForm;
