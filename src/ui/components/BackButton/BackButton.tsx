import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

type Props = {
  label?: string;
};

export const BackButton: React.FC<Props> = React.memo(
  ({ label = "◀ Back" }) => {
    const navigate = useNavigate();

    return (
      <div className='back-btn' onClick={() => navigate(-1)} title='Go back'>
        {label}
      </div>
    );
  }
);

export default BackButton;
