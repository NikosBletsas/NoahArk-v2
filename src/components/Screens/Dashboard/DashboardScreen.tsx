import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Heart,
  Settings,
  Camera,
  User,
  FileText,
  RefreshCw,
  Monitor as DeviceMonitor,
  BriefcaseMedical,
  HardDrive,
  ScanLine,
  Video,
  Pill,
  Brain,
  Loader,
  AlertCircle,
  Activity,
  X,
  Battery,
  BatteryLow,
} from "lucide-react";

import { useTheme } from "@/contexts/ThemeContext";
import { SCREEN_NAMES } from "@/constants";
import { useDashboard } from "@/hooks/useDashboard";
import ConfirmationModal from "@/components/Modals/ConfirmationModal";

interface DashboardTileProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  disabledReason?: string;
}

const DashboardTile: React.FC<DashboardTileProps> = ({
  icon,
  label,
  onClick,
  disabled = false,
  disabledReason,
}) => {
  const { theme } = useTheme();
  
  const handleClick = () => {
    if (disabled && disabledReason) {
      // Show tooltip or alert with disabled reason
      alert(disabledReason);
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        theme.card
      } backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center cursor-pointer hover:scale-105 transition-all duration-200 shadow-lg border border-white/20 flex flex-col items-center justify-center aspect-square ${
        disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : ""
      }`}
      title={disabled ? disabledReason : undefined}
    >
      {icon}
      <h3
        className={`font-semibold mt-2 text-xs sm:text-sm md:text-base lg:text-lg ${
          disabled ? 'text-gray-400' : theme.textPrimary
        }`}
      >
        {label}
      </h3>
    </div>
  );
};

const DashboardScreen: React.FC = () => {
  const { theme, isMidnightTheme, currentThemeKey } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // State for new emergency case
  const [newEmergencyCase, setNewEmergencyCase] = useState<any>(null);
  const [showCaseSuccess, setShowCaseSuccess] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState<string>("N/A");
  const [hasActiveEmergencyCase, setHasActiveEmergencyCase] = useState<boolean>(false);
  
  // State for reset confirmation modal
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  // All dashboard logic is now contained in the hook
  const dashboard = useDashboard();

  // Load patient ID and emergency case status from localStorage on mount and listen for changes
  useEffect(() => {
    const loadEmergencyCaseData = () => {
      try {
        const storedCase = localStorage.getItem("currentEmergencyCase");
        if (storedCase) {
          const caseData = JSON.parse(storedCase);
          setCurrentPatientId(caseData?.patientId || "N/A");
          setHasActiveEmergencyCase(true);
        } else {
          setCurrentPatientId("N/A");
          setHasActiveEmergencyCase(false);
        }
      } catch (error) {
        console.error("Failed to load emergency case data:", error);
        setCurrentPatientId("N/A");
        setHasActiveEmergencyCase(false);
      }
    };

    // Load on mount
    loadEmergencyCaseData();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadEmergencyCaseData();
    };

    window.addEventListener("emergencyCaseUpdated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("emergencyCaseUpdated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Check for new emergency case data from navigation
  useEffect(() => {
    if (location.state?.newEmergencyCase) {
      const caseData = location.state.newEmergencyCase;
      setNewEmergencyCase(caseData);
      setShowCaseSuccess(true);

      // Store case data in localStorage for persistence with all patient info
      try {
        const completeCase = {
          ...caseData,
          // Ensure patient ID is included
          patientId: caseData.patientId,
          patientName: caseData.patientName,
          patientSurname: caseData.patientSurname,
          caseId: caseData.caseId,
          createdAt: caseData.createdAt || new Date().toISOString(),
        };
        localStorage.setItem(
          "currentEmergencyCase",
          JSON.stringify(completeCase)
        );
        setCurrentPatientId(caseData.patientId || "N/A");
        setHasActiveEmergencyCase(true);
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event("emergencyCaseUpdated"));
      } catch (error) {
        console.error("Failed to store case data:", error);
      }

      // Clear the navigation state to prevent showing again on refresh
      navigate(location.pathname, { replace: true });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowCaseSuccess(false);
      }, 5000);
    }
  }, [location.state, navigate, location.pathname]);

  const iconSize = "w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16";

  const tiles = [
    {
      icon: <Search className={`${iconSize} mx-auto ${hasActiveEmergencyCase ? 'text-gray-400' : theme.icon}`} />,
      label: "Search Patient",
      screen: SCREEN_NAMES.PATIENT_SEARCH,
      disabled: hasActiveEmergencyCase,
      disabledReason: "Emergency case is active. Reset case to search for a new patient.",
    },
    {
      icon: <Heart className={`${iconSize} mx-auto text-red-500`} />,
      label: "Medical Measurements",
      screen: SCREEN_NAMES.MEASUREMENTS,
    },
    {
      icon: (
        <BriefcaseMedical className={`${iconSize} mx-auto text-pink-600`} />
      ),
      label: "Assign Emergency",
      screen: SCREEN_NAMES.ASSIGN_EMERGENCY,
    },
    {
      icon: <HardDrive className={`${iconSize} mx-auto text-yellow-600`} />,
      label: "Device Setup",
      screen: SCREEN_NAMES.DEVICE_CONFIGURATION,
    },
    {
      icon: dashboard.isScanning ? (
        <Loader className={`${iconSize} mx-auto text-sky-600 animate-spin`} />
      ) : (
        <ScanLine className={`${iconSize} mx-auto text-sky-600`} />
      ),
      label: "Scan Documents",
      onClick: dashboard.scanDocument,
      disabled: dashboard.isScanning,
    },
    {
      icon: <Camera className={`${iconSize} mx-auto text-orange-600`} />,
      label: "Video Conference",
      screen: undefined,
    },
    {
      icon: <Video className={`${iconSize} mx-auto text-blue-500`} />,
      label: "Webex Call",
      screen: undefined,
    },
    {
      icon: <Pill className={`${iconSize} mx-auto text-rose-500`} />,
      label: "Drugs Inventory",
      screen: undefined,
    },
    {
      icon: dashboard.isSendingData ? (
        <Loader
          className={`${iconSize} mx-auto text-indigo-600 animate-spin`}
        />
      ) : (
        <User className={`${iconSize} mx-auto text-indigo-600`} />
      ),
      label: "Send Data to Doctor",
      onClick: dashboard.sendDataToDoctor,
      disabled: dashboard.isSendingData,
    },
    {
      icon: <FileText className={`${iconSize} mx-auto text-teal-600`} />,
      label: "Case Consultations",
      screen: SCREEN_NAMES.CONSULTATIONS,
    },
    {
      icon: <Brain className={`${iconSize} mx-auto text-red-600`} />,
      label: "Artificial Intelligence",
      screen: undefined,
    },
    {
      icon: <Settings className={`${iconSize} mx-auto text-gray-600`} />,
      label: "System Operations",
      screen: SCREEN_NAMES.SYSTEM_OPERATIONS,
    },
  ];

  const handleTileClick = (tile: (typeof tiles)[0]) => {
    if (tile.disabled) {
      return; // Don't navigate if disabled
    }
    if (tile.onClick) {
      tile.onClick();
    } else if (tile.screen) {
      navigate(`/${tile.screen}`);
    }
  };

  // Helper function to get battery icon and clean percentage
  const getBatteryDisplay = () => {
    const batteryStatus = dashboard.batteryStatus;

    // Extract percentage from string (e.g., "85%" -> "85")
    const percentageMatch = batteryStatus.match(/(\d+)/);
    const percentage = percentageMatch ? parseInt(percentageMatch[1]) : null;

    if (percentage === null || batteryStatus === "N/A") {
      return {
        icon: <Battery className="w-3 h-3 text-gray-400" />,
        text: "N/A",
      };
    }

    // Choose icon and color based on percentage
    let icon;
    let textColor = "";

    if (percentage <= 20) {
      icon = <BatteryLow className="w-3 h-3 text-red-400" />;
      textColor = "text-red-400";
    } else if (percentage <= 50) {
      icon = <Battery className="w-3 h-3 text-yellow-400" />;
      textColor = "text-yellow-400";
    } else {
      icon = <Battery className="w-3 h-3 text-green-400" />;
      textColor = "text-green-400";
    }

    return {
      icon,
      text: `${percentage}%`,
      textColor,
    };
  };

  // Handle reset case function
  const handleResetCase = async () => {
    try {
      // Call the API first
      await dashboard.resetCase();
      
      // Only clear localStorage after successful API call
      localStorage.removeItem("currentEmergencyCase");
      setNewEmergencyCase(null);
      setCurrentPatientId("N/A");
      setHasActiveEmergencyCase(false);
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("emergencyCaseUpdated"));
    } catch (error) {
      console.error("Failed to reset case:", error);
      // Don't clear localStorage if API call failed
    }
  };

  // DEBUG: Test function to create a fake emergency case
  const handleTestEmergencyCase = () => {
    const testCase = {
      caseId: "TEST-123",
      patientId: "PATIENT-456",
      patientName: "John",
      patientSurname: "Doe",
      createdAt: new Date().toISOString(),
    };
    
    console.log("Creating test emergency case:", testCase);
    localStorage.setItem("currentEmergencyCase", JSON.stringify(testCase));
    setNewEmergencyCase(testCase);
    setCurrentPatientId(testCase.patientId);
    setHasActiveEmergencyCase(true);
    window.dispatchEvent(new Event("emergencyCaseUpdated"));
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.background} relative flex flex-col pb-16 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-32`}
    >
      {/* Success Notification */}
      {showCaseSuccess && newEmergencyCase && (
        <div className="bg-green-600 text-white p-3 sm:p-4 flex items-center justify-between animate-in slide-in-from-top duration-300">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold">
                Emergency Case Created Successfully!
              </p>
              <p className="text-sm opacity-90">
                Case ID: {newEmergencyCase.caseId} | Patient ID:{" "}
                {newEmergencyCase.patientId} | Patient:{" "}
                {newEmergencyCase.patientName} {newEmergencyCase.patientSurname}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCaseSuccess(false)}
            className="p-1 hover:bg-green-700 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div
        className={`${theme.card} backdrop-blur-lg border-b border-white/20 p-3 sm:p-4 md:p-5 lg:p-6 z-10`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="w-40 h-24 sm:w-44 sm:h-26 md:w-48 md:h-28 flex items-center justify-center">
            <img
              src={
                currentThemeKey === "black"
                  ? "/assets/NoA.H. Logo Horizontal white.svg"
                  : "/assets/NoA.H. Logo Horizontal blue-black.svg"
              }
              alt="NOAH Logo"
              className="w-full h-full object-contain max-w-40 max-h-24 sm:max-w-44 sm:max-h-26 md:max-w-48 md:h-28"
            />
          </div>
          <div
            className={`text-xs sm:text-sm md:text-base lg:text-lg ${theme.textPrimary} font-semibold text-center flex-1 pr-16 sm:pr-20 md:pr-16`}
          >
            Telemedicine EMR System
            {dashboard.isAppInitializing && (
              <div className="flex items-center justify-center mt-2">
                <Loader className="w-4 h-4 animate-spin mr-2" />
                <span className="text-xs">Initializing...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div
        className={`bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} p-3 sm:p-4 md:p-5 lg:p-6`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
              Status Information
            </h2>
            <button
              onClick={dashboard.refreshBatteryStatus}
              className="flex items-center space-x-2 px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              disabled={dashboard.isBatteryLoading}
            >
              {dashboard.isBatteryLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              <span className="text-sm">Refresh</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-2 text-xs sm:text-sm md:text-base lg:text-lg">
            <div className="flex justify-between">
              <span>Patient ID</span>
              <span
                className={
                  currentPatientId !== "N/A"
                    ? "text-green-400 font-semibold"
                    : ""
                }
              >
                {(() => {
                  // Always get the latest patient ID from localStorage
                  try {
                    const storedCase = localStorage.getItem("currentEmergencyCase");
                    if (storedCase) {
                      const caseData = JSON.parse(storedCase);
                      return caseData?.patientId || "N/A";
                    }
                  } catch (error) {
                    console.error("Failed to parse stored case:", error);
                  }
                  return "N/A";
                })()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>System time</span>
              <span>{dashboard.currentTime}</span>
            </div>
            <div className="flex justify-between">
              <span>Connection Status</span>
              <span
                className={
                  dashboard.hubConnectionStatus === "Connected"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {dashboard.hubConnectionStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Hub Status</span>
              <span
                className={
                  dashboard.hubConnectionStatus === "Connected"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {dashboard.hubConnectionStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Video</span>
              <span>{dashboard.videoStatus}</span>
            </div>
            <div className="flex justify-between">
              <span>Case No</span>
              <span
                className={
                  hasActiveEmergencyCase ? "text-green-400 font-semibold" : ""
                }
              >
                {hasActiveEmergencyCase ? "1" : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Case ID</span>
              <span
                className={
                  hasActiveEmergencyCase ? "text-green-400 font-semibold" : ""
                }
              >
                {(() => {
                  // Try to get case ID from current emergency case data
                  const storedCase = localStorage.getItem(
                    "currentEmergencyCase"
                  );
                  if (storedCase) {
                    try {
                      const caseData = JSON.parse(storedCase);
                      return caseData?.caseId || "N/A";
                    } catch {
                      return "N/A";
                    }
                  }
                  return newEmergencyCase?.caseId || "N/A";
                })()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Battery Status</span>
              <span className="flex items-center space-x-1">
                {dashboard.isBatteryLoading ? (
                  <Loader className="w-3 h-3 animate-spin" />
                ) : dashboard.batteryError ? (
                  <span className="flex items-center space-x-1 text-red-400">
                    <AlertCircle className="w-3 h-3" />
                    <span>Error</span>
                  </span>
                ) : (
                  (() => {
                    const batteryDisplay = getBatteryDisplay();
                    return (
                      <span className="flex items-center space-x-1">
                        {batteryDisplay.icon}
                        <span className={batteryDisplay.textColor || ""}>
                          {batteryDisplay.text}
                        </span>
                      </span>
                    );
                  })()
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Heartbeat</span>
              <span className="flex items-center space-x-1">
                <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                <span>{dashboard.heartbeat}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Tiles */}
      <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex-grow overflow-y-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-7">
          {tiles.map((tile) => (
            <DashboardTile
              key={tile.label}
              icon={tile.icon}
              label={tile.label}
              onClick={() => handleTileClick(tile)}
              disabled={tile.disabled}
              disabledReason={tile.disabledReason}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r ${
          theme.accent
        } p-2 sm:p-3 md:p-4 lg:p-5 z-10 border-t ${
          isMidnightTheme || currentThemeKey === "black"
            ? "border-gray-600"
            : "border-white/10"
        }`}
      >
        <div className="flex justify-around max-w-2xl mx-auto">
          <button
            className={`flex flex-col items-center ${theme.textOnAccent} hover:opacity-80 transition-opacity px-1 py-1 sm:px-2 md:px-3`}
          >
            <FileText className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mb-0.5" />
            <span className="text-xs md:text-sm lg:text-base block">Save</span>
          </button>

          <button
            onClick={() => {
              // Show confirmation modal if there's an active case
              if (hasActiveEmergencyCase) {
                setShowResetConfirmation(true);
              } else {
                // If no active case, reset directly
                handleResetCase();
              }
            }}
            disabled={dashboard.isResettingCase}
            className={`flex flex-col items-center ${theme.textOnAccent} hover:opacity-80 transition-opacity px-1 py-1 sm:px-2 md:px-3 disabled:opacity-50`}
          >
            {dashboard.isResettingCase ? (
              <Loader className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mb-0.5 animate-spin" />
            ) : (
              <RefreshCw className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mb-0.5" />
            )}
            <span className="text-xs md:text-sm lg:text-base block">
              {dashboard.isResettingCase ? "Resetting..." : "Reset"}
            </span>
          </button>

          <button
            onClick={dashboard.initializeDevices}
            disabled={dashboard.isInitializingDevices}
            className={`flex flex-col items-center ${theme.textOnAccent} hover:opacity-80 transition-opacity px-1 py-1 sm:px-2 md:px-3 disabled:opacity-50`}
          >
            {dashboard.isInitializingDevices ? (
              <Loader className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mb-0.5 animate-spin" />
            ) : (
              <DeviceMonitor className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mb-0.5" />
            )}
            <span className="text-xs md:text-sm lg:text-base block">
              Devices
            </span>
          </button>

          <button
            onClick={() => navigate(`/${SCREEN_NAMES.SETTINGS}`)}
            className={`flex flex-col items-center ${theme.textOnAccent} hover:opacity-80 transition-opacity px-1 py-1 sm:px-2 md:px-3`}
          >
            <Settings className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mb-0.5" />
            <span className="text-xs md:text-sm lg:text-base block">
              Advanced
            </span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <ConfirmationModal
        isOpen={showResetConfirmation}
        onCancel={() => setShowResetConfirmation(false)}
        onConfirm={() => {
          setShowResetConfirmation(false);
          handleResetCase();
        }}
        title="Reset Emergency Case"
        message={`Are you sure you want to reset the current emergency case?

This action will:
• Clear all case data and measurements
• Reset Patient ID: ${currentPatientId}
• Allow you to search for a new patient
• Disconnect any connected medical devices

This action cannot be undone.`}
        confirmText="Reset Case"
        cancelText="Cancel"
        theme={theme}
        isMidnightTheme={isMidnightTheme}
        isLoading={dashboard.isResettingCase}
      />
    </div>
  );
};

export default DashboardScreen;
