import PropTypes from "prop-types";
import styles from "./SummarySection.module.css";

const SummarySection = ({ recommendedFoods }) => {
  return (
    <div className={styles.summarySection}>
      <h4>Food not recommended</h4>
      <p>Your diet will be displayed here</p>
      <ul>
        {recommendedFoods.map((food, index) => (
          <li key={index}>{food}</li>
        ))}
      </ul>
    </div>
  );
};

SummarySection.propTypes = {
  recommendedFoods: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SummarySection;
