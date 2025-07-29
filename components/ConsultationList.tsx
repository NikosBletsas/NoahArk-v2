import React from 'react';
import { Consultation } from '../types';

interface ConsultationListProps {
  consultations: Consultation[];
  selectedConsultation: Consultation | null;
  onSelectConsultation: (consultation: Consultation) => void;
  theme: any; // A more specific type would be better
  isMidnightTheme: boolean;
}

const ConsultationList: React.FC<ConsultationListProps> = ({
  consultations,
  selectedConsultation,
  onSelectConsultation,
  theme,
  isMidnightTheme,
}) => {
  return (
    <div className={`w-full md:w-1/2 border-b md:border-b-0 md:border-r ${isMidnightTheme ? 'border-gray-700/60' : 'border-gray-200'} flex flex-col min-h-[300px] md:min-h-0`}>
      <div className={`hidden md:block p-3 md:p-4 border-b ${isMidnightTheme ? 'border-gray-700/60' : 'border-gray-200'}`}>
        <h2 className={`text-sm md:text-base font-semibold ${theme.textPrimary}`}>All Consultations</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="min-w-full text-xs md:text-sm">
          <thead className={`sticky top-0 ${isMidnightTheme ? 'bg-gray-800/80' : 'bg-gray-100/80'} backdrop-blur-sm`}>
            <tr className={`${isMidnightTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              <th className="px-3 py-2 md:px-4 md:py-2.5 font-semibold text-left">Case ID</th>
              <th className="px-3 py-2 md:px-4 md:py-2.5 font-semibold text-left">Patient</th>
              <th className="px-3 py-2 md:px-4 md:py-2.5 font-semibold text-left">Date</th>
            </tr>
          </thead>
          <tbody className={`${isMidnightTheme ? 'bg-gray-900/70' : 'bg-white/70'}`}>
            {consultations.map((consultation) => {
              const isSelected = selectedConsultation?.caseId === consultation.caseId;
              let dynamicBgClass = '';
              if (isSelected) {
                dynamicBgClass = isMidnightTheme ? 'bg-blue-900/50' : 'bg-blue-100/70';
              } else {
                dynamicBgClass = isMidnightTheme ? 'hover:bg-gray-800/60' : 'hover:bg-gray-50/70';
              }

              const rowClasses = [
                'cursor-pointer',
                'border-t',
                isMidnightTheme ? 'border-gray-700' : 'border-gray-200',
                'transition-colors',
                'duration-200',
                dynamicBgClass,
              ].join(' ');

              const caseIdClasses = [
                'px-3 py-2 md:px-4 md:py-3 whitespace-nowrap',
                isSelected ? 'text-blue-400' : theme.textSecondary,
              ].join(' ');

              const patientNameClasses = [
                'px-3 py-2 md:px-4 md:py-3 whitespace-nowrap font-medium',
                isSelected ? 'text-white' : theme.textPrimary,
              ].join(' ');

              return (
                <tr
                  key={consultation.caseId}
                  onClick={() => onSelectConsultation(consultation)}
                  className={rowClasses}
                >
                  <td className={caseIdClasses}>
                    {consultation.caseId}
                  </td>
                  <td className={patientNameClasses}>
                    {consultation.name} {consultation.surname}
                  </td>
                  <td className={`px-3 py-2 md:px-4 md:py-3 whitespace-nowrap ${theme.textSecondary}`}>
                    {new Date(consultation.consultationDate).toLocaleDateString()}
                  </td>
                </tr>
              );
            })} 
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultationList;
