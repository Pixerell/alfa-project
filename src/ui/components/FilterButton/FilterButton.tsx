import React from "react";
import "./FilterButton.css";
import type { SortOption } from "../../../api/types";

type FilterButtonProps = {
  active?: boolean;
  state?: SortOption; // for tri-state buttons
  onClick: () => void;
  label: string;
  title?: string;
};

export const FilterButton: React.FC<FilterButtonProps> = React.memo(
  ({ active, state, onClick, label, title }) => {
    const isActive =
      active !== undefined ? active : state !== undefined && state !== "off";

    return (
      <div
        className={`products-filter-btn ${isActive ? "active" : ""}`}
        onClick={onClick}
        aria-pressed={active}
        title={title}
      >
        {label}
      </div>
    );
  }
);
