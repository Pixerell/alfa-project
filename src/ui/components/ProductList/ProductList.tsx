import React, { useCallback } from "react";
import { useAppSelector } from "../../../store/store";
import { ProductCard } from "../ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

export const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, error } = useAppSelector((s) => s.products);

  const handleClick = useCallback(
    (id: number) => {
      navigate(`/products/${id}`);
    },
    [navigate]
  );

  if (loading) return <p className='status-text'>Loading...</p>;
  if (error) return <p className='status-text error'>{error}</p>;

  return (
    <div className='product-list'>
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => handleClick(product.id)}
        />
      ))}
    </div>
  );
};
