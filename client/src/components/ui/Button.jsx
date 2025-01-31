import React from "react";

const Button = ({
  children,
  onClick = () => {},
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 flex items-center justify-center cursor-pointer rounded text-white disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
