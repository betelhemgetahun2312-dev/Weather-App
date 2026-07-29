class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }

  static badRequest(message) {
    return new ApiError(message, 400);
  }

  static notFound(message) {
    return new ApiError(message, 404);
  }

  static timeout(message = 'Request timed out. Please try again.') {
    return new ApiError(message, 408);
  }

  static serviceUnavailable(message = 'Weather service is currently unavailable.') {
    return new ApiError(message, 503);
  }

  static internal(message = 'Internal Server Error') {
    return new ApiError(message, 500);
  }
}

module.exports = ApiError;
