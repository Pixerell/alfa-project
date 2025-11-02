import React from "react";
import { type Product } from "../../../api/types";
import { useAppDispatch } from "../../../store/store";
import { deleteProduct, toggleLike } from "../../../store/productsSlice";
import "./ProductCard.css";

type Props = {
  product: Product;
  onClick?: () => void;
  clickable?: boolean;
};

export const ProductCard: React.FC<Props> = React.memo(
  ({ product, onClick, clickable = true }) => {
    const dispatch = useAppDispatch();
    const handleLike = (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(toggleLike(product.id));
    };
    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(deleteProduct(product.id));
    };

    return (
      <div
        className={`product-card ${clickable ? "clickable" : ""}`}
        onClick={clickable && onClick ? onClick : undefined}
      >
        <div className='image-wrapper'>
          <img
            src={product.image}
            alt={product.title}
            className='product-image'
          />

          {clickable && (
            <>
              <button
                onClick={handleLike}
                className={`icon-button like-button ${
                  product.liked ? "liked" : ""
                }`}
              >
                ♥
              </button>

              <button
                onClick={handleDelete}
                className='icon-button delete-button'
              >
                🗑️
              </button>
            </>
          )}
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
