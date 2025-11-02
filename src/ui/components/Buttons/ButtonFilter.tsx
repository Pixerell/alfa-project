import React from "react";
import "./basebutton.css";
import type { SortOption } from "../../../api/types";

type ButtonFilterProps = {
  active?: boolean;
  state?: SortOption; // for tri-state buttons
  onClick: () => void;
  label: string;
  title?: string;
};

export const ButtonFilter: React.FC<ButtonFilterProps> = React.memo(
  ({ active, state, onClick, label, title }) => {
    const isActive =
      active !== undefined ? active : state !== undefined && state !== "off";

    return (
      <button
        className={`button ${isActive ? "active" : ""}`}
        onClick={onClick}
        aria-pressed={active}
        title={title}
      >
        {label}
      </button>
    );
  }
);
