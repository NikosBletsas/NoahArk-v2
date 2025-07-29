import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, UserPlus, Filter, Edit, X, Save, User, Phone, Mail, MapPin, Heart, Shield, FileText } from 'lucide-react';
import { useTheme } from '../src/contexts/ThemeContext';
import { SCREEN_NAMES } from '../constants';
import AppHeader from './shared/AppHeader';

interface Patient {
  id: string;
  name: string;
  surname: string;
  dob: string;
  gender: string;
  ssn: string;
  sid: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalRecordNumber?: string;
  insuranceNumber?: string;
}

const PatientEditForm: React.FC<{
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPatient: Patient) => void;
}> = ({ patient, isOpen, onClose, onSave }) => {
  const { theme, isMidnightTheme } = useTheme();
  const [formData, setFormData] = useState<Patient>(patient);

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmergencyContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      } as any
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className={`${theme.card} backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 w-full max-w-7xl max-h-[98vh] md:max-h-[90vh] lg:max-h-[85vh] overflow-hidden`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} p-3 sm:p-4 lg:p-5 flex justify-between items-center shrink-0`}>
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Edit Patient</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Form Content - Optimized for landscape tablets */}
        <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[calc(98vh-120px)] md:max-h-[calc(90vh-120px)] lg:max-h-[calc(85vh-130px)]">
          <div className="space-y-4 md:space-y-5 lg:space-y-6">
            
            {/* Basic Information - Better tablet landscape layout */}
            <div className="space-y-3 lg:space-y-4">
              <h3 className={`text-base sm:text-lg font-semibold ${theme.textPrimary} flex items-center space-x-2`}>
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Basic Information</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 lg:gap-4">
                <div className="md:col-span-1 lg:col-span-1 xl:col-span-1">
                  <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                    Patient ID
                  </label>
                  <input
                    type="text"
                    value={formData.id}
                    disabled
                    className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textSecondary} rounded-lg opacity-60 cursor-not-allowed text-sm`}
                  />
                </div>
                <div className="md:col-span-1 lg:col-span-2 xl:col-span-2">
                  <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    required
                  />
                </div>
                <div className="md:col-span-1 lg:col-span-2 xl:col-span-2">
                  <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.surname}
                    onChange={(e) => handleInputChange('surname', e.target.value)}
                    className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    required
                  />
                </div>
                <div className="md:col-span-1 lg:col-span-1 xl:col-span-1">
                  <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    required
                  />
                </div>
                <div className="sm:col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-1">
                  <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="sm:col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-1">
                  <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                    System ID
                  </label>
                  <input
                    type="text"
                    value={formData.sid}
                    onChange={(e) => handleInputChange('sid', e.target.value.toUpperCase())}
                    className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono`}
                  />
                </div>
              </div>
            </div>

            {/* Contact & Address - Side by side on tablets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              
              {/* Contact Information */}
              <div className="space-y-3 lg:space-y-4">
                <h3 className={`text-base sm:text-lg font-semibold ${theme.textPrimary} flex items-center space-x-2`}>
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Contact Information</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-3 lg:space-y-4">
                <h3 className={`text-base sm:text-lg font-semibold ${theme.textPrimary} flex items-center space-x-2`}>
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Address Information</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={formData.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
                    <div className="lg:col-span-2">
                      <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city || ''}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                        State
                      </label>
                      <input
                        type="text"
                        value={formData.state || ''}
                        onChange={(e) => handleInputChange('state', e.target.value.toUpperCase())}
                        className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                        placeholder="CA"
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode || ''}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact & Medical Info - Side by side on tablets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              
              {/* Emergency Contact */}
              <div className="space-y-3 lg:space-y-4">
                <h3 className={`text-base sm:text-lg font-semibold ${theme.textPrimary} flex items-center space-x-2`}>
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Emergency Contact</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                      Contact Name
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact?.name || ''}
                      onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                      placeholder="Emergency Contact Name"
                    />
                  </div>
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContact?.phone || ''}
                      onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                      placeholder="(555) 999-0000"
                    />
                  </div>
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                      Relationship
                    </label>
                    <select
                      value={formData.emergencyContact?.relationship || ''}
                      onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    >
                      <option value="">Select Relationship</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Child">Child</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Friend">Friend</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Medical & Insurance Information */}
              <div className="space-y-3 lg:space-y-4">
                <h3 className={`text-base sm:text-lg font-semibold ${theme.textPrimary} flex items-center space-x-2`}>
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Medical & Insurance</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                      SSN
                    </label>
                    <input
                      type="text"
                      value={formData.ssn}
                      disabled
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textSecondary} rounded-lg opacity-60 cursor-not-allowed text-sm font-mono`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                      Medical Record Number
                    </label>
                    <input
                      type="text"
                      value={formData.medicalRecordNumber || ''}
                      onChange={(e) => handleInputChange('medicalRecordNumber', e.target.value)}
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono`}
                      placeholder="MRN100001"
                    />
                  </div>
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                      Insurance Number
                    </label>
                    <input
                      type="text"
                      value={formData.insuranceNumber || ''}
                      onChange={(e) => handleInputChange('insuranceNumber', e.target.value)}
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono`}
                      placeholder="INS-001-001"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`border-t ${isMidnightTheme ? 'border-gray-700' : 'border-gray-200'} p-3 sm:p-4 lg:p-5 flex justify-end space-x-3 shrink-0`}>
          <button
            onClick={onClose}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 border ${theme.buttonSecondaryBorder} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg} rounded-lg transition-colors font-medium text-sm`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`bg-gradient-to-r ${theme.primary} ${theme.textOnAccent} px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2 font-medium text-sm`}
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const PatientSearchScreen: React.FC = () => {
  const { theme, isMidnightTheme } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [advancedFilters, setAdvancedFilters] = useState({
    ssn: '',
    sid: '',
    gender: '',
    dobFrom: '',
    dobTo: ''
  });

  // Initialize mock patients
  React.useEffect(() => {
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
      city: 'Anytown',
      state: 'CA',
      zipCode: `${12345 + i}`,
      emergencyContact: {
        name: `Emergency Contact ${i + 1}`,
        phone: `(555) ${String(999 - i).padStart(3, '0')}-0000`,
        relationship: i % 2 === 0 ? 'Spouse' : 'Parent'
      },
      medicalRecordNumber: `MRN${String(100001 + i)}`,
      insuranceNumber: `INS-${String(i + 1).padStart(3, '0')}-001`
    }));
    setPatients(mockPatients);
  }, []);

  // Enhanced filtering logic
  const filteredPatients = patients.filter(patient => {
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

  const tableHeaders = ["Patient ID", "Surname", "Name", "Date of Birth", "Gender", "SSN", "System ID"];

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

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowEditForm(true);
  };

  const handleSavePatient = (updatedPatient: Patient) => {
    setPatients(prev => 
      prev.map(p => p.id === updatedPatient.id ? updatedPatient : p)
    );
    alert('Patient information updated successfully!');
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedPatient(null);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex flex-col`}>
      <AppHeader
        title="NOAH - Patient Search"
        onBack={() => navigate(`/${SCREEN_NAMES.DASHBOARD}`)}
        showThemeButton={false}
      />

      <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex-grow">
        <div className={`${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col h-full`}>
          
          {/* Search and Add Section - Better tablet landscape layout */}
          <div className="flex flex-col space-y-3 lg:space-y-4 mb-4 sm:mb-6 lg:mb-8">
            {/* Top row - Basic search and buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-4">
              <div className="relative w-full md:max-w-md lg:max-w-lg xl:max-w-xl">
                <input
                  type="text"
                  placeholder="Search by name, ID, SSN, or SID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 pr-10 lg:pr-12 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} ${theme.inputPlaceholder} rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base lg:text-lg`}
                />
                <Search className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${theme.textSecondary}`} />
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
                <button
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className={`w-full sm:w-auto bg-gradient-to-r ${theme.primary} ${theme.textOnAccent} px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 rounded-lg sm:rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5 sm:space-x-2 font-medium text-sm sm:text-base lg:text-lg`}
                >
                  <Filter size={16} className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  <span>{showAdvancedSearch ? 'Hide Filters' : 'Advanced Search'}</span>
                </button>
                
                <button
                  onClick={() => navigate(`/${SCREEN_NAMES.EMERGENCY_CASE_DIAGNOSIS}`)}
                  className={`w-full sm:w-auto bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 rounded-lg sm:rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5 sm:space-x-2 font-medium text-sm sm:text-base lg:text-lg`}
                >
                  <UserPlus size={16} className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  <span>Add New Patient</span>
                </button>
              </div>
            </div>

            {/* Advanced Search Panel - Better landscape layout */}
            {showAdvancedSearch && (
              <div className={`${theme.inputBackground} border ${theme.inputBorder} rounded-lg sm:rounded-xl p-3 lg:p-4 space-y-3 lg:space-y-4`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
                  {/* SSN Filter */}
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                      SSN (Last 4 digits)
                    </label>
                    <input
                      type="text"
                      placeholder="1234"
                      maxLength={4}
                      value={advancedFilters.ssn}
                      onChange={(e) => handleAdvancedFilterChange('ssn', e.target.value)}
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    />
                  </div>

                  {/* SID Filter */}
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                      System ID
                    </label>
                    <input
                      type="text"
                      placeholder="NOH123456"
                      value={advancedFilters.sid}
                      onChange={(e) => handleAdvancedFilterChange('sid', e.target.value.toUpperCase())}
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    />
                  </div>

                  {/* Gender Filter */}
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium ${theme.textSecondary} mb-1`}>
                      Gender
                    </label>
                    <select
                      value={advancedFilters.gender}
                      onChange={(e) => handleAdvancedFilterChange('gender', e.target.value)}
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    >
                      <option value="">All Genders</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  {/* Clear Filters Button */}
                  <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-3 flex items-end">
                    <button
                      onClick={clearAdvancedFilters}
                      className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border ${theme.buttonSecondaryBorder} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg} rounded-lg transition-colors text-sm font-medium`}
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

          {/* Table Section - Optimized for landscape */}
          <div className="overflow-x-auto flex-grow">
            <div className="max-h-[calc(100vh-320px)] sm:max-h-[calc(100vh-300px)] md:max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-260px)] xl:max-h-[calc(100vh-240px)] overflow-y-auto border ${isMidnightTheme ? 'border-gray-700/60' : 'border-gray-300/70'} rounded-lg">
              <table className="min-w-full text-xs sm:text-sm lg:text-base">
                <thead className={`sticky top-0 ${theme.accent} ${theme.textOnAccent}`}>
                  <tr>
                    {tableHeaders.map(header => (
                      <th key={header} className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 font-semibold text-left whitespace-nowrap text-xs sm:text-sm lg:text-base">
                        {header}
                      </th>
                    ))}
                    <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 font-semibold text-center whitespace-nowrap text-xs sm:text-sm lg:text-base">Action</th>
                  </tr>
                </thead>
                <tbody className={`${isMidnightTheme ? 'bg-gray-800/60 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <tr key={patient.id} className={`border-b ${isMidnightTheme ? 'border-gray-700' : 'border-gray-200'} ${isMidnightTheme ? theme.textPrimary : 'text-gray-700'} hover:${isMidnightTheme ? 'bg-gray-700/50' : 'bg-gray-50/50'} transition-colors`}>
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
                          {new Date(patient.dob).toLocaleDateString()}
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            patient.gender === 'Male' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-pink-100 text-pink-800'
                          }`}>
                            {patient.gender}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 whitespace-nowrap">
                          <span className={`font-mono text-xs sm:text-sm ${theme.textSecondary}`}>{patient.ssn}</span>
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 whitespace-nowrap">
                          <span className={`font-mono text-xs sm:text-sm ${theme.textPrimary} font-medium`}>{patient.sid}</span>
                        </td>
                        <td className="px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <button 
                              onClick={() => handleEditPatient(patient)}
                              className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:opacity-90 transition-opacity"
                              title="Edit Patient"
                            >
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={tableHeaders.length + 1} className={`text-center py-6 sm:py-8 lg:py-10 ${theme.textSecondary} text-sm lg:text-base`}>
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

      <div className={`sticky bottom-0 left-0 right-0 bg-gradient-to-r ${theme.accent} p-3 sm:p-4 md:p-5 lg:p-6 border-t ${isMidnightTheme ? 'border-gray-600' : 'border-white/10'}`}>
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

      {/* Edit Form Modal */}
      {selectedPatient && (
        <PatientEditForm
          patient={selectedPatient}
          isOpen={showEditForm}
          onClose={handleCloseEditForm}
          onSave={handleSavePatient}
        />
      )}
    </div>
  );
};

export default PatientSearchScreen;
