import { QueryClient, MutationCache, QueryCache } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Custom error handler function
const handleError = (error: unknown, context?: string) => {
  console.error(`${context || 'API'} error:`, error);
  
  let errorMessage = "Something went wrong. Please try again.";
  
  // More specific error handling
  if (error instanceof Response) {
    switch (error.status) {
      case 401:
        errorMessage = "Authentication failed. Please login again.";
        // Optionally redirect to login
        break;
      case 403:
        errorMessage = "You don't have permission to perform this action.";
        break;
      case 404:
        errorMessage = "The requested resource was not found.";
        break;
      case 500:
        errorMessage = "Server error. Please try again later.";
        break;
      case 503:
        errorMessage = "Service temporarily unavailable.";
        break;
      default:
        errorMessage = `HTTP ${error.status}: ${error.statusText || 'Unknown error'}`;
    }
  } else if (error instanceof Error) {
    if (error.message.includes('Network')) {
      errorMessage = "Network error. Please check your connection.";
    } else if (error.message.includes('timeout')) {
      errorMessage = "Request timed out. Please try again.";
    } else {
      errorMessage = error.message;
    }
  }
  
  toast.error(errorMessage);
  return errorMessage;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {  // How many times to retry failed requests
        // Don't retry on 4xx errors
        if (error instanceof Response && error.status >= 400 && error.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false, // Don't refetch when user comes back to tab
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: (failureCount, error) => {
        // Don't retry on client errors
        if (error instanceof Response && error.status >= 400 && error.status < 500) {
          return false;
        }
        return failureCount < 1;
      },
    },
  },
  
  // New way to handle global errors
  // Every failed API call automatically shows a toast error message
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Only show error toast if the query doesn't have a custom error handler
      if (!query.meta?.skipGlobalErrorHandler) {
        handleError(error, 'Query');
      }
    },
  }),
  
  mutationCache: new MutationCache({
    onError: (error, variables, context, mutation) => {
      // Only show error toast if the mutation doesn't have a custom error handler
      if (!mutation.meta?.skipGlobalErrorHandler) {
        handleError(error, 'Mutation');
      }
    },
  }),
});