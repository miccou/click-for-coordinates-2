"use client";

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...rest
}) => {
  const buttonClasses = `rounded-md px-4 py-2 text-white w-full shadow-sm ${
    variant === "primary" ? "bg-blue-500" : "bg-gray-500"
  }`;

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button;
