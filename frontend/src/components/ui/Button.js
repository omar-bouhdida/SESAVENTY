import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  className = "",
  disabled = false 
}) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors";
  
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500"
  };
  
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
