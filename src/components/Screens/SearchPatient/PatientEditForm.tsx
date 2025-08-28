import React, { useState } from 'react';
import { X, Save, User, Phone, Mail, MapPin, Heart, Shield } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Patient } from '@/types';

interface PatientEditFormProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPatient: Patient) => void;
}

const PatientEditForm: React.FC<PatientEditFormProps> = ({ 
  patient, 
  isOpen, 
  onClose, 
  onSave 
}) => {
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

        {/* Form Content */}
        <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[calc(98vh-120px)] md:max-h-[calc(90vh-120px)] lg:max-h-[calc(85vh-130px)]">
          <div className="space-y-4 md:space-y-5 lg:space-y-6">
            
            {/* Basic Information */}
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

            {/* Contact & Address */}
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

            {/* Emergency Contact & Medical Info */}
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

export default PatientEditForm;