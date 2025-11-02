import React from "react";
import "./basebutton.css";

type ButtonCreateProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonCreate: React.FC<ButtonCreateProps> = React.memo(
  ({ children = "Create", className, ...props }) => (
    <button {...props} className={`button ${className || ""}`}>
      {children}
    </button>
  )
);
