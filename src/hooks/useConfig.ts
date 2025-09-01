import apiClient from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useConfig = () => {
  const queryClient = useQueryClient(); 

  // Get configuration
  const getConfig = useQuery({
    queryKey: ["configuration"],
    queryFn: () => apiClient.api.configurationGetConfigurationList(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Set configuration 
  const setConfig = useMutation({
    mutationFn: (data: any) =>
      apiClient.api.configurationSetConfigurationCreate(),
    onSuccess: () => {
      toast.success("Configuration updated successfully");
      queryClient.invalidateQueries({ queryKey: ["configuration"] });
    },
  });

  return {
    config: getConfig.data,
    isLoading: getConfig.isLoading,
    error: getConfig.error,
    refetch: getConfig.refetch,
    updateConfig: setConfig.mutate,
    isUpdating: setConfig.isPending,
  };
};