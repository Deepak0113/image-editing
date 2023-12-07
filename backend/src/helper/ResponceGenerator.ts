export const generateResponse = (status: 'success' | 'error', code: number, message: string, data?: object) => {
  return {
    status: status,
    code: code,
    message: message,
    data: data ? data : {},
    // timestamp: "2023-11-29T12:05:00Z"
  }
}
