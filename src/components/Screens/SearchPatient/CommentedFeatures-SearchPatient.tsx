/*
 * PatientSearchScreen - Commented Features Reference
 * This file contains all the commented-out functionality that was removed from the main component.
 * Keep this file for reference if you need to re-enable any of these features in the future.
 */

// COMMENTED OUT IMPORTS:
// import { Filter } from "lucide-react"; // For client filters
// import { Edit } from "lucide-react"; // For edit functionality
// import PatientEditForm from "./PatientEditForm"; // Edit form component

// COMMENTED OUT STATE VARIABLES:
/*
const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
const [showEditForm, setShowEditForm] = useState(false);
const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
const [advancedFilters, setAdvancedFilters] = useState({
  ssn: "",
  sid: "",
  gender: "",
  dobFrom: "",
  dobTo: "",
});
*/

// COMMENTED OUT CLIENT-SIDE FILTERING LOGIC:
/*
const filteredPatients = (patients || []).filter((patient) => {
  let matches = true;

  if (showAdvancedSearch) {
    const ssnMatch =
      !advancedFilters.ssn || patient.ssn.includes(advancedFilters.ssn);
    const sidMatch =
      !advancedFilters.sid ||
      patient.sid.toLowerCase().includes(advancedFilters.sid.toLowerCase());
    const genderMatch =
      !advancedFilters.gender || patient.gender === advancedFilters.gender;

    matches = ssnMatch && sidMatch && genderMatch;
  }

  return matches;
});
*/

// COMMENTED OUT FILTER FUNCTIONS:
/*
const handleAdvancedFilterChange = (field: string, value: string) => {
  setAdvancedFilters((prev) => ({ ...prev, [field]: value }));
};

const clearAdvancedFilters = () => {
  setAdvancedFilters({
    ssn: "",
    sid: "",
    gender: "",
    dobFrom: "",
    dobTo: "",
  });
};
*/

// COMMENTED OUT EDIT FUNCTIONALITY:
/*
const handleEditPatient = (patient: Patient) => {
  setSelectedPatient(patient);
  setShowEditForm(true);
};

const handleSavePatient = (updatedPatient: Patient) => {
  setPatients((prev) =>
    prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
  );
  alert("Patient information updated successfully!");
};

const handleCloseEditForm = () => {
  setShowEditForm(false);
  setSelectedPatient(null);
};
*/

// COMMENTED OUT CLIENT FILTERS BUTTON:
/*
<button
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
</button>
*/

// COMMENTED OUT ADVANCED SEARCH PANEL:
/*
{showAdvancedSearch && (
  <div
    className={`${theme.inputBackground} border ${theme.inputBorder} rounded-lg sm:rounded-xl p-3 lg:p-4 space-y-3 lg:space-y-4`}
  >
    <div className="text-xs text-yellow-600 mb-2">
      Note: These filters work on already loaded results (client-side filtering)
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
      {/* SSN Filter */}
      <div>
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
      </div>

      {/* SID Filter */}
      <div>
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
      </div>

      {/* Gender Filter */}
      <div>
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
*/

// COMMENTED OUT ACTION COLUMN HEADER:
/*
<th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 font-semibold text-center whitespace-nowrap text-xs sm:text-sm lg:text-base">
  Action
</th>
*/

// COMMENTED OUT EDIT BUTTON IN TABLE ROWS:
/*
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
*/

// COMMENTED OUT EDIT FORM MODAL:
/*
{selectedPatient && (
  <PatientEditForm
    patient={selectedPatient}
    isOpen={showEditForm}
    onClose={handleCloseEditForm}
    onSave={handleSavePatient}
  />
)}
*/

/*
 * INSTRUCTIONS FOR RE-ENABLING FEATURES:
 * 
 * 1. Client-Side Filtering:
 *    - Add Filter import back to lucide-react imports
 *    - Add showAdvancedSearch and advancedFilters state
 *    - Add handleAdvancedFilterChange and clearAdvancedFilters functions
 *    - Replace filteredPatients logic with the commented filtering logic
 *    - Add the Client Filters button back
 *    - Add the Advanced Search Panel back
 * 
 * 2. Edit Functionality:
 *    - Add Edit import back to lucide-react imports  
 *    - Add PatientEditForm import
 *    - Add showEditForm and selectedPatient state
 *    - Add handleEditPatient, handleSavePatient, and handleCloseEditForm functions
 *    - Add Action column header back to tableHeaders array
 *    - Add edit button column back to table rows
 *    - Add PatientEditForm modal at the bottom
 *    - Update colSpan in empty state to account for action column
 * 
 * 3. Alternative Search Logic (if needed):
 *    - Replace the current handleSearch with the old parsing logic
 *    - Change input fields back to single search input
 *    - Update state from firstName/lastName back to searchTerm
 */