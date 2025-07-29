import React from 'react';
import { Consultation } from '../types';
import { X } from 'lucide-react';

interface ConsultationDetailProps {
  consultation: Consultation | null;
  onClose: () => void;
  theme: any; // A more specific type would be better
  isMidnightTheme: boolean;
}

const ConsultationDetail: React.FC<ConsultationDetailProps> = ({ consultation, onClose, theme, isMidnightTheme }) => {
  if (!consultation) {
    return (
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center p-6 text-center">
        <p className={`${theme.textSecondary} text-sm`}>Select a consultation to view details</p>
      </div>
    );
  }

  return (
    <div className={`absolute md:static top-0 left-0 w-full h-full md:w-1/2 flex flex-col ${isMidnightTheme ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`flex items-center justify-between p-3 md:p-4 border-b ${isMidnightTheme ? 'border-gray-700/60' : 'border-gray-200'}`}>
        <h2 className={`text-sm md:text-base font-semibold ${theme.textPrimary}`}>Consultation Details</h2>
        <button onClick={onClose} className={`md:hidden p-1 rounded-full ${isMidnightTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
          <X size={20} className={`${theme.textSecondary}`} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        <div>
          <span className={`text-xs font-medium ${theme.textMuted}`}>Patient</span>
          <p className={`${theme.textPrimary} text-base`}>{consultation.name} {consultation.surname}</p>
        </div>
        <div>
          <span className={`text-xs font-medium ${theme.textMuted}`}>Case ID</span>
          <p className={`${theme.textSecondary} text-sm`}>{consultation.caseId}</p>
        </div>
        <div>
          <span className={`text-xs font-medium ${theme.textMuted}`}>Consultation Date</span>
          <p className={`${theme.textSecondary} text-sm`}>{new Date(consultation.consultationDate).toLocaleString()}</p>
        </div>
        <div>
          <span className={`text-xs font-medium ${theme.textMuted}`}>Chief Complaint</span>
          <p className={`${theme.textPrimary}`}>{consultation.chiefComplaint}</p>
        </div>
        <div>
          <span className={`text-xs font-medium ${theme.textMuted}`}>History of Present Illness</span>
          <p className={`${theme.textPrimary}`}>{consultation.historyOfPresentIllness}</p>
        </div>
      </div>
    </div>
  );
};

export default ConsultationDetail;
