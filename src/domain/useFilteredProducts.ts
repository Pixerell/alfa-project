import { useMemo } from "react";
import { useAppSelector } from "../store/store";
import type { SortOption } from "../api/types";

interface UseFilteredProductsParams {
  search: string;
  onlyFavorites: boolean;
  sortAlphabetically: SortOption;
  sortByPrice: SortOption;
  currentPage: number;
  itemsPerPage: number;
}

export const useFilteredProducts = ({
  search,
  onlyFavorites,
  sortAlphabetically,
  sortByPrice,
  currentPage,
  itemsPerPage,
}: UseFilteredProductsParams) => {
  const { items } = useAppSelector((state) => state.products);

  const filteredAndSorted = useMemo(() => {
    let filtered = items.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesFavorite = onlyFavorites ? p.liked : true;
      return matchesSearch && matchesFavorite;
    });

    if (sortAlphabetically === "asc") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortAlphabetically === "desc") {
      filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortByPrice === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortByPrice === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [items, search, onlyFavorites, sortAlphabetically, sortByPrice]);

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredAndSorted.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return { paginatedItems, totalPages };
};
