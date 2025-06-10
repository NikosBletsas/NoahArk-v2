
import React from 'react';
import { Theme } from '../../types';

interface CheckboxGridProps {
  options: string[];
  theme: Theme;
  columns?: 1 | 2 | 3 | 4 | 5 | 6; 
  columnsSM?: 1 | 2 | 3 | 4 | 5 | 6;
  columnsMD?: 1 | 2 | 3 | 4 | 5 | 6;
  columnsLG?: 1 | 2 | 3 | 4 | 5 | 6;
  columnsXL?: 1 | 2 | 3 | 4 | 5 | 6; 
  columns2XL?: 1 | 2 | 3 | 4 | 5 | 6; 
}

const CheckboxGrid: React.FC<CheckboxGridProps> = ({ 
  options, 
  theme, 
  columns = 1, 
  columnsSM, 
  columnsMD, 
  columnsLG,
  columnsXL,
  columns2XL
}) => {
  const getColumnClass = (count?: number, prefix: string = ''): string => {
    if (!count) return '';
    const classMap: Record<number, string> = {
      1: `${prefix}grid-cols-1`, 2: `${prefix}grid-cols-2`, 3: `${prefix}grid-cols-3`,
      4: `${prefix}grid-cols-4`, 5: `${prefix}grid-cols-5`, 6: `${prefix}grid-cols-6`,
    };
    return classMap[count] || `${prefix}grid-cols-1`;
  };

  let gridClasses = `grid ${getColumnClass(columns)}`;
  gridClasses += ` ${getColumnClass(columnsSM, 'sm:') || getColumnClass(columns > 2 ? 2 : columns, 'sm:')}`;
  gridClasses += ` ${getColumnClass(columnsMD, 'md:') || getColumnClass(columnsSM || (columns > 3 ? 3 : columns), 'md:')}`;
  gridClasses += ` ${getColumnClass(columnsLG, 'lg:') || getColumnClass(columnsMD || columnsSM || (columns > 4 ? 4 : columns), 'lg:')}`;
  gridClasses += ` ${getColumnClass(columnsXL, 'xl:') || getColumnClass(columnsLG || columnsMD || columnsSM || (columns > 5 ? 5 : columns), 'xl:')}`;
  gridClasses += ` ${getColumnClass(columns2XL, '2xl:') || getColumnClass(columnsXL || columnsLG || columnsMD || columnsSM || columns , '2xl:')}`;
  
  gridClasses = gridClasses.replace(/\s+/g, ' ').trim(); // Clean up multiple spaces

  return (
    <div className={`${gridClasses} gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6 gap-y-2 sm:gap-y-3 md:gap-y-3.5 lg:gap-y-4`}>
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 cursor-pointer group">
          <input
            type="checkbox"
            className={`form-checkbox h-4 w-4 sm:h-5 sm:h-5 md:h-5 md:w-5 lg:h-6 lg:w-6 rounded ${theme.inputBorder} text-blue-600 focus:ring-blue-500 transition duration-150 ease-in-out`}
          />
          <span className={`${theme.textPrimary} text-xs sm:text-sm md:text-base lg:text-lg group-hover:${theme.textSecondary}`}>{option}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxGrid;