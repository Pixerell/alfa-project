import React, { useCallback, useState } from "react";
import { ProductList } from "../../components/ProductList/ProductList";
import "./ProductsPage.css";
import { ButtonFilter } from "../../components/Buttons/ButtonFilter";
import type { SortOption } from "../../../api/types";
import { useFilteredProducts } from "../../../domain/useFilteredProducts";
import { createExclusiveCycleSort } from "../../../domain/cycleSort";
import { ButtonNavigateCreate } from "../../components/Buttons/ButtonNavigateCreate";
import { useAppSelector } from "../../../store/store";

export const ProductsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [search, setSearch] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [sortAlphabetically, setSortAlphabetically] =
    useState<SortOption>("off");
  const [sortByPrice, setSortByPrice] = useState<SortOption>("off");
  const loading = useAppSelector((state) => state.products.loading);

  const handleFilterChange = useCallback((callback: () => void) => {
    setCurrentPage(1);
    callback();
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setCurrentPage(1);
    setSearch(value);
  }, []);

  const setSort = useCallback(
    (type: "alpha" | "price") =>
      handleFilterChange(() => {
        if (type === "alpha") {
          createExclusiveCycleSort(setSortAlphabetically, [setSortByPrice])();
        } else {
          createExclusiveCycleSort(setSortByPrice, [setSortAlphabetically])();
        }
      }),
    [handleFilterChange]
  );

  const toggleFavorites = useCallback(
    () => handleFilterChange(() => setOnlyFavorites((v) => !v)),
    [handleFilterChange]
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
      <header>
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
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className='products-active-row-right'>
            <ButtonFilter
              active={onlyFavorites}
              onClick={toggleFavorites}
              label={onlyFavorites ? "Favorites: ON" : "Favorites: OFF"}
              title='Show only favorites'
            />
            <ButtonFilter
              onClick={() => setSort("alpha")}
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

            <ButtonFilter
              onClick={() => setSort("price")}
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
      </header>
      <main>
        {loading ? (
          <p className='status-text'>Loading products...</p>
        ) : paginatedItems.length ? (
          <ProductList products={paginatedItems} />
        ) : (
          <p className='status-text'>No products found</p>
        )}
      </main>
      <footer>
        <div className='pagination'>
          <div className='pagination-top'>
            <ButtonNavigateCreate />
          </div>
          <div className='pagination-bottom'>
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
      </footer>
    </div>
  );
};

export default ProductsPage;
