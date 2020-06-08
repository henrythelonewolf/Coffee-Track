export const extractErrorMessage = (error: any): string => {
  try {
    return error.message;
  } catch (ex) {
    return 'Internal Error';
  }
}