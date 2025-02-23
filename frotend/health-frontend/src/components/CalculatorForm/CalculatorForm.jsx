import { useState } from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const CalculatorForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.trim() || !calories.trim()) return;

    const parsedCalories = parseInt(calories, 10);
    if (isNaN(parsedCalories) || parsedCalories <= 0) return;

    onAddProduct({ name: product, calories: parseInt(calories) });
    setProduct("");
    setCalories("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />{" "}
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <button type="submit">+</button>
    </form>
  );
};

CalculatorForm.PropTypes = {
  onAddProduct: PropTypes.func.isRequired,
};
export default CalculatorForm;
