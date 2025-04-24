import React from 'react';

/**
 * Color theme configuration for the card background and text
 */
const colors = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
};

/**
 * Color theme configuration for the icon container
 */
const iconColors = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  red: 'bg-red-100 text-red-600',
  purple: 'bg-purple-100 text-purple-600',
};

/**
 * A stat card component for displaying key metrics with an icon.
 * 
 * @param {string} title - The title of the stat card
 * @param {string|number} value - The main value to display
 * @param {string} [description] - Optional description text
 * @param {React.ReactNode} icon - Icon component to display
 * @param {'blue'|'green'|'yellow'|'red'|'purple'} color - Color theme for the card
 */
const StatCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  color 
}) => {
  return (
    <div className={`rounded-lg border ${colors[color]} p-5 transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium opacity-80">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {description && <p className="text-xs mt-1 opacity-70">{description}</p>}
        </div>
        <div className={`p-3 rounded-full ${iconColors[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;