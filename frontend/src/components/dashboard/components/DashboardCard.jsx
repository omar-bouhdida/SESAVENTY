import React from 'react';

/**
 * A reusable card component for dashboard layouts.
 * 
 * @param {string} title - The title to display at the top of the card
 * @param {React.ReactNode} children - The main content of the card
 * @param {React.ReactNode} [actions] - Optional action buttons/elements to display in the header
 * @param {string} [className=''] - Additional CSS classes to apply to the card container
 */
const DashboardCard = ({ 
  title, 
  children, 
  actions,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">{title}</h2>
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;