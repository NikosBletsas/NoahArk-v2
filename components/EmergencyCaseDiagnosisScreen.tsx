import React, { useState } from 'react';
import { Menu, X} from 'lucide-react'; 
import { BaseScreenProps, DiagnosisStep } from '../types';
import { SCREEN_NAMES } from '../constants';

import PatientInfoForm from './diagnosisForms/PatientInfoForm';
import HistoryTraumaVitalsSkinForm from './diagnosisForms/HistoryTraumaVitalsSkinForm';
import GeneralSignsForm from './diagnosisForms/GeneralSignsForm';
import SurgicalNeurologicSignsForm from './diagnosisForms/SurgicalNeurologicSignsForm';
import NeurologicSignsForm from './diagnosisForms/NeurologicSignsForm';
import CardiorespPsychSignsForm from './diagnosisForms/CardiorespPsychSignsForm';
import ClearButton from './shared/ClearButton';

const DIAGNOSIS_STEPS_CONFIG: DiagnosisStep[] = [
  { key: 'patientInfo', label: 'Patient Info', component: PatientInfoForm },
  { key: 'historyTraumaVitalsSkin', label: 'History/Trauma/Vitals/Skin', component: HistoryTraumaVitalsSkinForm },
  { key: 'generalSigns', label: 'General Signs', component: GeneralSignsForm },
  { key: 'surgicalNeurologicSigns', label: 'Surgical/Neurologic Signs', component: SurgicalNeurologicSignsForm },
  { key: 'neurologicSigns', label: 'Neurologic Signs', component: NeurologicSignsForm },
  { key: 'cardiorespPsychSigns', label: 'Cardioresp./Psych. Signs', component: CardiorespPsychSignsForm },
];

