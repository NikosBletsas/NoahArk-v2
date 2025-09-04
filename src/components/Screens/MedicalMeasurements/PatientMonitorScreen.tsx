import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Database,
  ArrowLeft,
  Thermometer,
  HeartPulse,
  Wind,
  Droplet,
  Gauge,
  Percent,
  Clock,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { SCREEN_NAMES } from "@/constants";

const VitalSignCard = ({
  value,
  label,
  icon: Icon,
  index,
}: {
  value: string;
  label: string;
  icon?: React.ElementType;
  index: number;
}) => {
  const { theme } = useTheme();
  const iconSize = label === "Last Check" ? "0.8em" : "0.6em";
  const textSize =
    label === "Last Check"
      ? "text-xl sm:text-2xl md:text-3xl"
      : "text-4xl sm:text-5xl md:text-6xl";

  return (
    <div
      className={`${theme.card} rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border hover:border-gray-300 group relative overflow-hidden`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        <div
          className={`font-bold ${theme.textPrimary} leading-none ${textSize} flex items-center justify-center gap-x-2`}
        >
          {Icon && <Icon style={{ width: iconSize, height: iconSize }} />}
          <span>{value}</span>
        </div>
        <div
          className={`text-xs sm:text-sm md:text-base ${theme.textSecondary} font-medium tracking-wide uppercase mt-2`}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

const PatientMonitorScreen: React.FC = () => {
  const { theme, currentThemeKey } = useTheme();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(65);
  const [logs, setLogs] = useState([
    {
      time: new Date().toLocaleString(),
      message: "System initialized",
      type: "info",
    },
    {
      time: new Date(Date.now() - 30000).toLocaleString(),
      message: "Sensor calibration complete",
      type: "success",
    },
    {
      time: new Date(Date.now() - 60000).toLocaleString(),
      message: "Data acquisition started",
      type: "info",
    },
    {
      time: new Date(Date.now() - 90000).toLocaleString(),
      message: "All sensors online",
      type: "success",
    },
  ]);

  const [vitalSigns, setVitalSigns] = useState({
    heartRate: 72,
    spO2: 98,
    temperature: 36.5,
    respiratoryRate: 16,
    bloodSugar: 95,
    systolicPressure: 120,
    meanPressure: 85,
    diastolicPressure: 80,
    checkTime: new Date().toLocaleTimeString(),
  });

  // Simulate real-time data updates with enhanced logging
  useEffect(() => {
    const interval = setInterval(() => {
      const newVitalSigns = {
        heartRate: Math.floor(Math.random() * 20) + 65,
        spO2: Math.floor(Math.random() * 5) + 95,
        temperature: parseFloat((Math.random() * 2 + 36).toFixed(1)),
        respiratoryRate: Math.floor(Math.random() * 8) + 12,
        bloodSugar: Math.floor(Math.random() * 30) + 80,
        systolicPressure: Math.floor(Math.random() * 30) + 110,
        diastolicPressure: Math.floor(Math.random() * 20) + 70,
        meanPressure: Math.floor(Math.random() * 20) + 75,
        checkTime: new Date().toLocaleTimeString(),
      };

      setVitalSigns(newVitalSigns);
      setProgress((prev) => Math.min(100, prev + Math.random() * 3));

      // Add new log entry occasionally
      if (Math.random() < 0.3) {
        setLogs((prev) => [
          {
            time: new Date().toLocaleString(),
            message: "Vital signs updated",
            type: "info",
          },
          ...prev.slice(0, 9),
        ]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const vitalSignsData = [
    {
      value: `${vitalSigns.heartRate}`,
      label: "Heart Rate",
      unit: "bpm",
      icon: HeartPulse,
    },
    { value: `${vitalSigns.spO2}`, label: "SpO2", unit: "%", icon: Percent },
    {
      value: `${vitalSigns.temperature}`,
      label: "Temperature",
      unit: "°C",
      icon: Thermometer,
    },
    {
      value: `${vitalSigns.respiratoryRate}`,
      label: "Respiratory Rate",
      unit: "bpm",
      icon: Wind,
    },
    {
      value: `${vitalSigns.bloodSugar}`,
      label: "Blood Sugar",
      unit: "mg/dL",
      icon: Droplet,
    },
    {
      value: `${vitalSigns.systolicPressure}`,
      label: "Systolic Pressure",
      unit: "mmHg",
      icon: Gauge,
    },
    {
      value: `${vitalSigns.meanPressure}`,
      label: "Mean Pressure",
      unit: "mmHg",
      icon: Gauge,
    },
    {
      value: `${vitalSigns.diastolicPressure}`,
      label: "Diastolic Pressure",
      unit: "mmHg",
      icon: Gauge,
    },
    { value: vitalSigns.checkTime, label: "Last Check", unit: "", icon: Clock },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background}`}>
      {/* Modern Header */}
      <div
        className={`bg-gradient-to-r ${theme.accent} px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex justify-between items-center shadow-2xl relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
        <h1
          className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.textOnAccent} relative z-10 tracking-tight`}
        >
          Patient Monitor
        </h1>
      </div>

      <div className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Responsive Main Content */}
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 md:gap-8">
          {/* Vital Signs Grid - Responsive layout */}
          <div className="flex-1">
            <div
              className={`${theme.card} rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border hover:border-gray-300 transition-all duration-300`}
            >
              {/* Grid adapts: 2 cols on mobile/tablet portrait, 3 cols on tablet landscape/desktop */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {vitalSignsData.map((item, index) => (
                  <VitalSignCard
                    key={item.label}
                    value={item.value}
                    label={item.label}
                    icon={item.icon}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Log Field - Responsive positioning */}
          <div className="w-full xl:w-96 order-first xl:order-last">
            <div
              className={`${theme.card} rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 h-full min-h-[300px] xl:min-h-[600px] border hover:border-gray-300 transition-all duration-300`}
            >
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <Activity className={`${theme.icon} mr-3`} size={24} />
                <h3
                  className={`text-lg sm:text-xl md:text-2xl font-bold ${theme.textPrimary} tracking-tight`}
                >
                  System Log
                </h3>
              </div>
              <div
                className={`${theme.inputBackground} ${theme.inputBorder} border-2 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 h-48 sm:h-64 md:h-80 xl:h-96 overflow-y-auto text-sm sm:text-base ${theme.textSecondary} scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent`}
              >
                <div className="space-y-3 sm:space-y-4">
                  {logs.map((log, index) => {
                    const isSuccess = log.type === "success";
                    const isBlackTheme = currentThemeKey === "black";

                    const logStyle = isSuccess
                      ? isBlackTheme
                        ? "bg-green-100/20 text-green-400 border border-green-500/30"
                        : "bg-green-100/30 text-green-700 border border-green-200"
                      : isBlackTheme
                      ? "bg-blue-100/20 border border-blue-500/30 text-gray-300"
                      : "bg-blue-100/30 border border-blue-200";

                    return (
                      <div
                        key={log.time}
                        className={`text-xs sm:text-sm p-2 sm:p-3 rounded-lg ${logStyle} ${
                          isBlackTheme ? "" : theme.textPrimary
                        }`}
                      >
                        <span
                          className={`font-mono text-xs ${
                            isBlackTheme ? "opacity-90" : "opacity-80"
                          }`}
                        >
                          {log.time}
                        </span>
                        <br />
                        <span className="font-medium">{log.message}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div
          className={`${theme.card} rounded-2xl sm:rounded-3xl shadow-2xl mt-4 sm:mt-6 md:mt-8 p-4 sm:p-6 md:p-8 border hover:border-gray-300 transition-all duration-300`}
        >
          {/* Modern Progress Bar */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
            <Database className={`${theme.icon} flex-shrink-0`} size={28} />
            <span
              className={`text-sm sm:text-base md:text-lg font-semibold ${theme.textPrimary} tracking-wide`}
            >
              Data Acquisition Progress
            </span>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 sm:h-4 md:h-5 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
              </div>
            </div>
            <span
              className={`text-sm sm:text-base md:text-lg font-bold ${theme.textSecondary} min-w-[60px] text-right`}
            >
              {Math.round(progress)}%
            </span>
          </div>

          {/* Enhanced Return Button */}
          <button
            onClick={() => navigate(`/${SCREEN_NAMES.MEASUREMENTS}`)}
            className={`flex items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base md:text-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <ArrowLeft
              size={20}
              className="sm:w-6 sm:h-6 md:w-7 md:h-7 relative z-10"
            />
            <span className="relative z-10 tracking-wide">
              Return to Devices
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientMonitorScreen;
