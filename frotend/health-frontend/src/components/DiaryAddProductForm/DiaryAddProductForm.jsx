import { useState } from "react";
import PropTypes from "prop-types";

const DiaryAddProductForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product && calories) {
      onAddProduct({ product, calories: Number(calories) });
      setProduct("");
      setCalories("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

DiaryAddProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
};

export default DiaryAddProductForm;
