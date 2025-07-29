import React, { useState, useEffect } from 'react';
import { BaseScreenProps, Consultation } from '../types';
import { SCREEN_NAMES } from '../constants';
import { Trash2, RefreshCw, ArrowLeft, ChevronDown, X } from 'lucide-react';
import AppHeader from './shared/AppHeader';

const ConsultationsScreen: React.FC<BaseScreenProps> = ({ 
  theme, 
  setCurrentScreen, 
  isMidnightTheme,
  onThemeChange,
  currentThemeKey 
}) => {
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  const consultations: Consultation[] = [
    {
      caseId: 'C-1024',
      name: 'John',
      surname: 'Doe',
      consultationDate: '2024-07-28',
      details: 'Patient reported persistent headaches and dizziness. Initial assessment suggests high blood pressure. Recommended further monitoring and a follow-up visit in one week. Prescribed mild pain relievers.',
      doctor: 'Dr. Emily Carter',
    },
    {
      caseId: 'C-1025',
      name: 'Jane',
      surname: 'Smith',
      consultationDate: '2024-07-27',
      details: 'Follow-up for spirometer results. Data shows improved lung capacity after the prescribed treatment. Patient feels better. Advised to continue the medication for another two weeks and then schedule another check-up.',
      doctor: 'Dr. Ben Stern',
    },
    {
      caseId: 'C-1026',
      name: 'Michael',
      surname: 'Johnson',
      consultationDate: '2024-07-26',
      details: 'Emergency consultation regarding a minor burn on the hand. Photos reviewed, and first-aid advice was provided. Patient was instructed to apply a specific ointment and keep the area clean. No signs of severe damage.',
      doctor: 'Dr. Olivia Chen',
    },
  ];

  // Set the first consultation as selected by default
  useEffect(() => {
    if (consultations.length > 0 && !selectedConsultation) {
      setSelectedConsultation(consultations[0]);
    }
  }, [consultations, selectedConsultation]);

  const handleSelectConsultation = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
  };
        
  return (
    <div className="min-h-screen flex flex-col">
      {/* App Header */}
      <AppHeader 
        theme={theme} 
        title="Consultations"  
        onBack={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)}
        showThemeButton={true}
        isMidnightTheme={isMidnightTheme}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <div className={`${theme.card} backdrop-blur-xl rounded-lg md:rounded-xl shadow-2xl border ${isMidnightTheme ? 'border-gray-700/50 bg-gray-900/80' : 'border-white/20'} w-full h-full min-h-[calc(100vh-160px)] md:min-h-[calc(100vh-180px)] flex flex-col`}>
          
          {/* Modal Header */}
          <div className={`bg-gradient-to-r ${isMidnightTheme ? 'from-gray-800 to-gray-700 text-white' : `${theme.accent} ${theme.textOnAccent}`} px-4 py-3 md:px-6 md:py-4 rounded-t-lg md:rounded-t-xl flex justify-between items-center`}>
            <h1 className="text-base md:text-xl font-semibold">Consultations Overview</h1>
            <button 
              onClick={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)} 
              className={`p-1.5 md:p-2 hover:bg-white/20 rounded-full transition-colors ${isMidnightTheme ? 'text-white hover:bg-gray-600' : theme.textOnAccent}`}
            >
              <X size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Left Panel - Table */}
            <div className={`w-full md:w-1/2 border-b md:border-b-0 md:border-r ${isMidnightTheme ? 'border-gray-700/60' : 'border-gray-200'} flex flex-col min-h-[300px] md:min-h-0`}>
              
              {/* Table Header - Hidden on mobile, visible on tablet+ */}
              <div className={`hidden md:block sticky top-0 ${isMidnightTheme ? 'bg-gray-800/90 border-gray-600/50' : 'bg-gray-50/80 border-gray-200'} backdrop-blur-sm px-4 py-3 border-b z-10`}>
                <div className={`grid grid-cols-4 gap-4 text-sm font-medium ${isMidnightTheme ? 'text-gray-300' : theme.textSecondary}`}>
                  <div className="truncate">Case ID</div>
                  <div className="truncate">Name</div>
                  <div className="truncate">Surname</div>
                  <div className="flex items-center truncate">
                    <span className="truncate">Date</span>
                    <ChevronDown className={`w-4 h-4 ml-1 flex-shrink-0 ${isMidnightTheme ? 'text-gray-400' : 'text-gray-600'}`} />
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="flex-1 overflow-y-auto">
                {consultations.length === 0 ? (
                  <div className={`p-8 text-center ${isMidnightTheme ? 'text-gray-400' : theme.textSecondary}`}>
                    <div className="text-base">No consultations available</div>
                  </div>
                ) : (
                  consultations.map((consultation) => (
                    <div
                      key={consultation.caseId}
                      onClick={() => handleSelectConsultation(consultation)}
                      className={`px-4 py-4 border-b ${isMidnightTheme ? 'border-gray-700/50' : 'border-gray-100'} cursor-pointer transition-all duration-200 hover:scale-[1.01]
                        ${selectedConsultation?.caseId === consultation.caseId
                          ? `bg-gradient-to-r ${isMidnightTheme ? 'from-blue-900/80 to-blue-800/80 text-white shadow-lg' : `${theme.primary} ${theme.textOnAccent} shadow-md`}`
                          : `${isMidnightTheme ? 'hover:bg-gray-700/40 text-gray-200' : 'hover:bg-gray-50/70'}`
                        }
                      `}
                    >
                      {/* Mobile Layout */}
                      <div className="block md:hidden">
                        <div className="flex justify-between items-start mb-1">
                          <div className={`font-bold text-sm ${selectedConsultation?.caseId === consultation.caseId ? 'text-white' : (isMidnightTheme ? 'text-gray-100' : theme.textPrimary)}`}>
                            {consultation.caseId}
                          </div>
                          <div className={`text-xs ${selectedConsultation?.caseId === consultation.caseId ? 'text-gray-200' : (isMidnightTheme ? 'text-gray-400' : theme.textSecondary)}`}>
                            {new Date(consultation.consultationDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className={`text-sm ${selectedConsultation?.caseId === consultation.caseId ? 'text-white' : (isMidnightTheme ? 'text-gray-200' : theme.textPrimary)}`}>
                          {consultation.name} {consultation.surname}
                        </div>
                      </div>

                      {/* Tablet+ Layout - Perfect for landscape */}
                      <div className="hidden md:grid grid-cols-4 gap-4 text-sm items-center">
                        <div className={`font-semibold truncate ${selectedConsultation?.caseId === consultation.caseId ? 'text-white' : (isMidnightTheme ? 'text-gray-100' : theme.textPrimary)}`}>
                          {consultation.caseId}
                        </div>
                        <div className={`truncate ${selectedConsultation?.caseId === consultation.caseId ? 'text-white' : (isMidnightTheme ? 'text-gray-200' : theme.textPrimary)}`}>
                          {consultation.name}
                        </div>
                        <div className={`truncate ${selectedConsultation?.caseId === consultation.caseId ? 'text-white' : (isMidnightTheme ? 'text-gray-200' : theme.textPrimary)}`}>
                          {consultation.surname}
                        </div>
                        <div className={`text-sm truncate ${selectedConsultation?.caseId === consultation.caseId ? 'text-gray-200' : (isMidnightTheme ? 'text-gray-400' : theme.textSecondary)}`}>
                          {new Date(consultation.consultationDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Panel - Consultation Details */}
            <div className={`w-full md:w-1/2 flex flex-col ${isMidnightTheme ? 'bg-gray-800/60' : 'bg-slate-50/60'} min-h-[400px] md:min-h-0`}>
              {selectedConsultation ? (
                <>
                  {/* Details Header */}
                  <div className={`px-4 py-3 md:px-6 md:py-4 border-b ${isMidnightTheme ? 'border-gray-600/50' : 'border-gray-200'} flex-shrink-0`}>
                    <h2 className={`text-base md:text-lg font-semibold ${isMidnightTheme ? 'text-gray-100' : theme.textPrimary} mb-1`}>
                      Details for {selectedConsultation.caseId}
                    </h2>
                    <p className={`text-sm ${isMidnightTheme ? 'text-gray-400' : theme.textSecondary}`}>
                      by {selectedConsultation.doctor} on {new Date(selectedConsultation.consultationDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {/* Details Content */}
                  <div className="p-4 md:p-6 flex-1 overflow-y-auto">
                    <div className={`text-sm md:text-base leading-relaxed ${isMidnightTheme ? 'text-gray-200' : theme.textPrimary} mb-6`}>
                      {selectedConsultation.details}
                    </div>
                    
                    {/* Additional Patient Info Card - Perfect for tablet landscape */}
                    <div className={`mt-4 p-4 rounded-lg ${isMidnightTheme ? 'bg-gray-700/40 border-gray-600/40' : 'bg-white/50 border-gray-200'} border`}>
                      <h3 className={`text-sm font-semibold ${isMidnightTheme ? 'text-gray-100' : theme.textPrimary} mb-3`}>Patient Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className={`${isMidnightTheme ? 'text-gray-400' : theme.textSecondary}`}>Name: </span>
                          <span className={`${isMidnightTheme ? 'text-gray-200' : theme.textPrimary} font-medium`}>{selectedConsultation.name} {selectedConsultation.surname}</span>
                        </div>
                        <div>
                          <span className={`${isMidnightTheme ? 'text-gray-400' : theme.textSecondary}`}>Case ID: </span>
                          <span className={`${isMidnightTheme ? 'text-gray-200' : theme.textPrimary} font-medium`}>{selectedConsultation.caseId}</span>
                        </div>
                        <div>
                          <span className={`${isMidnightTheme ? 'text-gray-400' : theme.textSecondary}`}>Doctor: </span>
                          <span className={`${isMidnightTheme ? 'text-gray-200' : theme.textPrimary} font-medium`}>{selectedConsultation.doctor}</span>
                        </div>
                        <div>
                          <span className={`${isMidnightTheme ? 'text-gray-400' : theme.textSecondary}`}>Date: </span>
                          <span className={`${isMidnightTheme ? 'text-gray-200' : theme.textPrimary} font-medium`}>{new Date(selectedConsultation.consultationDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className={`p-8 flex-1 flex items-center justify-center text-center ${isMidnightTheme ? 'text-gray-400' : theme.textSecondary}`}>
                  <div>
                    <div className="text-xl mb-2">📋</div>
                    <div className="text-base">Select a consultation to view details</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className={`p-4 md:p-6 border-t ${isMidnightTheme ? 'border-gray-600/50' : 'border-gray-200'} flex-shrink-0`}>
            <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-3">
              <button className={`flex items-center justify-center space-x-2 px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm font-medium transition-all duration-200 border hover:scale-105 ${
                isMidnightTheme 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white' 
                  : `${theme.buttonSecondaryBorder} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg}`
              }`}>
                <Trash2 className="w-4 h-4" />
                <span>Delete Advice</span>
              </button>
              
              <button className={`flex items-center justify-center space-x-2 px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm font-medium transition-all duration-200 border hover:scale-105 ${
                isMidnightTheme 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white' 
                  : `${theme.buttonSecondaryBorder} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg}`
              }`}>
                <RefreshCw className="w-4 h-4" />
                <span>Refresh List</span>
              </button>
              
              <button 
                onClick={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)} 
                className={`flex items-center justify-center space-x-2 px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg ${
                  isMidnightTheme
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                    : `bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} hover:opacity-90`
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationsScreen;
