import React, { useState } from 'react';
import { Activity, Save, RefreshCw, Monitor as DeviceMonitor, Settings as SettingsIcon, Eye, EyeOff, FolderOpen, Copy, CheckCircle, Menu as MenuIcon, X } from 'lucide-react';
import { BaseScreenProps } from '../types';
import { SCREEN_NAMES } from '../constants';
import FormSection from './shared/FormSection';
import InputWithIconButton from './shared/InputWithIconButton';
import { LabelledInput } from './shared/FormControls';

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  theme: BaseScreenProps['theme'];
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ icon, label, isActive, onClick, theme }) => {
  const activeBg = isActive ? `bg-gradient-to-r ${theme.primary}` : '';
  const activeText = isActive ? 'text-white' : 'text-white'; // Always white text on dark sidebar
  const hoverBg = isActive ? '' : 'hover:bg-white/10'; // Always white/10 for good contrast

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-2 sm:space-x-3 md:space-x-3.5 px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 rounded-md transition-colors duration-150 ${activeBg} ${activeText} ${hoverBg} text-sm sm:text-base md:text-lg lg:text-xl`}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const SettingsScreen: React.FC<BaseScreenProps> = ({ 
    theme, 
    setCurrentScreen, 
    isMidnightTheme, 
    currentThemeKey, 
    setShowThemeSelector
}) => {
  const [showFtpPassword, setShowFtpPassword] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarAccentBg = `bg-gradient-to-b ${theme.accent}`;
  // Fixed: Always use white text on sidebar since accent background is always dark
  const sidebarTextColor = 'text-white';
  
  const sidebarContent = (isMobile?: boolean) => (
    <>
      <div className={`flex items-center ${isMobile ? 'justify-between' : ''} space-x-2 mb-4 sm:mb-6 md:mb-7 lg:mb-8 p-2 border-b border-white/20`}>
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-gradient-to-r ${theme.primary} rounded-lg flex items-center justify-center`}>
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
          </div>
          <span className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold ${sidebarTextColor}`}>Menu</span>
        </div>
        {isMobile && (
          <button onClick={() => setIsMobileMenuOpen(false)} className={`p-2 rounded-md ${sidebarTextColor} hover:bg-white/20`}>
            <X size={22} className="md:size-24 lg:size-28" />
          </button>
        )}
      </div>
      <nav className="space-y-1.5 sm:space-y-2 md:space-y-2.5 lg:space-y-3 flex-grow">
        <SidebarNavItem icon={<Save size={18} className="sm:size-5 md:size-6 lg:size-7" />} label="Save" theme={theme} onClick={() => console.log("Save clicked")} />
        <SidebarNavItem icon={<RefreshCw size={18} className="sm:size-5 md:size-6 lg:size-7" />} label="Restart" theme={theme} onClick={() => console.log("Restart clicked")} />
        <SidebarNavItem icon={<DeviceMonitor size={18} className="sm:size-5 md:size-6 lg:size-7" />} label="Devices" theme={theme} onClick={() => console.log("Devices clicked")} />
        <SidebarNavItem 
          icon={<SettingsIcon size={18} className="sm:size-5 md:size-6 lg:size-7" />} 
          label="Advanced" 
          theme={theme} 
          onClick={() => {
             setCurrentScreen(SCREEN_NAMES.DASHBOARD);
             if(isMobile) setIsMobileMenuOpen(false);
          }}
        />
      </nav>
      <div className={`mt-auto pt-3 sm:pt-4 md:pt-5 lg:pt-6 border-t border-white/20`}>
          <div className="w-36 sm:w-44 h-10 sm:h-12 flex items-center justify-center">
            <img 
              src="/assets/NoA.H. Logo Horizontal white.svg" 
              alt="NOAH Logo" 
              className="w-36 sm:w-44 h-10 sm:h-12 object-contain -m-1"
            />
          </div>
        <p className="text-xs md:text-sm lg:text-base mt-1 text-white text-opacity-50">Telemedicine EMR Version 1.7.2.0</p>
      </div>
    </>
  );

  return (
    <div className={`min-h-screen flex bg-gradient-to-br ${theme.background}`}>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`
          fixed top-0 left-0 h-full ${sidebarAccentBg} w-64 md:w-72 flex flex-col 
          p-4 shadow-lg z-40 
          transform transition-transform duration-300 ease-in-out md:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          overflow-y-auto
        `}>
        {sidebarContent(true)}
      </div>
      
      {/* Desktop Sidebar */}
      <div 
        className={`
          ${sidebarAccentBg} w-72 h-screen flex flex-col 
          p-4 shadow-lg 
          fixed top-0 left-0 z-20 hidden md:flex 
          overflow-y-auto
        `}>
        {sidebarContent()}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full md:ml-72 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <button onClick={() => setIsMobileMenuOpen(true)} className={`p-2 rounded-md ${theme.card} ${theme.textPrimary} shadow`}>
            <MenuIcon size={24} />
          </button>
          <button
            onClick={() => setShowThemeSelector && setShowThemeSelector(true)}
            className={`p-2 ${theme.card} backdrop-blur-lg rounded-xl shadow-lg border border-white/20 hover:scale-105`}
            title="Change Theme"
          >
            <div className={`w-5 h-5 bg-gradient-to-r ${theme.primary} rounded-md`}></div>
          </button>
        </div>
         {/* Desktop Theme Button in content area */}
         <div className="hidden md:flex justify-end mb-4 lg:mb-6">
            {setShowThemeSelector && (
                <button
                    onClick={() => setShowThemeSelector(true)}
                    className={`p-3 md:p-3.5 lg:p-4 ${theme.card} backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:scale-105 transition-all duration-200`}
                    title="Change Theme"
                >
                    <div className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gradient-to-r ${theme.primary} rounded-lg`}></div>
                </button>
            )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
            <FormSection title="EMR" theme={theme}>
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                <LabelledInput label="EMR Address" id="emr-address" defaultValue="https://primemarine.tma.com.gr" theme={theme} />
                <LabelledInput label="EMR API Base Address" id="emr-api" placeholder="e.g., /api/v1" theme={theme} />
              </div>
            </FormSection>

            <FormSection title="Video Settings" theme={theme}>
              <LabelledInput label="Video Stream Port" id="video-stream-port" placeholder="e.g., 8080" theme={theme} />
            </FormSection>

            <FormSection title="Software Activation" theme={theme}>
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                <InputWithIconButton
                  label="System ID"
                  id="system-id"
                  theme={theme}
                  currentThemeKey={currentThemeKey}
                  value="00000000000000000000"
                  isReadOnly={true}
                  icon={<Copy size={16} className={`${theme.textSecondary} md:size-5 lg:size-6`} />}
                  onIconClick={() => navigator.clipboard.writeText("00000000000000000000")}
                  buttonTitle="Copy System ID"
                />
                <LabelledInput label="Enter Key" id="activation-key" placeholder="Enter software activation key" theme={theme} />
                <button className={`w-full sm:w-auto bg-gradient-to-r ${theme.primary} ${theme.textOnAccent} px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 rounded-md sm:rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5 sm:space-x-2 font-medium text-sm sm:text-base md:text-lg lg:text-xl`}>
                  <CheckCircle size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  <span>Verify Key</span>
                </button>
              </div>
            </FormSection>
          </div>

          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
            <FormSection title="FTP" theme={theme}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                <LabelledInput label="Host" id="ftp-host" defaultValue="primemarine.tma.com.gr" theme={theme} />
                <LabelledInput label="Port" id="ftp-port" placeholder="e.g., 21" theme={theme} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-3 sm:mt-4 md:mt-5 lg:mt-6">
                <LabelledInput label="Username" id="ftp-username" placeholder="FTP Username" theme={theme} />
                 <InputWithIconButton
                  label="Password"
                  id="ftp-password"
                  type={showFtpPassword ? 'text' : 'password'}
                  theme={theme}
                  currentThemeKey={currentThemeKey}
                  placeholder="FTP Password"
                  icon={showFtpPassword ? <EyeOff size={16} className={`${theme.textSecondary} md:size-5 lg:size-6`} /> : <Eye size={16} className={`${theme.textSecondary} md:size-5 lg:size-6`} />}
                  onIconClick={() => setShowFtpPassword(!showFtpPassword)}
                  buttonTitle={showFtpPassword ? "Hide password" : "Show password"}
                />
              </div>
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 mt-3 sm:mt-4 md:mt-5 lg:mt-6">
                <InputWithIconButton
                  label="Temporary Local Folder"
                  id="temp-local-folder"
                  theme={theme}
                  currentThemeKey={currentThemeKey}
                  placeholder="/path/to/temp/local"
                  icon={<FolderOpen size={16} className={`${theme.textSecondary} md:size-5 lg:size-6`} />}
                  onIconClick={() => console.log("Browse for Temporary Local Folder")}
                  buttonTitle="Browse"
                />
                <InputWithIconButton
                  label="Final Local Folder"
                  id="final-local-folder"
                  theme={theme}
                  currentThemeKey={currentThemeKey}
                  placeholder="/path/to/final/local"
                  icon={<FolderOpen size={16} className={`${theme.textSecondary} md:size-5 lg:size-6`} />}
                  onIconClick={() => console.log("Browse for Final Local Folder")}
                  buttonTitle="Browse"
                />
                <LabelledInput label="Temporary Remote Folder" id="temp-remote-folder" placeholder="/remote/temp" theme={theme} />
                <LabelledInput label="Final Remote Folder" id="final-remote-folder" placeholder="/remote/final" theme={theme} />
              </div>
            </FormSection>

            <FormSection title="Video Call Settings" theme={theme}>
              <LabelledInput label="URL" id="video-call-url" placeholder="Enter video call service URL" theme={theme} />
            </FormSection>

            <FormSection title="Drug List Settings" theme={theme}>
                <LabelledInput label="URL" id="drug-list-url" placeholder="Enter drug list API URL" theme={theme} />
            </FormSection>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsScreen;