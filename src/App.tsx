import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./store/store";
import { fetchProducts } from "./api/fetchProducts";
import ProductsPage from "./ui/pages/ProductsPage/ProductsPage";
import ProductPage from "./ui/pages/ProductPage/ProductPage";

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
      </Routes>
    </Router>
  );
};

export default App;
