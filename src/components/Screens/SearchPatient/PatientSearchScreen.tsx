import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  UserPlus,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

import { useTheme } from "@/contexts/ThemeContext";
import { SCREEN_NAMES } from "@/constants";
import AppHeader from "@/components/Layout/AppHeader";
import { usePatientSearch } from "@/hooks/usePatientSearch";
import { NPatient } from "@/api/generated_api";
import { Patient } from "@/types";
import AddPatientModal from "@/components/Modals/AddPatientModal";

const PatientSearchScreen: React.FC = () => {
  const { theme, isMidnightTheme } = useTheme();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);

  const { searchPatient, isLoading, error, searchResults, clearSearch } =
    usePatientSearch();

  const handleSearch = () => {
    if (firstName.trim() || lastName.trim()) {
      const searchCriteria: NPatient = {
        name: firstName.trim(),
        surname: lastName.trim(),
      };
      searchPatient(searchCriteria);
    } else {
      clearSearch();
      setPatients([]);
    }
  };

  React.useEffect(() => {
    setPatients(searchResults || []);
  }, [searchResults]);

  const handlePatientSelect = (patient: Patient) => {
    navigate(`/${SCREEN_NAMES.EMERGENCY_CASE_DIAGNOSIS}`, {
      state: { selectedPatient: patient },
    });
  };

  const handleAddNewPatient = () => {
    setShowAddPatientModal(true);
  };

  const handlePatientAdded = (newPatient: Patient) => {
    // Add the new patient to the search results for reference
    setPatients((prev) => [newPatient, ...prev]);

    // The modal will handle navigation to emergency case automatically
    // No additional action needed here
  };

  const filteredPatients = patients || [];

  const tableHeaders = [
    "Patient ID",
    "Surname",
    "Name",
    "Date of Birth",
    "Gender",
    "SSN",
    "System ID",
    "Action",
  ];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.background} flex flex-col`}
    >
      <AppHeader
        title="NOAH - Patient Search"
        onBack={() => navigate(`/${SCREEN_NAMES.DASHBOARD}`)}
        showThemeButton={false}
      />

      <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex-grow">
        <div
          className={`${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col h-full`}
        >
          <div className="flex flex-col space-y-3 lg:space-y-4 mb-4 sm:mb-6 lg:mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-4">
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} ${theme.inputPlaceholder} rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base lg:text-lg`}
                  />
                </div>
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} ${theme.inputPlaceholder} rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base lg:text-lg`}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
                <button
                  onClick={handleSearch}
                  disabled={
                    isLoading || (!firstName.trim() && !lastName.trim())
                  }
                  className={`w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 rounded-lg sm:rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5 sm:space-x-2 font-medium text-sm sm:text-base lg:text-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Search
                    size={16}
                    className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                  />
                  <span>{isLoading ? "Searching..." : "Search"}</span>
                </button>

                <button
                  onClick={handleAddNewPatient}
                  className={`w-full sm:w-auto bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 rounded-lg sm:rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5 sm:space-x-2 font-medium text-sm sm:text-base lg:text-lg`}
                >
                  <UserPlus
                    size={16}
                    className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                  />
                  <span>Add New Patient</span>
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div
              className={`mb-4 p-3 rounded-lg bg-red-100 border border-red-300 flex items-center space-x-2`}
            >
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {(firstName || lastName) && (
            <div className={`mb-4 ${theme.textSecondary} text-sm`}>
              Found {filteredPatients.length} patient
              {filteredPatients.length !== 1 ? "s" : ""}
              {searchResults.length > 0 && (
                <span className="ml-2 text-green-600">(API Results)</span>
              )}
              {firstName && lastName && (
                <span className="ml-2">
                  for "{firstName} {lastName}"
                </span>
              )}
              {firstName && !lastName && (
                <span className="ml-2">with first name "{firstName}"</span>
              )}
              {!firstName && lastName && (
                <span className="ml-2">with last name "{lastName}"</span>
              )}
            </div>
          )}

          {filteredPatients.length > 0 && (
            <div
              className={`mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200 flex items-center space-x-2`}
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-700 text-sm font-medium">
                Click on a patient to create emergency case
              </span>
            </div>
          )}

          <div className="overflow-x-auto flex-grow">
            <div className="max-h-[calc(100vh-320px)] sm:max-h-[calc(100vh-300px)] md:max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-260px)] xl:max-h-[calc(100vh-240px)] overflow-y-auto border border-gray-300/70 rounded-lg">
              <table className="min-w-full text-xs sm:text-sm lg:text-base">
                <thead
                  className={`sticky top-0 ${theme.accent} ${theme.textOnAccent}`}
                >
                  <tr>
                    {tableHeaders.map((header) => (
                      <th
                        key={header}
                        className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 font-semibold text-left whitespace-nowrap text-xs sm:text-sm lg:text-base"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody
                  className={`${
                    isMidnightTheme
                      ? "bg-gray-800/60 backdrop-blur-sm"
                      : "bg-white/80 backdrop-blur-sm"
                  }`}
                >
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <tr
                        key={patient.id}
                        onClick={() => handlePatientSelect(patient)}
                        className={`border-b cursor-pointer ${
                          isMidnightTheme
                            ? "border-gray-700"
                            : "border-gray-200"
                        } ${
                          isMidnightTheme ? theme.textPrimary : "text-gray-700"
                        } hover:${
                          isMidnightTheme ? "bg-blue-700/30" : "bg-blue-50"
                        } hover:border-blue-300 transition-all duration-200 group`}
                      >
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 whitespace-nowrap font-medium text-xs sm:text-sm lg:text-base">
                          {patient.id}
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 whitespace-nowrap text-xs sm:text-sm lg:text-base">
                          {patient.surname}
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 whitespace-nowrap text-xs sm:text-sm lg:text-base">
                          {patient.name}
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 whitespace-nowrap text-xs sm:text-sm lg:text-base">
                          {patient.dob
                            ? new Date(patient.dob).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              patient.gender === "Male"
                                ? "bg-blue-100 text-blue-800"
                                : patient.gender === "Female"
                                ? "bg-pink-100 text-pink-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {patient.gender || "N/A"}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 whitespace-nowrap">
                          <span
                            className={`font-mono text-xs sm:text-sm ${theme.textSecondary}`}
                          >
                            {patient.ssn || "N/A"}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 whitespace-nowrap">
                          <span
                            className={`font-mono text-xs sm:text-sm ${theme.textPrimary} font-medium`}
                          >
                            {patient.sid || "N/A"}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <div className="flex items-center space-x-2 text-blue-600 group-hover:text-blue-800 transition-colors">
                              <span className="text-xs sm:text-sm font-medium">
                                Emergency Case
                              </span>
                              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={tableHeaders.length}
                        className={`text-center py-6 sm:py-8 lg:py-10 ${theme.textSecondary} text-sm lg:text-base`}
                      >
                        {firstName || lastName
                          ? "No patients found matching your search criteria."
                          : "Enter a first name, last name, or both and click 'Search' to find patients."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`sticky bottom-0 left-0 right-0 bg-gradient-to-r ${
          theme.accent
        } p-3 sm:p-4 md:p-5 lg:p-6 border-t ${
          isMidnightTheme ? "border-gray-600" : "border-white/10"
        }`}
      >
        <div className="flex justify-center">
          <button
            onClick={() => navigate(`/${SCREEN_NAMES.DASHBOARD}`)}
            className={`flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 bg-white/20 ${theme.textOnAccent} px-4 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-3 lg:px-8 lg:py-3.5 rounded-lg sm:rounded-xl hover:bg-white/30 transition-all duration-200 font-medium text-sm sm:text-base md:text-lg lg:text-xl`}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Add Patient Modal with Auto-Navigation */}
      <AddPatientModal
        isOpen={showAddPatientModal}
        onClose={() => setShowAddPatientModal(false)}
        onPatientAdded={handlePatientAdded}
        theme={theme}
        isMidnightTheme={isMidnightTheme}
        autoNavigateToEmergency={true}
      />
    </div>
  );
};

export default PatientSearchScreen;
