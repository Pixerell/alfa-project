import React from "react";
import "./FilterButton.css";

type FilterButtonProps = {
  active: boolean;
  onClick: () => void;
  label: string;
  title?: string;
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  active,
  onClick,
  label,
  title,
}) => {
  return (
    <div
      className={`products-filter-btn ${active ? "active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
      title={title}
    >
      {label}
    </div>
  );
};
