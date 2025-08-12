---
id: endoscope-screen
title: Endoscope Screen
---

The `EndoscopeScreen` component provides a user interface for interacting with an endoscope device. It includes a video feed from the camera, controls for recording, and options for selecting the video source and resolution.

### Structure

- **`AppHeader`**: A reusable header component that displays the screen title and a back button.
- **Video Player**: A video element that displays the live feed from the camera.
- **Video Controls**: A set of buttons for controlling the camera and recording:
  - **Open/Close Camera**: Toggles the camera feed on and off.
  - **Start/Stop Recording**: Starts and stops video recording.
- **Video Source and Resolution**: Dropdown menus for selecting the video source and resolution.
- **Return Button**: A button to navigate back to the medical measurements screen.

### Functionality

- **Camera Access**: Uses `navigator.mediaDevices.getUserMedia` to access the camera and display the video stream.
- **Error Handling**: Displays an error message if the camera cannot be accessed.
- **Recording State**: Uses `useState` to manage the recording state.
- **Stream Management**: Uses `useEffect` to properly stop the camera stream when the component unmounts.
- **Navigation**: Uses `useNavigate` to navigate back to the medical measurements screen.
- **Theming**: Uses the `useTheme` hook to apply the current theme to the component.
- **Layout**: The screen is designed to be responsive, with the layout adjusting to different screen sizes.

### Code

```typescript
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Play, Square, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useTheme } from '../src/contexts/ThemeContext';
import { SCREEN_NAMES } from '../constants';
import AppHeader from './shared/AppHeader';

/**
 * Screen for Endoscope functionality, including camera feed, recording, and resolution settings.
 */
const EndoscopeScreen: React.FC = () => {
  const { theme, isMidnightTheme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const openCamera = async () => {
    // ... (openCamera implementation)
  };

  const stopCamera = () => {
    // ... (stopCamera implementation)
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const toggleRecording = () => {
    // ... (toggleRecording implementation)
  };

  return (
    // ... (JSX for the component)
  );
};

export default EndoscopeScreen;
