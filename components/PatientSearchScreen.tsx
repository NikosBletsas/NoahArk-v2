
import React, { useState } from 'react';
import { ArrowLeft, Search, UserPlus } from 'lucide-react';
import { BaseScreenProps } from '../types';
import { SCREEN_NAMES } from '../constants';
import AppHeader from './shared/AppHeader';

const PatientSearchScreen: React.FC<BaseScreenProps> = ({ theme, setCurrentScreen, setShowThemeSelector, isMidnightTheme, currentThemeKey }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockPatients = Array(10).fill(null).map((_, i) => ({
    id: `P00${i + 1}`,
    name: `User${i + 1}`,
    surname: `Surname${i + 1}`,
    dob: `198${i}-0${(i % 9) + 1}-1${i % 3 + 1}`,
    gender: i % 2 === 0 ? 'Male' : 'Female',
  }));

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = ["Patient ID", "Surname", "Name", "Date of Birth", "Gender"];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex flex-col`}>
      <AppHeader
        theme={theme}
        title="NOAH - Patient Search"
        onBack={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)}
        showThemeButton={true}
        onShowThemeSelector={() => setShowThemeSelector?.(true)}
        isMidnightTheme={isMidnightTheme}
      />

      <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex-grow">
        <div className={`${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col h-full`}>
          {/* Search and Add Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 md:mb-8 space-y-3 sm:space-y-0">
            <div className="relative w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 pr-10 md:pr-12 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} ${theme.inputPlaceholder} rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base md:text-lg lg:text-xl`}
              />
              <Search className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 ${theme.textSecondary}`} />
            </div>
            <button
              onClick={() => setCurrentScreen(SCREEN_NAMES.EMERGENCY_CASE_DIAGNOSIS)}
              className={`w-full sm:w-auto bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg sm:rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5 sm:space-x-2 font-medium text-sm sm:text-base md:text-lg lg:text-xl`}
            >
              <UserPlus size={16} className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              <span>Add New Patient</span>
            </button>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto flex-grow">
            {/* Max height calculation can be tricky. This is a simpler approach. Consider more dynamic calculation if needed. */}
            <div className="max-h-[calc(100vh-300px)] sm:max-h-[calc(100vh-280px)] md:max-h-[calc(100vh-320px)] lg:max-h-[calc(100vh-300px)] overflow-y-auto border ${isMidnightTheme ? 'border-gray-700/60' : 'border-gray-300/70'} rounded-lg">
              <table className="min-w-full text-xs sm:text-sm md:text-base lg:text-lg">
                <thead className={`sticky top-0 ${theme.accent} ${theme.textOnAccent}`}>
                  <tr>
                    {tableHeaders.map(header => (
                      <th key={header} className="px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 font-semibold text-left whitespace-nowrap">
                        {header}
                      </th>
                    ))}
                     <th className="px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 font-semibold text-left whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className={`${isMidnightTheme ? 'bg-gray-800/60 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <tr key={patient.id} className={`border-b ${isMidnightTheme ? 'border-gray-700' : 'border-gray-200'} ${isMidnightTheme ? theme.textPrimary : 'text-gray-700'} hover:${isMidnightTheme ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 whitespace-nowrap">{patient.id}</td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 whitespace-nowrap">{patient.surname}</td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 whitespace-nowrap">{patient.name}</td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 whitespace-nowrap">{patient.dob}</td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 whitespace-nowrap">{patient.gender}</td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 whitespace-nowrap">
                          <button className={`${theme.icon} hover:opacity-75 transition-opacity text-xs sm:text-sm md:text-base lg:text-lg`}>View</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={tableHeaders.length + 1} className={`text-center py-6 sm:py-8 md:py-10 lg:py-12 ${theme.textSecondary}`}>
                        No patients found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className={`sticky bottom-0 left-0 right-0 bg-gradient-to-r ${theme.accent} p-3 sm:p-4 md:p-5 lg:p-6 border-t ${isMidnightTheme || currentThemeKey === 'black' ? 'border-gray-600' : 'border-white/10'}`}>
        <div className="flex justify-center">
          <button
            onClick={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)}
            className={`flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 bg-white/20 ${currentThemeKey === 'black' ? 'text-slate-800' : theme.textOnAccent} px-4 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-3 lg:px-8 lg:py-3.5 rounded-lg sm:rounded-xl hover:bg-white/30 transition-all duration-200 font-medium text-sm sm:text-base md:text-lg lg:text-xl`}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientSearchScreen;
