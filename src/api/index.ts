import { Api } from '@/api/generated_api';

/**
 * A singleton instance of the API client.
 * This instance is configured with the base URL of the API.
 */
const apiClient = new Api({
  baseUrl: 'https://localhost:5001',
});

export default apiClient;