const EmergencyCaseDiagnosisScreen: React.FC<BaseScreenProps> = ({ 
  theme, 
  setCurrentScreen, 
  isMidnightTheme, 
  currentThemeKey, 
  setShowThemeSelector 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formStepRenderKey, setFormStepRenderKey] = useState(0); 
  
  const [isCurrentFormModified, setIsCurrentFormModified] = useState(false);

  const currentStepConfig = DIAGNOSIS_STEPS_CONFIG[currentStepIndex];
  const CurrentFormStep = currentStepConfig.component;

  const handleNext = () => {
    if (currentStepIndex < DIAGNOSIS_STEPS_CONFIG.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setIsCurrentFormModified(false);
    } else {
      console.log("Submitting diagnosis data...");
      setCurrentScreen(SCREEN_NAMES.DASHBOARD);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setIsCurrentFormModified(false);
    }
  };

  const handleSubmitToDashboard = () => {
    console.log("Submitting diagnosis data early...");
    setCurrentScreen(SCREEN_NAMES.DASHBOARD);
  };

  const handleCancel = () => {
    setCurrentScreen(SCREEN_NAMES.DASHBOARD);
  };

  const handleConfirmClearForm = () => {
    setFormStepRenderKey(prevKey => prevKey + 1);
    setIsCurrentFormModified(false);
  };

  const handleFormChange = () => {
    setIsCurrentFormModified(true);
  };

  const handleSidebarItemClick = (index: number) => {
    setCurrentStepIndex(index);
    setIsCurrentFormModified(false);
    if (typeof window !== 'undefined' && window.innerWidth < 768) { 
        setIsMobileMenuOpen(false);
    }
  };

  const isLastStep = currentStepIndex === DIAGNOSIS_STEPS_CONFIG.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const sidebarBg = `bg-gradient-to-b ${theme.accent}`;
  const sidebarItemTextColor = theme.textOnAccent; 
  const sidebarHoverTextColor = 'hover:text-white'; 
  const activeItemBackgroundClass = `bg-gradient-to-r ${theme.primary}`;
  const activeItemTextColorClass = `${theme.textOnAccent} font-semibold`;
  const inactiveItemHoverBgClass = isMidnightTheme || currentThemeKey === 'black' ? 'hover:bg-white/15' : 'hover:bg-black/10';

  const sidebarContent = (isMobile?: boolean) => (
    <>
      <div className={`flex items-center ${isMobile ? 'justify-between' : ''} mb-3 sm:mb-4 md:mb-5 lg:mb-6 border-b ${isMidnightTheme || currentThemeKey === 'black' ? 'border-slate-600' : 'border-white/20'} pb-2 sm:pb-3 md:pb-4 lg:pb-5`}>
        <div className="flex items-center space-x-2 md:space-x-3">
          <div>
              <h1 className={`text-sm sm:text-base md:text-lg lg:text-xl font-semibold ${theme.textOnAccent}`}>{isMobile ? 'Diagnosis Steps' : 'NOAH Diagnosis'}</h1>
          </div>
        </div>
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className={`p-1 sm:p-1.5 md:p-2 rounded-md ${theme.textOnAccent} hover:bg-white/20`}
            aria-label="Close menu"
          >
            <X size={20} className="w-5 h-5 sm:w-[22px] sm:h-[22px] md:w-6 md:h-6 lg:w-7 lg:h-7" />
          </button>
        )}
      </div>
      
      <nav className="flex-grow space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-2.5 overflow-y-auto">
        {DIAGNOSIS_STEPS_CONFIG.map((step, index) => (
          <button
            key={step.key}
            onClick={() => handleSidebarItemClick(index)}
            className={`w-full text-left px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 lg:py-3.5 rounded-md text-xs sm:text-sm md:text-base lg:text-lg transition-colors duration-150
              ${index === currentStepIndex 
                ? `${activeItemBackgroundClass} ${activeItemTextColorClass}` 
                : `${sidebarItemTextColor} ${inactiveItemHoverBgClass} ${sidebarHoverTextColor}`
              }`
            }
            aria-current={index === currentStepIndex ? 'page' : undefined}
          >
            {step.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto pt-3 sm:pt-4 border-t border-slate-600 flex flex-col items-center">
        <div className="w-32 sm:w-36 h-8 sm:h-10 flex items-center justify-center mb-2 sm:mb-3">
          <img 
            src="../public/NoA.H. Logo Horizontal white.svg" 
            alt="NOAH Logo" 
            className="w-full h-full object-contain max-w-32 max-h-8 sm:max-w-36 sm:max-h-10"
          />
        </div>
      </div>
    </>
  );

  const commonSecondaryButtonClasses = `px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-md sm:rounded-lg font-medium transition-colors duration-150 text-xs sm:text-sm md:text-base lg:text-lg`;
  let secondaryButtonStyling = "";

  if (isMidnightTheme) {
    secondaryButtonStyling = `bg-white/10 ${theme.buttonSecondaryText} border ${theme.buttonSecondaryBorder} ${theme.buttonSecondaryHoverBg}`;
  } else {
    secondaryButtonStyling = `bg-white/20 ${theme.textOnAccent} border border-white/40 hover:bg-white/30`;
  }

  return (
    <div className={`min-h-screen flex bg-gradient-to-br ${theme.background}`}>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      <div
        className={`
          ${sidebarBg} w-56 sm:w-64 md:w-72 lg:w-80 flex flex-col 
          p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg
          fixed top-0 left-0 h-screen z-30 
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 
          md:overflow-y-auto 
        `}
      >
        {sidebarContent(isMobileMenuOpen)}
      </div>

      <main className="flex-1 md:ml-72 lg:ml-80 flex flex-col overflow-hidden">
        {/* Fixed Mobile Header */}
        <div className={`md:hidden sticky top-0 ${theme.card} backdrop-blur-lg border-b ${isMidnightTheme || currentThemeKey === 'black' ? 'border-gray-700/60' : 'border-white/20'} z-10`}>
          <div className="p-2.5 sm:p-3 flex items-center justify-between">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className={`p-1.5 sm:p-2 rounded-md hover:bg-black/10 ${isMidnightTheme || currentThemeKey === 'black' ? 'text-white' : 'text-slate-700'} flex-shrink-0`}
              aria-label="Open menu"
            >
              <Menu size={22} className="w-[22px] h-[22px] sm:w-6 sm:h-6" />
            </button>
            
            {/* Mobile Title - with proper truncation */}
            <div className="flex-1 mx-2 min-w-0">
              <h2 className={`text-sm sm:text-base font-semibold ${theme.textPrimary} truncate text-center`}>
                {currentStepConfig.label}
              </h2>
            </div>

            {/* Theme Toggle */}
            {setShowThemeSelector && (
              <button
                onClick={() => setShowThemeSelector(true)}
                className={`p-1.5 sm:p-2 ${theme.card} backdrop-blur-lg rounded-lg sm:rounded-xl shadow-md border border-white/10 hover:scale-105 flex-shrink-0`}
                title="Change Theme"
              >
                <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r ${theme.primary} rounded-sm sm:rounded-md`}></div>
              </button>
            )}
          </div>
        </div>
        
        <div className="p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col flex-grow min-h-0">
            {/* Fixed Progress and Theme Section */}
            <div className="flex-shrink-0">
                <div className="hidden md:flex justify-between items-center mb-4 lg:mb-6">
                    {/* Progress Bar */}
                    <div className="flex-1 max-w-2xl mr-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs sm:text-sm font-medium ${theme.textSecondary}`}>
                                Page {currentStepIndex + 1} of {DIAGNOSIS_STEPS_CONFIG.length}
                            </span>
                        </div>
                        <div className={`w-full h-2 ${isMidnightTheme || currentThemeKey === 'black' ? 'bg-gray-700' : 'bg-white/20'} rounded-full overflow-hidden backdrop-blur-sm`}>
                            <div 
                                className={`h-full bg-gradient-to-r ${theme.primary} transition-all duration-500 ease-out rounded-full relative overflow-hidden`}
                                style={{ width: `${((currentStepIndex + 1) / DIAGNOSIS_STEPS_CONFIG.length) * 100}%` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                            </div>
                        </div>
                        <div className="mt-1">
                            <span className={`text-xs ${theme.textSecondary} font-medium`}>
                                {currentStepConfig.label}
                            </span>
                        </div>
                    </div>

                    {setShowThemeSelector && (
                        <button
                            onClick={() => setShowThemeSelector(true)}
                            className={`p-3 md:p-3.5 lg:p-4 ${theme.card} backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:scale-105 transition-all duration-200 flex-shrink-0`}
                            title="Change Theme"
                        >
                            <div className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gradient-to-r ${theme.primary} rounded-lg`}></div>
                        </button>
                    )}
                </div>

                {/* Mobile Progress Bar */}
                <div className="md:hidden mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-medium ${theme.textSecondary}`}>
                            Page {currentStepIndex + 1}/{DIAGNOSIS_STEPS_CONFIG.length}
                        </span>
                    </div>
                    <div className={`w-full h-1.5 ${isMidnightTheme || currentThemeKey === 'black' ? 'bg-gray-700' : 'bg-white/20'} rounded-full overflow-hidden`}>
                        <div 
                            className={`h-full bg-gradient-to-r ${theme.primary} transition-all duration-500 ease-out rounded-full`}
                            style={{ width: `${((currentStepIndex + 1) / DIAGNOSIS_STEPS_CONFIG.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Form Container - Fixed Height with Scrolling */}
            <div className={`${theme.card} backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 flex flex-col flex-grow min-h-0`}>
                <div className={`bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} p-2.5 sm:p-3 md:p-3.5 lg:p-4 rounded-t-lg sm:rounded-t-xl flex items-center justify-between flex-shrink-0`}>
                    <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">{currentStepConfig.label}</h2>
                    
                    <ClearButton
                      theme={theme}
                      isMidnightTheme={isMidnightTheme}
                      isVisible={isCurrentFormModified}
                      sectionName={currentStepConfig.label}
                      onClear={handleConfirmClearForm}
                      position="header"
                      size="xs"
                    />
                </div>
                <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex-grow overflow-y-auto min-h-0">
                    <CurrentFormStep 
                      key={formStepRenderKey} 
                      theme={theme} 
                      isMidnightTheme={isMidnightTheme} 
                      onFormChange={handleFormChange}
                    />
                </div>
            </div>
        </div>
        
        {/* Footer */}
        <div className={`bg-gradient-to-r ${theme.accent} p-3 sm:p-4 md:p-5 lg:p-6 sticky bottom-0 z-10 border-t ${isMidnightTheme || currentThemeKey === 'black' ? 'border-gray-600/50' : 'border-white/20'} backdrop-blur-lg`}>
          <div className="flex justify-between items-center w-full">
            {/* Left side - Cancel button */}
            <div className="flex">
              <button
                onClick={handleCancel}
                className={`group relative px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-md sm:rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg overflow-hidden ${secondaryButtonStyling} hover:scale-105 hover:shadow-md active:scale-95 transform`}
              >
                <span className="relative z-10">Cancel</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
              </button>
            </div>

            {/* Right side - Navigation and action buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              {!isFirstStep && (
                <button
                  onClick={handlePrevious}
                  className={`group relative px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-md sm:rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg overflow-hidden ${secondaryButtonStyling} hover:scale-105 hover:shadow-md active:scale-95 transform`}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                </button>
              )}
              
              <button
                onClick={handleNext}
                className={`group relative px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-md sm:rounded-lg font-medium bg-gradient-to-r ${theme.primary} ${theme.textOnAccent} transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-blue-500/15 active:scale-95 transform shadow-md`}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>{isLastStep ? 'Submit' : 'Next'}</span>
                  {!isLastStep && (
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {isLastStep && (
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md sm:rounded-lg"></div>
              </button>

              {!isLastStep && (
                <button
                  onClick={handleSubmitToDashboard}
                  className={`group relative px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-md sm:rounded-lg font-medium bg-gradient-to-r ${theme.primary} ${theme.textOnAccent} transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 active:scale-95 transform border border-white/20 opacity-90 hover:opacity-100`}
                  title="Submit and go to Dashboard"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Submit</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmergencyCaseDiagnosisScreen;