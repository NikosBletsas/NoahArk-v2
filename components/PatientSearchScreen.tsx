import React, { useState } from 'react';
import { Search, UserPlus, Filter,  Edit } from 'lucide-react';
import { BaseScreenProps, Patient } from '../types';
import { SCREEN_NAMES } from '../constants';
import AppHeader from './shared/AppHeader';

const PatientSearchScreen: React.FC<BaseScreenProps> = ({ 
  theme, 
  setCurrentScreen, 
  setShowThemeSelector, 
  isMidnightTheme, 
  currentThemeKey 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    surname: '',
    dob: '',
    gender: '',
    ssn: '',
    sid: '',
    phone: '',
    email: ''
  });
  const [advancedFilters, setAdvancedFilters] = useState({
    ssn: '',
    sid: '',
    gender: '',
    dobFrom: '',
    dobTo: ''
  });

  // Enhanced mock patients with complete data
  const mockPatients: Patient[] = Array(10).fill(null).map((_, i) => ({
    id: `P00${i + 1}`,
    name: `User${i + 1}`,
    surname: `Surname${i + 1}`,
    dob: `198${i}-0${(i % 9) + 1}-1${i % 3 + 1}`,
    gender: i % 2 === 0 ? 'Male' : 'Female',
    ssn: `***-**-${String(1234 + i).padStart(4, '0')}`,
    sid: `NOH${String(123456 + i).padStart(6, '0')}`,
    phone: `(555) ${String(123 + i).padStart(3, '0')}-${String(4567 + i).padStart(4, '0')}`,
    email: `user${i + 1}.surname${i + 1}@email.com`,
    address: `${123 + i} Main Street`,
    city: ['Anytown', 'Springfield', 'Riverside'][i % 3],
    state: ['CA', 'TX', 'NY'][i % 3],
    zipCode: `${12345 + i}`,
    emergencyContact: {
      name: `Emergency Contact ${i + 1}`,
      phone: `(555) ${String(999 - i).padStart(3, '0')}-0000`,
      relationship: i % 2 === 0 ? 'Spouse' : 'Parent'
    },
    medicalRecordNumber: `MRN${String(100001 + i)}`,
    insuranceNumber: `INS-${String(i + 1).padStart(3, '0')}-001`
  }));

  // Enhanced filtering logic
  const filteredPatients = mockPatients.filter(patient => {
    const basicMatch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.ssn.includes(searchTerm) ||
      patient.sid.toLowerCase().includes(searchTerm.toLowerCase());

    if (!showAdvancedSearch) return basicMatch;

    // Advanced filter matching
    const ssnMatch = !advancedFilters.ssn || patient.ssn.includes(advancedFilters.ssn);
    const sidMatch = !advancedFilters.sid || patient.sid.toLowerCase().includes(advancedFilters.sid.toLowerCase());
    const genderMatch = !advancedFilters.gender || patient.gender === advancedFilters.gender;
    
    return basicMatch && ssnMatch && sidMatch && genderMatch;
  });

  const handleAdvancedFilterChange = (field: string, value: string) => {
    setAdvancedFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      ssn: '',
      sid: '',
      gender: '',
      dobFrom: '',
      dobTo: ''
    });
  };

  const handleViewPatient = (patient: Patient) => {
    // Store patient data in sessionStorage
    sessionStorage.setItem('selectedPatient', JSON.stringify(patient));
    sessionStorage.setItem('patientEditMode', 'false');
    
    // Navigate to view patient screen
    setCurrentScreen('view-patient' as any);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setEditForm({
      name: patient.name,
      surname: patient.surname,
      dob: patient.dob,
      gender: patient.gender,
      ssn: patient.ssn,
      sid: patient.sid,
      phone: patient.phone || '',
      email: patient.email || ''
    });
    setShowEditPopup(true);
  };

  const handleSaveEdit = () => {
    // Here you would normally make an API call to save the changes
    console.log('Saving patient changes:', editForm);
    alert('Patient information updated successfully!');
    setShowEditPopup(false);
    setEditingPatient(null);
  };

  const handleCancelEdit = () => {
    setShowEditPopup(false);
    setEditingPatient(null);
    setEditForm({
      name: '',
      surname: '',
      dob: '',
      gender: '',
      ssn: '',
      sid: '',
      phone: '',
      email: ''
    });
  };

  const handleEditFormChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleDeletePatient = (patient: Patient) => {
    if (confirm(`Are you sure you want to delete patient ${patient.name} ${patient.surname}?`)) {
      // Handle patient deletion logic here
      console.log('Delete patient:', patient);
      alert('Patient deletion functionality would be implemented here.');
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex flex-col`}>
      <AppHeader
        theme={theme}
        title="Patient Search"
        onBack={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)}
        showThemeButton={true}
        onShowThemeSelector={() => setShowThemeSelector?.(true)}
        isMidnightTheme={isMidnightTheme}
      />

      <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex-grow">
        <div className={`${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col h-full`}>
          
          {/* Search and Add Section */}
          <div className="flex flex-col space-y-4 mb-4 sm:mb-6 md:mb-8">
            {/* Top row - Basic search and buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 gap-3">
              <div className="relative w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
                <input
                  type="text"
                  placeholder="Search by name, ID, SSN, or SID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 pr-10 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} ${theme.inputPlaceholder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base`}
                />
                <Search className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${theme.textSecondary}`} />
              </div>
              
              <div className="flex flex-row space-x-2 sm:space-x-3 w-full sm:w-auto justify-center sm:justify-end">
                <button
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className={`flex-1 sm:flex-none bg-gradient-to-r ${theme.primary} ${theme.textOnAccent} px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5 font-medium text-xs sm:text-sm md:text-base`}
                >
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">{showAdvancedSearch ? 'Hide Filters' : 'Advanced Search'}</span>
                  <span className="xs:hidden">Filters</span>
                </button>
                
                <button
                  onClick={() => setCurrentScreen(SCREEN_NAMES.EMERGENCY_CASE_DIAGNOSIS)}
                  className={`flex-1 sm:flex-none bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5 font-medium text-xs sm:text-sm md:text-base`}
                >
                  <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Add New Patient</span>
                  <span className="xs:hidden">Add</span>
                </button>
              </div>
            </div>

            {/* Advanced Search Panel - Simplified */}
            {showAdvancedSearch && (
              <div className={`${theme.inputBackground} border ${theme.inputBorder} rounded-lg sm:rounded-xl p-4 space-y-4`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* SSN Filter */}
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                      SSN (Last 4 digits)
                    </label>
                    <input
                      type="text"
                      placeholder="1234"
                      maxLength={4}
                      value={advancedFilters.ssn}
                      onChange={(e) => handleAdvancedFilterChange('ssn', e.target.value)}
                      className={`w-full px-3 py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    />
                  </div>

                  {/* SID Filter */}
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                      System ID
                    </label>
                    <input
                      type="text"
                      placeholder="NOH123456"
                      value={advancedFilters.sid}
                      onChange={(e) => handleAdvancedFilterChange('sid', e.target.value.toUpperCase())}
                      className={`w-full px-3 py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    />
                  </div>

                  {/* Gender Filter */}
                  <div>
                    <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                      Gender
                    </label>
                    <select
                      value={advancedFilters.gender}
                      onChange={(e) => handleAdvancedFilterChange('gender', e.target.value)}
                      className={`w-full px-3 py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    >
                      <option value="">All Genders</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  {/* Clear Filters Button */}
                  <div className="flex items-end">
                    <button
                      onClick={clearAdvancedFilters}
                      className={`w-full px-3 py-2 border ${theme.buttonSecondaryBorder} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg} rounded-lg transition-colors text-sm font-medium`}
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          {(searchTerm || showAdvancedSearch) && (
            <div className={`mb-4 ${theme.textSecondary} text-sm`}>
              Found {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''}
            </div>
          )}

          {/* Table Section - Simplified with only requested columns */}
          <div className="flex-grow min-h-0">
            <div className="h-full overflow-y-auto border border-gray-300 rounded-lg">
              <table className="w-full text-xs sm:text-sm">
                <thead className={`sticky top-0 z-10 bg-gradient-to-r ${theme.accent}`}>
                  <tr>
                    <th className={`px-2 py-2 sm:px-3 sm:py-2.5 font-semibold text-left whitespace-nowrap ${theme.textOnAccent}`}>Patient ID</th>
                    <th className={`px-2 py-2 sm:px-3 sm:py-2.5 font-semibold text-left whitespace-nowrap ${theme.textOnAccent}`}>Surname</th>
                    <th className={`px-2 py-2 sm:px-3 sm:py-2.5 font-semibold text-left whitespace-nowrap ${theme.textOnAccent}`}>Name</th>
                    <th className={`px-2 py-2 sm:px-3 sm:py-2.5 font-semibold text-left whitespace-nowrap ${theme.textOnAccent}`}>Date of Birth</th>
                    <th className={`px-2 py-2 sm:px-3 sm:py-2.5 font-semibold text-left whitespace-nowrap ${theme.textOnAccent}`}>Gender</th>
                    <th className={`px-2 py-2 sm:px-3 sm:py-2.5 font-semibold text-left whitespace-nowrap ${theme.textOnAccent}`}>SSN</th>
                    <th className={`px-2 py-2 sm:px-3 sm:py-2.5 font-semibold text-left whitespace-nowrap ${theme.textOnAccent}`}>System ID</th>
                    <th className={`px-2 py-2 sm:px-3 sm:py-2.5 font-semibold text-center whitespace-nowrap ${theme.textOnAccent}`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={`${isMidnightTheme ? 'bg-gray-800/60 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <tr key={patient.id} className={`border-b ${isMidnightTheme ? 'border-gray-700' : 'border-gray-200'} ${isMidnightTheme ? theme.textPrimary : 'text-gray-700'} hover:${isMidnightTheme ? 'bg-gray-700/50' : 'bg-gray-50/50'} transition-colors`}>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap font-medium text-xs sm:text-sm">
                          {patient.id}
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap text-xs sm:text-sm">
                          {patient.surname}
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap text-xs sm:text-sm">
                          {patient.name}
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap text-xs sm:text-sm">
                          {new Date(patient.dob).toLocaleDateString()}
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            patient.gender === 'Male' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-pink-100 text-pink-800'
                          }`}>
                            {patient.gender}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap">
                          <span className={`font-mono text-xs sm:text-sm ${theme.textSecondary}`}>{patient.ssn}</span>
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap">
                          <span className={`font-mono text-xs sm:text-sm ${theme.textPrimary} font-medium`}>{patient.sid}</span>
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap">
                          <div className="flex items-center justify-center space-x-1">
                            <button 
                              onClick={() => handleEditPatient(patient)}
                              className="p-1 sm:p-1.5 rounded bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:opacity-90 transition-opacity"
                              title="Edit"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className={`text-center py-6 sm:py-8 ${theme.textSecondary}`}>
                        {searchTerm || Object.values(advancedFilters).some(filter => filter) 
                          ? "No patients found matching your search criteria." 
                          : "No patients found."
                        }
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Patient Popup Modal */}
      {showEditPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${theme.card} backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${theme.textPrimary}`}>
                Edit Patient Information
              </h2>
              <button
                onClick={handleCancelEdit}
                className={`p-2 rounded-lg ${theme.buttonSecondaryText} hover:${theme.buttonSecondaryHoverBg} transition-colors`}
              >
                <span className="text-xl">×</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                  Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleEditFormChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                />
              </div>

              {/* Surname */}
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                  Surname
                </label>
                <input
                  type="text"
                  value={editForm.surname}
                  onChange={(e) => handleEditFormChange('surname', e.target.value)}
                  className={`w-full px-3 py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={editForm.dob}
                  onChange={(e) => handleEditFormChange('dob', e.target.value)}
                  className={`w-full px-3 py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                />
              </div>

              {/* Gender */}
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                  Gender
                </label>
                <select
                  value={editForm.gender}
                  onChange={(e) => handleEditFormChange('gender', e.target.value)}
                  className={`w-full px-3 py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* SSN */}
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                  SSN
                </label>
                <input
                  type="text"
                  value={editForm.ssn}
                  onChange={(e) => handleEditFormChange('ssn', e.target.value)}
                  className={`w-full px-3 py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                  placeholder="***-**-1234"
                />
              </div>

              {/* System ID */}
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                  System ID
                </label>
                <input
                  type="text"
                  value={editForm.sid}
                  onChange={(e) => handleEditFormChange('sid', e.target.value.toUpperCase())}
                  className={`w-full px-3 py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                  placeholder="NOH123456"
                />
              </div>

              {/* Phone */}
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                  Phone
                </label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => handleEditFormChange('phone', e.target.value)}
                  className={`w-full px-3 py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Email */}
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => handleEditFormChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                  placeholder="user@email.com"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelEdit}
                className={`px-4 py-2 border ${theme.buttonSecondaryBorder} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg} rounded-lg transition-colors text-sm font-medium`}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className={`px-4 py-2 bg-gradient-to-r ${theme.primary} ${theme.textOnAccent} rounded-lg hover:opacity-90 transition-opacity text-sm font-medium`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientSearchScreen;