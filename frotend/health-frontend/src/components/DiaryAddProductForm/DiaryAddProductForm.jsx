import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./DiaryAddProductForm.module.css";

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
    <form onSubmit={handleSubmit} className={styles["form-container"]}>
      <input
        type="text"
        placeholder="Product name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className={styles["input-field"]}
      />
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        className={styles["input-field"]}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

DiaryAddProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
};

export default DiaryAddProductForm;
