import PropTypes from "prop-types";

const DiaryProductsList = ({ products, onDeleteProduct }) => {
  return (
    <ul>
      {products.map((item, index) => (
        <li key={index}>
          {item.product} - {item.calories} kcal
          <button onClick={() => onDeleteProduct(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

DiaryProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
};

export default DiaryProductsList;
