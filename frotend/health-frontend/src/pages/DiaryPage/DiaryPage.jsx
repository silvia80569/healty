import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import DiaryDateCalendar from "../../components/DiaryDateCalendar/DiaryDateCalendar";
import DiaryAddProductForm from "../../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../../components/DiaryProductsList/DiaryProductsList";
import Loader from "../../components/Loader/Loader";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";

const DiaryPage = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${user._id}`);
        setProducts(response.data);
      } catch (error) {
        setError("Error when picking up the products.");
        setErrorVisible(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProducts();
    }
  }, [user]);

  const addProduct = async (product) => {
    try {
      const response = await api.post("/products", {
        ...product,
        userId: user._id,
      });
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      setError("Error when picking up the products.");
      setErrorVisible(true);
      console.error(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      setError("Error when picking up the products.");
      setErrorVisible(true);
      console.error(error);
    }
  };

  const closeErrorAlert = () => {
    setErrorVisible(false);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="diary-page">
        <h1>Daily Food Diary</h1>
        <DiaryDateCalendar />
        <DiaryAddProductForm onAddProduct={addProduct} />
        {loading ? (
          <Loader />
        ) : (
          <DiaryProductsList
            products={products}
            onDeleteProduct={deleteProduct}
          />
        )}
        {errorVisible && (
          <ErrorAlert message={error} onClose={closeErrorAlert} />
        )}
      </div>
    </>
  );
};

export default DiaryPage;
