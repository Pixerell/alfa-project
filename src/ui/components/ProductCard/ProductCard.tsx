import React from "react";
import { type Product } from "../../../api/types";
import { useAppDispatch } from "../../../store/store";
import { deleteProduct, toggleLike } from "../../../store/productsSlice";
import "./ProductCard.css";

type Props = {
  product: Product;
  onClick?: () => void;
};

export const ProductCard: React.FC<Props> = React.memo(
  ({ product, onClick }) => {
    const dispatch = useAppDispatch();

    return (
      <div className='product-card' onClick={onClick}>
        <div className='image-wrapper'>
          <img
            src={product.image}
            alt={product.title}
            className='product-image'
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleLike(product.id));
            }}
            className={`icon-button like-button ${
              product.liked ? "liked" : ""
            }`}
          >
            ♥
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteProduct(product.id));
            }}
            className='icon-button delete-button'
          >
            🗑️
          </button>
        </div>

        <div className='product-body'>
          <p className='product-price'>${product.price}</p>
          <h3 className='product-title'>{product.title}</h3>
          <p className='product-category'>{product.category}</p>
        </div>
      </div>
    );
  }
);
