import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./store/store";
import { fetchProducts } from "./api/fetchProducts";
import ProductsPage from "./ui/pages/ProductsPage/ProductsPage";
import ProductPage from "./ui/pages/ProductPage/ProductPage";
import CreateProductPage from "./ui/pages/CreateProductPage/CreateProduct";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path='/create-product' element={<CreateProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;
