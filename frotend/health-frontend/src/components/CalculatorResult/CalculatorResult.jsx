import PropTypes from "prop-types";

const CalculatorResult = ({ products, onDeleteProduct }) => {
  return (
    <div>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.calories} kcal
            <button onClick={() => onDeleteProduct(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

CalculatorResult.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  totalCalories: PropTypes.number.isRequired,
};

export default CalculatorResult;
