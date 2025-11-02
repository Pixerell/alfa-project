import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";
import type { Product } from "../../../api/types";

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = React.memo(({ products }) => {
  const navigate = useNavigate();

  if (!products.length) return <p className='status-text'>No products found</p>;

  return (
    <div className='product-list'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => navigate(`/products/${product.id}`)}
        />
      ))}
    </div>
  );
});
