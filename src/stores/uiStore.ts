import { create } from 'zustand';

/**
 * Represents the state of the UI.
 */
interface UIState {
  /**
   * Whether the connection status modal is visible.
   */
  showConnectionStatus: boolean;
  /**
   * Sets the visibility of the connection status modal.
   * @param show - Whether to show the modal.
   */
  setShowConnectionStatus: (show: boolean) => void;
  /**
   * Whether the connectivity test modal is visible.
   */
  showConnectivityTest: boolean;
  /**
   * Sets the visibility of the connectivity test modal.
   * @param show - Whether to show the modal.
   */
  setShowConnectivityTest: (show: boolean) => void;
}

/**
 * A Zustand store for managing the UI state.
 */
export const useUIStore = create<UIState>((set) => ({
  showConnectionStatus: false,
  setShowConnectionStatus: (show) => set({ showConnectionStatus: show }),
  showConnectivityTest: false,
  setShowConnectivityTest: (show) => set({ showConnectivityTest: show }),
}));
