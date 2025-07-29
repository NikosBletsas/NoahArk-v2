
import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Send } from 'lucide-react';
import { BaseScreenProps } from '../types';
import { SCREEN_NAMES } from '../constants';
import AppHeader from './shared/AppHeader';

const AssignEmergencyScreen: React.FC<BaseScreenProps> = ({ theme, setCurrentScreen, isMidnightTheme }) => {
  const [dateTimeValue, setDateTimeValue] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  });

  const tableRows = Array(10).fill(null).map((_, index) => ({
    id: `${index + 1}`,
    availableFrom: '',
    availableUntil: '',
    doctorName: '',
    speciality: '',
    hospital: '',
  }));

  const tableHeaders = ["ID", "Available From", "Available Until", "Doctor Name", "Speciality", "Hospital"];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex flex-col`}>
      <AppHeader 
        theme={theme} 
        title="NOAH - Assign Emergency" 
        onBack={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)}
        showThemeButton={true}
        isMidnightTheme={isMidnightTheme}
      />

      <div className="p-3 sm:p-4 md:p-6 flex-grow">
        <div className={`${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 md:p-8 flex flex-col h-full`}>
          <div className={`bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} p-3 sm:p-4 md:p-5 rounded-t-lg sm:rounded-t-xl -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 md:-mx-8 md:-mt-8 mb-4 sm:mb-6 md:mb-8`}>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-center sm:text-left">Assign Emergency</h2>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto mb-4 sm:mb-6 md:mb-8">
            <div className="h-60 sm:h-72 md:h-80 overflow-y-auto border ${isMidnightTheme ? 'border-gray-700/60' : 'border-gray-300/70'} rounded-lg">
              <table className="min-w-full text-xs sm:text-sm md:text-base">
                <thead className={`sticky top-0 ${theme.accent} ${theme.textOnAccent}`}>
                  <tr>
                    {tableHeaders.map(header => (
                      <th key={header} className="px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 font-semibold text-left whitespace-nowrap">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`${isMidnightTheme ? 'bg-gray-800/60 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
                  {tableRows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={`border-b ${isMidnightTheme ? 'border-gray-700' : 'border-gray-200'} ${isMidnightTheme ? theme.textPrimary : 'text-gray-700'}`}>
                      <td className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 whitespace-nowrap">{row.id}</td>
                      <td className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 whitespace-nowrap">{row.availableFrom}</td>
                      <td className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 whitespace-nowrap">{row.availableUntil}</td>
                      <td className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 whitespace-nowrap">{row.doctorName}</td>
                      <td className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 whitespace-nowrap">{row.speciality}</td>
                      <td className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 whitespace-nowrap">{row.hospital}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Date-Time Input and Buttons Section */}
          <div className="mt-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
            {/* Left side: Date-Time Input and Send Button */}
            <div className="flex flex-col gap-2">
              <label htmlFor="availability-datetime" className={`block text-xs sm:text-sm font-medium ${theme.textSecondary}`}>
                Date - Time to check availability from
              </label>
              <input
                type="datetime-local"
                id="availability-datetime"
                value={dateTimeValue}
                onChange={(e) => setDateTimeValue(e.target.value)}
                className={`w-full sm:w-auto px-3 py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} ${theme.inputPlaceholder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
              />
              <button 
                className={`bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium text-sm sm:text-base`}
              >
                <Send size={18} />
                <span>Send Data to DrTMA</span>
              </button>
            </div>

            {/* Right side: Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                className={`bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium text-sm sm:text-base`}
              >
                <RefreshCw size={18} />
                <span>Refresh List</span>
              </button>
              <button
                onClick={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)}
                className={`bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium text-sm sm:text-base`}
              >
                <ArrowLeft size={18} />
                <span>Return</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignEmergencyScreen;
