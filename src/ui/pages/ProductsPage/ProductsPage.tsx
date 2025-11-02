import React, { useState } from "react";
import { ProductList } from "../../components/ProductList/ProductList";
import "./ProductsPage.css";
import { FilterButton } from "../../components/FilterButton/FilterButton";
import type { SortOption } from "../../../api/types";
import { useFilteredProducts } from "../../../domain/useFilteredProducts";
import { createExclusiveCycleSort } from "../../../domain/cycleSort";

export const ProductsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [search, setSearch] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [sortAlphabetically, setSortAlphabetically] =
    useState<SortOption>("off");
  const [sortByPrice, setSortByPrice] = useState<SortOption>("off");

  const cycleAlpha = createExclusiveCycleSort(
    setSortAlphabetically,
    setSortByPrice
  );
  const cyclePrice = createExclusiveCycleSort(
    setSortByPrice,
    setSortAlphabetically
  );

  const { paginatedItems, totalPages } = useFilteredProducts({
    search,
    onlyFavorites,
    sortAlphabetically,
    sortByPrice,
    currentPage,
    itemsPerPage,
  });

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

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
          <FilterButton
            onClick={cycleAlpha}
            state={sortAlphabetically}
            label={
              sortAlphabetically === "asc"
                ? "A-Z"
                : sortAlphabetically === "desc"
                ? "Z-A"
                : "A-Z?"
            }
            title='Sort alphabetically'
          />

          <FilterButton
            onClick={cyclePrice}
            state={sortByPrice}
            label={
              sortByPrice === "asc"
                ? "Price ↑"
                : sortByPrice === "desc"
                ? "Price ↓"
                : "Price?"
            }
            title='Sort by price'
          />
        </div>
      </div>
      <ProductList products={paginatedItems} />

      <div className='pagination'>
        <button onClick={goPrev} disabled={currentPage === 1}>
          ◀
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
