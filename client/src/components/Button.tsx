import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
}) => {
  const baseStyles =
    "font-semibold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150";

  let variantStyles = "";
  switch (variant) {
    case "secondary":
      variantStyles =
        "bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-500";
      break;
    case "danger":
      variantStyles =
        "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500";
      break;
    default:
      variantStyles =
        "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500";
      break;
  }

  let sizeStyles = "";
  switch (size) {
    case "small":
      sizeStyles = "px-4 py-2 text-sm h-9";
      break;
    case "large":
      sizeStyles = "px-8 py-4 text-lg";
      break;
    default:
      sizeStyles = "px-6 py-3 text-base";
      break;
  }

  const disabledStyles = disabled ? "cursor-not-allowed opacity-50" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${disabledStyles} p-2`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
