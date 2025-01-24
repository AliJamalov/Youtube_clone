import React from "react";

const Input = ({
  type = "text",
  placeholder = "",
  value = "",
  onChange = () => {},
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border rounded-lg p-2 w-full outline-none ${className}`}
      {...props}
    />
  );
};

export default Input;
