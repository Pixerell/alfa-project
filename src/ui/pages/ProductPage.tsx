import React, { useState } from "react";
import { ProductList } from "../components/ProductList/ProductList";
import "./ProductPage.css";
import { FilterButton } from "../components/FilterButton/FilterButton";

export const ProductsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  return (
    <div className='products-page'>
      <h2>Products</h2>
      <div className='products-active-row'>
        <div className='products-active-row-left'>
          <label htmlFor='search' className='products-label'>
            Search:
          </label>
          <input
            id='search'
            className='products-search'
            type='search'
            placeholder='Search title...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className='products-active-row-right'>
          <FilterButton
            active={onlyFavorites}
            onClick={() => setOnlyFavorites((v) => !v)}
            label={onlyFavorites ? "Favorites: ON" : "Favorites: OFF"}
            title='Show only favorites'
          />
        </div>
      </div>
      <ProductList search={search} onlyFavorites={onlyFavorites} />
    </div>
  );
};

export default ProductsPage;
