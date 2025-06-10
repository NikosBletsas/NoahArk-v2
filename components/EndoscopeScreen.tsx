
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Play, Square, ArrowLeft, AlertTriangle } from 'lucide-react';
import { BaseScreenProps } from '../types';
import { SCREEN_NAMES } from '../constants';
import AppHeader from './shared/AppHeader';

/**
 * Screen for Endoscope functionality, including camera feed, recording, and resolution settings.
 */
const EndoscopeScreen: React.FC<BaseScreenProps> = ({ theme, setCurrentScreen, setShowThemeSelector, isMidnightTheme }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const openCamera = async () => {
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setCameraError("Camera access denied. Please check your browser's site permissions and allow access to the camera. You might need to refresh the page after granting permission.");
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          setCameraError("No camera found. Please ensure a camera is connected and enabled.");
        } else {
          setCameraError(`Could not access camera: ${err.message}. Please try again or check your camera hardware.`);
        }
      } else {
        setCameraError("An unexpected error occurred while trying to access the camera.");
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
    setIsRecording(false);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const toggleRecording = () => {
    if (!stream) {
      setCameraError("Please open the camera first before trying to record.");
      return;
    }
    setIsRecording(!isRecording);
    console.log(isRecording ? "Stopping recording..." : "Starting recording...");
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex flex-col`}>
      <AppHeader 
        theme={theme} 
        title="Horus Endoscope" 
        onBack={() => {
          stopCamera();
          setCurrentScreen(SCREEN_NAMES.MEASUREMENTS);
        }}
        showThemeButton={true}
        onShowThemeSelector={() => setShowThemeSelector(true)}
        isMidnightTheme={isMidnightTheme}
      />

      <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 h-full">
          {/* Video Player Section */}
          <div className={`lg:col-span-2 ${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-lg border border-white/20 p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center justify-center relative min-h-[250px] sm:min-h-[300px] md:min-h-[400px] xl:min-h-[500px]`}>
            <video ref={videoRef} autoPlay playsInline className="w-full h-auto max-h-[calc(100vh-280px)] sm:max-h-[calc(100vh-220px)] md:max-h-[calc(100vh-250px)] lg:max-h-[calc(100vh-280px)] xl:max-h-[calc(100vh-300px)] rounded-lg bg-black" muted></video>
            {!stream && !cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                 <Camera className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-3 sm:mb-4 ${isMidnightTheme ? 'text-gray-500' : 'text-gray-400'}`} />
                <p className={`${isMidnightTheme ? theme.textSecondary : 'text-slate-600'} text-sm sm:text-base md:text-lg lg:text-xl`}>Camera feed will appear here.</p>
                <p className={`${isMidnightTheme ? theme.textSecondary : 'text-slate-500'} text-xs sm:text-sm md:text-base lg:text-lg`}>Click "Open Camera" to start.</p>
              </div>
            )}
             {cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/70 p-3 sm:p-4 rounded-lg">
                <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-yellow-400 mb-2 sm:mb-3" />
                <p className="text-yellow-200 font-semibold text-sm sm:text-base md:text-lg lg:text-xl">Camera Error</p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-yellow-300 px-2">{cameraError}</p>
              </div>
            )}
          </div>

          {/* Controls Section */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-1">
            <div className={`${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-lg border border-white/20 p-3 sm:p-4 md:p-6 lg:p-8`}>
              <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold ${theme.textPrimary} mb-3 sm:mb-4 lg:mb-5`}>Video Controls</h3>
              <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
                <button 
                  onClick={stream ? stopCamera : openCamera}
                  className={`w-full bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} p-2.5 sm:p-3 md:p-3.5 lg:p-4 rounded-lg sm:rounded-xl hover:opacity-90 transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base md:text-lg lg:text-xl`}
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                  <span>{stream ? 'Close Camera' : 'Open Camera'}</span>
                </button>
                
                <button
                  onClick={toggleRecording}
                  disabled={!stream}
                  className={`w-full p-2.5 sm:p-3 md:p-3.5 lg:p-4 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base md:text-lg lg:text-xl ${
                    isRecording 
                      ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' 
                      : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                  } text-white ${!stream ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isRecording ? <Square className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />}
                  <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                </button>
                <div className={`text-center text-xs sm:text-sm md:text-base lg:text-lg ${theme.textSecondary} font-medium mt-1 sm:mt-2`}>
                  {isRecording ? "REC ●" : (stream ? "Ready to Record" : (cameraError ? "" : "Camera Closed"))}
                </div>
              </div>
            </div>

            <div className={`${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-lg border border-white/20 p-3 sm:p-4 md:p-6 lg:p-8`}>
              <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold ${theme.textPrimary} mb-3 sm:mb-4 lg:mb-5`}>Video Source & Resolution</h3>
              <div className="space-y-3 sm:space-y-4 lg:space-y-5 text-sm sm:text-base md:text-lg lg:text-xl">
                 <select className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                    <option>USB HD Webcam</option>
                  </select>
                <select className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                  <option>Select Resolution</option>
                  <option>1920x1080</option>
                  <option>1280x720</option>
                  <option>640x480</option>
                </select>
              </div>
            </div>
             <button
                onClick={() => {
                  stopCamera();
                  setCurrentScreen(SCREEN_NAMES.MEASUREMENTS);
                }}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white p-2.5 sm:p-3 md:p-3.5 lg:p-4 rounded-lg sm:rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base md:text-lg lg:text-xl"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                <span>Return</span>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndoscopeScreen;