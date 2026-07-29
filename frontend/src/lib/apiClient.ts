import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timed out. Please try again.'));
    }

    if (!error.response) {
      return Promise.reject(
        new Error('Unable to reach the server. Please check your connection.')
      );
    }

    const status: number = error.response.status;

    if (status === 404) {
      return Promise.reject(
        new Error(
          error.response.data?.error?.message ||
          'City not found. Please check the name and try again.'
        )
      );
    }

    const message =
      error.response.data?.error?.message ||
      error.response.data?.message ||
      'Something went wrong. Please try again.';

    return Promise.reject(new Error(message));
  }
);

export default apiClient;
