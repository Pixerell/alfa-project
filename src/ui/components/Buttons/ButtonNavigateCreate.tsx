import React from "react";
import { useNavigate } from "react-router-dom";
import "./basebutton.css";

type ButtonNavigateCreateProps = {
  label?: string;
};

export const ButtonNavigateCreate: React.FC<ButtonNavigateCreateProps> =
  React.memo(({ label }) => {
    const navigate = useNavigate();
    const handleClick = () => navigate("/create-product");
    return (
      <button
        className='button'
        onClick={handleClick}
        title='Create new product'
      >
        {label || "Create Product"}
      </button>
    );
  });
