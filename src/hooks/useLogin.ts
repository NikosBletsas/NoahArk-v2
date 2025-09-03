import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import apiClient from "@/api";
import { SCREEN_NAMES } from "@/constants";

// Init login session
export const useLoginInit = () => {
  return useQuery({
    queryKey: ["loginInit"],
    queryFn: () => apiClient.api.loginApiInitList(),
    retry: 2,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Login
export const useLogin = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (credentials: { user?: string; password?: string }) =>
      apiClient.api.loginApiLoginList(credentials),

    onSuccess: () => {
      toast.success("Welcome! Login successful.");
      navigate(`/${SCREEN_NAMES.DASHBOARD}`);
    },

    onError: (error) => {
      console.error("Login specific error:", error);

      if (error instanceof Response && error.status === 401) {
        toast.error("Invalid username or password.");
        return;
      }
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};

// Offline Login
export const useLoginOffline = () => {
  const navigate = useNavigate();

  const offlineLoginMutation = useMutation({
    mutationFn: () => apiClient.api.loginApiLoginOfflineList(),

    onSuccess: () => {
      toast.success("Offline mode activated.");
      navigate(`/${SCREEN_NAMES.DASHBOARD}`);
    },
  });

  return {
    loginOffline: offlineLoginMutation.mutate,
    isLoading: offlineLoginMutation.isPending,
    error: offlineLoginMutation.error,
  };
};

// Combined hook
export const useLoginFlow = () => {
  const initQuery = useLoginInit();
  const loginHook = useLogin();
  const offlineLoginHook = useLoginOffline();

  return {
    // Init
    initData: initQuery.data,
    initError: initQuery.error,
    initLoading: initQuery.isLoading,

    // Login functions
    login: loginHook.login,
    loginOffline: offlineLoginHook.loginOffline,

    // States
    isLoading:
      initQuery.isLoading || loginHook.isLoading || offlineLoginHook.isLoading,
    loginLoading: loginHook.isLoading,
    offlineLoginLoading: offlineLoginHook.isLoading,
  };
};
