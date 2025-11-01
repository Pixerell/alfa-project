import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./store/store";
import { ProductList } from "./ui/components/ProductList/productList";
import { fetchProducts } from "./api/fetchProducts";

//        <Route path='/products/:id' element={<ProductPage />} />

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProductList />} />
      </Routes>
    </Router>
  );
};

export default App;
