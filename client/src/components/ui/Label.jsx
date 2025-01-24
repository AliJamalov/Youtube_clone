import React from "react";

const Label = ({ htmlFor, children, className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={`font-medium block ${className}`}>
      {children}
    </label>
  );
};

export default Label;
