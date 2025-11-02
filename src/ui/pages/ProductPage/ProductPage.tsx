import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/store";
import "./ProductPage.css";
import BackButton from "../../components/BackButton/BackButton";

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { items } = useAppSelector((state) => state.products);

  const product = items.find((p) => p.id === Number(id));

  if (!product) return <p className='status-text'>Product not found</p>;

  return (
    <div className='product-page'>
      <BackButton />
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <div className='product-page-description'>
        <div className='product-page-description-price'>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
        </div>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
