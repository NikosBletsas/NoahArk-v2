import React from 'react';
import { Theme } from '../../types';

interface CheckboxGridProps {
  options: string[];
  theme: Theme;
  onFormChange?: () => void;
  columns?: number;
  columnsSM?: number;
  columnsMD?: number;
  columnsLG?: number;
  columnsXL?: number;
  columns2XL?: number;
}

const CheckboxGrid: React.FC<CheckboxGridProps> = ({
  options,
  theme,
  onFormChange,
  columns = 1,
  columnsSM = 2,
  columnsMD = 3,
  columnsLG = 4,
  columnsXL = 5,
  columns2XL = 6,
}) => {
  const gridClasses = `grid grid-cols-${columns} sm:grid-cols-${columnsSM} md:grid-cols-${columnsMD} lg:grid-cols-${columnsLG} xl:grid-cols-${columnsXL} 2xl:grid-cols-${columns2XL} gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-1.5 sm:gap-y-2 md:gap-y-2.5`;

  return (
    <div className={gridClasses}>
      {options.map((option) => (
        <label
          key={option}
          htmlFor={`checkbox-${option.toLowerCase().replace(/\s+/g, '-')}`}
          className="flex items-center space-x-2 sm:space-x-2.5 cursor-pointer group"
        >
          <input
            type="checkbox"
            id={`checkbox-${option.toLowerCase().replace(/\s+/g, '-')}`}
            onChange={onFormChange}
            className={`form-checkbox h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded ${theme.inputBorder} text-blue-600 focus:ring-blue-500 transition duration-150 ease-in-out`}
          />
          <span className={`${theme.textPrimary} text-xs sm:text-sm md:text-base group-hover:${theme.textSecondary}`}>
            {option}
          </span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxGrid;
