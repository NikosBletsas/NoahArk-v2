import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  UserPlus,
  // Filter, // COMMENTED OUT: Client filters
  // Edit, // COMMENTED OUT: Edit functionality
  AlertCircle,
} from "lucide-react";

import { useTheme } from "@/contexts/ThemeContext";
import { SCREEN_NAMES } from "@/constants";
import AppHeader from "@/components/Layout/AppHeader";
import { usePatientSearch } from "@/hooks/usePatientSearch";
import { NPatient } from "@/api/generated_api";
import { Patient } from "@/types";
// COMMENTED OUT: Edit form import
// import PatientEditForm from "./PatientEditForm";

const PatientSearchScreen: React.FC = () => {
  const { theme, isMidnightTheme } = useTheme();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // COMMENTED OUT: Advanced search state
  // const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  // COMMENTED OUT: Edit form state
  // const [showEditForm, setShowEditForm] = useState(false);
  // const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  // COMMENTED OUT: Advanced filters state for client-side filtering
  // const [advancedFilters, setAdvancedFilters] = useState({
  //   ssn: "",
  //   sid: "",
  //   gender: "",
  //   dobFrom: "",
  //   dobTo: "",
  // });

  // Initialize patient search hook for API integration
  const { searchPatient, isLoading, error, searchResults, clearSearch } =
    usePatientSearch();

  // Handle API search
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

  // Set patients from API results only
  React.useEffect(() => {
    setPatients(searchResults || []);
  }, [searchResults]);

  // Enhanced filtering logic (client-side filtering of API results)
  // COMMENTED OUT: Client-side filtering logic
  // const filteredPatients = (patients || []).filter((patient) => {
  //   // Basic search is already handled by API, but we can filter further client-side
  //   let matches = true;

  //   if (showAdvancedSearch) {
  //     // Advanced filter matching (client-side only)
  //     const ssnMatch =
  //       !advancedFilters.ssn || patient.ssn.includes(advancedFilters.ssn);
  //     const sidMatch =
  //       !advancedFilters.sid ||
  //       patient.sid.toLowerCase().includes(advancedFilters.sid.toLowerCase());
  //     const genderMatch =
  //       !advancedFilters.gender || patient.gender === advancedFilters.gender;

  //     matches = ssnMatch && sidMatch && genderMatch;
  //   }

  //   return matches;
  // });

  // Use patients directly without client-side filtering
  const filteredPatients = patients || [];

  const tableHeaders = [
    "Patient ID",
    "Surname",
    "Name",
    "Date of Birth",
    "Gender",
    "SSN",
    "System ID",
  ];

  // COMMENTED OUT: Advanced filter functions for client-side filtering
  // const handleAdvancedFilterChange = (field: string, value: string) => {
  //   setAdvancedFilters((prev) => ({ ...prev, [field]: value }));
  // };

  // const clearAdvancedFilters = () => {
  //   setAdvancedFilters({
  //     ssn: "",
  //     sid: "",
  //     gender: "",
  //     dobFrom: "",
  //     dobTo: "",
  //   });
  // };

  // COMMENTED OUT: Edit patient functionality
  // const handleEditPatient = (patient: Patient) => {
  //   setSelectedPatient(patient);
  //   setShowEditForm(true);
  // };

  // const handleSavePatient = (updatedPatient: Patient) => {
  //   setPatients((prev) =>
  //     prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
  //   );
  //   alert("Patient information updated successfully!");
  // };

  // const handleCloseEditForm = () => {
  //   setShowEditForm(false);
  //   setSelectedPatient(null);
  // };

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
          {/* Search and Add Section */}
          <div className="flex flex-col space-y-3 lg:space-y-4 mb-4 sm:mb-6 lg:mb-8">
            {/* Top row - Basic search and buttons */}
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
                  <span>{isLoading ? "Searching..." : "Search API"}</span>
                </button>

                {/* COMMENTED OUT: Client Filters button */}
                {/* <button
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className={`w-full sm:w-auto bg-gradient-to-r ${theme.primary} ${theme.textOnAccent} px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 rounded-lg sm:rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5 sm:space-x-2 font-medium text-sm sm:text-base lg:text-lg`}
                >
                  <Filter
                    size={16}
                    className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                  />
                  <span>
                    {showAdvancedSearch ? "Hide Filters" : "Client Filters"}
                  </span>
                </button> */}

                <button
                  onClick={() =>
                    navigate(`/${SCREEN_NAMES.EMERGENCY_CASE_DIAGNOSIS}`)
                  }
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

            {/* COMMENTED OUT: Advanced Search Panel - Client-side filtering only */}
            {/* {showAdvancedSearch && (
              <div
                className={`${theme.inputBackground} border ${theme.inputBorder} rounded-lg sm:rounded-xl p-3 lg:p-4 space-y-3 lg:space-y-4`}
              >
                <div className="text-xs text-yellow-600 mb-2">
                  Note: These filters work on already loaded results (client-side filtering)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
                  {/* SSN Filter */}
            {/* <div>
                    <label
                      className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}
                    >
                      SSN (Last 4 digits)
                    </label>
                    <input
                      type="text"
                      placeholder="1234"
                      maxLength={4}
                      value={advancedFilters.ssn}
                      onChange={(e) =>
                        handleAdvancedFilterChange("ssn", e.target.value)
                      }
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    />
                  </div> */}

            {/* SID Filter */}
            {/* <div>
                    <label
                      className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}
                    >
                      System ID
                    </label>
                    <input
                      type="text"
                      placeholder="NOH123456"
                      value={advancedFilters.sid}
                      onChange={(e) =>
                        handleAdvancedFilterChange(
                          "sid",
                          e.target.value.toUpperCase()
                        )
                      }
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    />
                  </div> */}

            {/* Gender Filter */}
            {/* <div>
                    <label
                      className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}
                    >
                      Gender
                    </label>
                    <select
                      value={advancedFilters.gender}
                      onChange={(e) =>
                        handleAdvancedFilterChange("gender", e.target.value)
                      }
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    >
                      <option value="">All Genders</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Undefined">Undefined</option>
                    </select>
                  </div> */}

            {/* Clear Filters Button */}
            {/* <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-3 flex items-end">
                    <button
                      onClick={clearAdvancedFilters}
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.buttonSecondaryBorder} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg} rounded-lg transition-colors text-sm font-medium`}
                    >
                      Clear Filters
                    </button>
                  </div> */}
            {/* </div>
              </div>
            )} */}
          </div>

          {/* Error Display */}
          {error && (
            <div
              className={`mb-4 p-3 rounded-lg bg-red-100 border border-red-300 flex items-center space-x-2`}
            >
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Results Summary */}
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

          {/* Table Section */}
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
                    {/* COMMENTED OUT: Action column header */}
                    {/* <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 font-semibold text-center whitespace-nowrap text-xs sm:text-sm lg:text-base">
                      Action
                    </th> */}
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
                        className={`border-b ${
                          isMidnightTheme
                            ? "border-gray-700"
                            : "border-gray-200"
                        } ${
                          isMidnightTheme ? theme.textPrimary : "text-gray-700"
                        } hover:${
                          isMidnightTheme ? "bg-gray-700/50" : "bg-gray-50/50"
                        } transition-colors`}
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
                        {/* COMMENTED OUT: Action column */}
                        {/* <td className="px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => handleEditPatient(patient)}
                              className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:opacity-90 transition-opacity"
                              title="Edit Patient"
                            >
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                            </button>
                          </div>
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={tableHeaders.length} // UPDATED: Removed +1 since no action column
                        className={`text-center py-6 sm:py-8 lg:py-10 ${theme.textSecondary} text-sm lg:text-base`}
                      >
                        {firstName || lastName
                          ? "No patients found matching your search criteria."
                          : "Enter a first name, last name, or both and click 'Search API' to find patients."}
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

      {/* COMMENTED OUT: Edit Form Modal */}
      {/* {selectedPatient && (
        <PatientEditForm
          patient={selectedPatient}
          isOpen={showEditForm}
          onClose={handleCloseEditForm}
          onSave={handleSavePatient}
        />
      )} */}
    </div>
  );
};

export default PatientSearchScreen;
