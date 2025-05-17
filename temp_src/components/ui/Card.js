import React from 'react';

const Card = ({ 
  children, 
  title, 
  className = "", 
  footer = null,
  isHoverable = false 
}) => {
  const hoverClass = isHoverable ? 'transform transition-transform duration-300 hover:scale-105 hover:shadow-lg' : '';
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${hoverClass} ${className}`}>
      {title && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
