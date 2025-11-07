interface LogErrorParams {
  errorContent: string; // Detailed error content or stack trace
  errorTitle: string; // Brief description of the error
}

/**
 * Logs formatted error messages to the console with visual styling.
 *
 * Displays a red-highlighted error banner followed by detailed error content.
 * Useful for consistent error reporting across the application.
 *
 * @param params - Error logging parameters
 * @param params.errorTitle - A brief title describing the error
 * @param params.errorContent - Detailed error information
 */
export const logError = ({ errorContent, errorTitle }: LogErrorParams) => {
  // Print error title with red background and white text
  console.error(
    `\x1b[41m\x1b[37m[ERROR]\x1b[0m ${errorTitle}, check console for more details.`,
  );
  // Print detailed error content for debugging
  console.debug(`${errorContent}\n---\n`);
};
