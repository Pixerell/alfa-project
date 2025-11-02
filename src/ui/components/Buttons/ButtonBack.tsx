import React from "react";
import { useNavigate } from "react-router-dom";
import "./ButtonBack.css";
import "./basebutton.css";

type ButtonBackProps = {
  label?: string;
};

export const ButtonBack: React.FC<ButtonBackProps> = React.memo(
  ({ label = "◀ Back" }) => {
    const navigate = useNavigate();
    const handleClick = () => navigate(-1);
    return (
      <button className='button back-btn' onClick={handleClick} title='Go back'>
        {label}
      </button>
    );
  }
);
