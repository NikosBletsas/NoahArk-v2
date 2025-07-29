import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../src/contexts/ThemeContext';
import { Consultation } from '../types';
import { SCREEN_NAMES } from '../constants';
import { Trash2, RefreshCw, ArrowLeft, X } from 'lucide-react';
import AppHeader from './shared/AppHeader';
import ConsultationList from './ConsultationList';
import ConsultationDetail from './ConsultationDetail';

const ConsultationsScreen: React.FC = () => {
  const { theme, isMidnightTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  // TODO: Replace with API call
  const consultations: Consultation[] = [
    {
      caseId: 'C-1024',
      name: 'John',
      surname: 'Doe',
      consultationDate: '2024-07-28T10:30:00Z',
      chiefComplaint: 'Persistent headaches and dizziness',
      historyOfPresentIllness: 'Patient has been experiencing symptoms for the past week. Initial assessment suggests high blood pressure. Recommended further monitoring and a follow-up visit.',
      doctor: 'Dr. Emily Carter',
    },
    {
      caseId: 'C-1025',
      name: 'Jane',
      surname: 'Smith',
      consultationDate: '2024-07-27T14:00:00Z',
      chiefComplaint: 'Follow-up for spirometer results',
      historyOfPresentIllness: 'Data shows improved lung capacity after the prescribed treatment. Patient feels better. Advised to continue the medication for another two weeks.',
      doctor: 'Dr. Ben Stern',
    },
    {
      caseId: 'C-1026',
      name: 'Michael',
      surname: 'Johnson',
      consultationDate: '2024-07-26T09:15:00Z',
      chiefComplaint: 'Minor burn on the hand',
      historyOfPresentIllness: 'Emergency consultation via photos. First-aid advice was provided. Patient was instructed to apply a specific ointment and keep the area clean. No signs of severe damage.',
      doctor: 'Dr. Olivia Chen',
    },
  ];

  useEffect(() => {
    if (consultations.length > 0 && !selectedConsultation) {
      setSelectedConsultation(consultations[0]);
    }
  }, [consultations, selectedConsultation]);

  const handleSelectConsultation = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
  };

  const handleCloseDetails = () => {
    setSelectedConsultation(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader
        title="Consultations"
        onBack={() => navigate(`/${SCREEN_NAMES.DASHBOARD}`)}
        showThemeButton={false}
      />

      <div className="flex-1 p-4 md:p-6">
        <div className={`${theme.card} backdrop-blur-xl rounded-lg md:rounded-xl shadow-2xl border ${isMidnightTheme ? 'border-gray-700/50 bg-gray-900/80' : 'border-white/20'} w-full h-full min-h-[calc(100vh-160px)] md:min-h-[calc(100vh-180px)] flex flex-col`}>
          <div className={`bg-gradient-to-r ${isMidnightTheme ? 'from-gray-800 to-gray-700 text-white' : `${theme.accent} ${theme.textOnAccent}`} px-4 py-3 md:px-6 md:py-4 rounded-t-lg md:rounded-t-xl flex justify-between items-center`}>
            <h1 className="text-base md:text-xl font-semibold">Consultations Overview</h1>
            <button
              onClick={() => navigate(`/${SCREEN_NAMES.DASHBOARD}`)}
              className={`p-1.5 md:p-2 hover:bg-white/20 rounded-full transition-colors ${isMidnightTheme ? 'text-white hover:bg-gray-600' : theme.textOnAccent}`}
            >
              <X size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative">
            <ConsultationList
              consultations={consultations}
              selectedConsultation={selectedConsultation}
              onSelectConsultation={handleSelectConsultation}
              theme={theme}
              isMidnightTheme={isMidnightTheme}
            />
            {(selectedConsultation || window.innerWidth < 768) && (
              <ConsultationDetail
                consultation={selectedConsultation}
                onClose={handleCloseDetails}
                theme={theme}
                isMidnightTheme={isMidnightTheme}
              />
            )}
          </div>

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
                onClick={() => navigate(`/${SCREEN_NAMES.DASHBOARD}`)}
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
