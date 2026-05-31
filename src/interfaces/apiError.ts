export interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  };
}