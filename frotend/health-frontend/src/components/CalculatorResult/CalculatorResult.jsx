import PropTypes from "prop-types";
import styles from "./CalculatorResult.module.css";

const CalculatorResult = ({ result }) => {
  return (
    <div className={styles.summarySection}>
      <h3>Summary for {result.date}</h3>
      <p>Left: {result.left} kcal</p>
      <p>Consumed: {result.consumed} kcal</p>
      <p>Daily rate: {result.dailyRate} kcal</p>
      <p>
        {result.normalPercentage}% of normal: {result.normalKcal} kcal
      </p>
    </div>
  );
};

CalculatorResult.propTypes = {
  result: PropTypes.shape({
    date: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    consumed: PropTypes.number.isRequired,
    dailyRate: PropTypes.number.isRequired,
    normalPercentage: PropTypes.number.isRequired,
    normalKcal: PropTypes.number.isRequired,
  }).isRequired,
};

export default CalculatorResult;
