/* eslint-disable prettier/prettier */

export interface ApiResponse<T> {
  success: boolean;
  payload?: T;
  error?: {
    code: number;
    message: string;
  };
}

export function successResponse<T>(payload: T): ApiResponse<T> {
  return {
    success: true,
    payload,
  };
}

export function errorResponse(
  code: number,
  message: string,
): ApiResponse<null> {
  return {
    success: false,
    payload: null,
    error: {
      code,
      message,
    },
  };
}
