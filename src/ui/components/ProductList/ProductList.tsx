import React, { useCallback, useMemo } from "react";
import { useAppSelector } from "../../../store/store";
import { ProductCard } from "../ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

type Props = {
  search?: string;
  onlyFavorites?: boolean;
};

export const ProductList: React.FC<Props> = ({
  search = "",
  onlyFavorites = false,
}) => {
  const navigate = useNavigate();
  const { items, loading, error } = useAppSelector((s) => s.products);

  const handleClick = useCallback(
    (id: number) => {
      navigate(`/products/${id}`);
    },
    [navigate]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((p) => {
      if (onlyFavorites && !p.liked) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    });
  }, [items, search, onlyFavorites]);

  if (loading) return <p className='status-text'>Loading...</p>;
  if (error) return <p className='status-text error'>{error}</p>;
  if (filtered.length === 0) {
    return <p className='status-text'>No products found.</p>;
  }

  return (
    <div className='product-list'>
      {filtered.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => handleClick(product.id)}
        />
      ))}
    </div>
  );
};
