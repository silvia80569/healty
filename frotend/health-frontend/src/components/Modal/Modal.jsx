import PropTypes from "prop-types";
const Modal = ({ recommendedCalories, foodsToAvoid, onClose }) => {
  if (!recommendedCalories) {
    console.error("recommendedCalories is not valid");
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>
          Your recommended daily calorie intake is {recommendedCalories} ккал
        </h2>
        <h3>Foods you should not eat:</h3>
        <ul>
          {foodsToAvoid.map((food, index) => (
            <li key={index}>{food}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
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
