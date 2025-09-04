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
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-4">
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className={`w-full px-4 py-3 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} ${theme.inputPlaceholder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base lg:text-lg shadow-sm hover:shadow-md`}
                  />
                </div>
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className={`w-full px-4 py-3 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} ${theme.inputPlaceholder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base lg:text-lg shadow-sm hover:shadow-md`}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
                <button
                  onClick={handleSearch}
                  disabled={
                    isLoading || (!firstName.trim() && !lastName.trim())
                  }
                  className={`w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium text-sm sm:text-base lg:text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Search</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleAddNewPatient}
                  className={`w-full sm:w-auto bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} px-4 py-3 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center space-x-2 font-medium text-sm sm:text-base lg:text-lg shadow-md hover:shadow-lg`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Add New Patient</span>
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 flex items-center space-x-3 shadow-sm">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Search Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {(firstName || lastName) && (
            <div
              className={`mb-4 p-4 rounded-lg ${theme.card} border border-white/10 shadow-sm`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    filteredPatients.length > 0
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                ></div>
                <div>
                  <p className={`${theme.textPrimary} font-medium`}>
                    Found {filteredPatients.length} patient
                    {filteredPatients.length !== 1 ? "s" : ""}
                  </p>
                  <p className={`${theme.textSecondary} text-sm`}>
                    {firstName && lastName && `for "${firstName} ${lastName}"`}
                    {firstName && !lastName && `with first name "${firstName}"`}
                    {!firstName && lastName && `with last name "${lastName}"`}
                    {searchResults.length > 0 && (
                      <span className="ml-2 text-green-600">
                        (Live Results)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {filteredPatients.length > 0 && (
            <div className="mb-4 p-4 rounded-lg bg-blue-50 border border-blue-200 flex items-center space-x-3 shadow-sm">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-blue-800 font-medium">Ready to proceed</p>
                <p className="text-blue-700 text-sm">
                  Click on any patient to create an emergency case
                </p>
              </div>
            </div>
          )}

          <div className="overflow-x-auto flex-grow">
            <div
              className={`${theme.card} backdrop-blur-lg rounded-xl shadow-lg border border-white/10 overflow-hidden`}
            >
              <div className="max-h-[calc(100vh-320px)] sm:max-h-[calc(100vh-300px)] md:max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-260px)] xl:max-h-[calc(100vh-240px)] overflow-y-auto">
                <table className="min-w-full text-xs sm:text-sm lg:text-base">
                  <thead
                    className={`sticky top-0 ${theme.accent} ${theme.textOnAccent}`}
                  >
                    <tr>
                      {tableHeaders.map((header) => (
                        <th
                          key={header}
                          className="px-3 py-3 sm:px-4 sm:py-4 font-semibold text-left whitespace-nowrap text-xs sm:text-sm lg:text-base"
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
                      filteredPatients.map((patient, index) => (
                        <tr
                          key={patient.id}
                          onClick={() => handlePatientSelect(patient)}
                          className={`border-b cursor-pointer transition-all duration-200 group ${
                            isMidnightTheme
                              ? "border-gray-700"
                              : "border-gray-200"
                          } ${
                            isMidnightTheme
                              ? theme.textPrimary
                              : "text-gray-700"
                          } hover:${
                            isMidnightTheme ? "bg-blue-700/20" : "bg-blue-50"
                          } hover:shadow-md ${
                            index % 2 === 0
                              ? isMidnightTheme
                                ? "bg-gray-800/10"
                                : "bg-gray-50/30"
                              : ""
                          }`}
                        >
                          <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap font-medium text-xs sm:text-sm lg:text-base">
                            {patient.id}
                          </td>
                          <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap text-xs sm:text-sm lg:text-base font-medium">
                            {patient.surname}
                          </td>
                          <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap text-xs sm:text-sm lg:text-base">
                            {patient.name}
                          </td>
                          <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap text-xs sm:text-sm lg:text-base">
                            {patient.dob
                              ? new Date(patient.dob).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
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
                          <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                            <span
                              className={`font-mono text-xs sm:text-sm ${theme.textSecondary}`}
                            >
                              {patient.ssn || "N/A"}
                            </span>
                          </td>
                          <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                            <span
                              className={`font-mono text-xs sm:text-sm ${theme.textPrimary} font-medium`}
                            >
                              {patient.sid || "N/A"}
                            </span>
                          </td>
                          <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center space-x-2 text-blue-600 group-hover:text-blue-800 transition-colors bg-blue-50 group-hover:bg-blue-100 px-3 py-1.5 rounded-lg">
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
                          className={`text-center py-8 ${theme.textSecondary} text-sm lg:text-base`}
                        >
                          <div className="flex flex-col items-center space-y-3">
                            <Search
                              className={`w-12 h-12 ${theme.textSecondary} opacity-50`}
                            />
                            <div>
                              <p
                                className={`font-medium ${theme.textPrimary} mb-1`}
                              >
                                {firstName || lastName
                                  ? "No patients found"
                                  : "Ready to search"}
                              </p>
                              <p className="text-sm">
                                {firstName || lastName
                                  ? "No patients found matching your search criteria."
                                  : "Enter a first name, last name, or both and click 'Search' to find patients."}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
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
