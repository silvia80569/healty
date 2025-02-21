import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import DiaryDateCalendar from "../../components/DiaryDateCalendar/DiaryDateCalendar";
import DiaryAddProductForm from "../../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../../components/DiaryProductsList/DiaryProductsList";

const DiaryPage = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="diary-page">
        <h1>Daily Food Diary</h1>
        <DiaryDateCalendar />
        <DiaryAddProductForm onAddProduct={addProduct} />
        <DiaryProductsList
          products={products}
          onDeleteProduct={deleteProduct}
        />
      </div>
    </>
  );
};

export default DiaryPage;
