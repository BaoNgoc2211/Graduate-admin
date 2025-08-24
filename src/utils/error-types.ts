export interface APIErrorResponse {
  response?: {
    data?: {
      message?: string;
      success?: boolean;
    };
    status?: number;
  };
  message?: string;
}

export const isAPIError = (error: unknown): error is APIErrorResponse => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error
  );
};

export const getErrorMessage = (error: unknown): string => {
  if (isAPIError(error)) {
    return error.response?.data?.message || error.message || 'Unknown API error';
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'Unknown error occurred';
};

export const isNoOrdersError = (error: unknown): boolean => {
  const message = getErrorMessage(error);
  return message.includes("chưa có đơn hàng");
};