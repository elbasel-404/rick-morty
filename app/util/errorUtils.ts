import axios, { type AxiosRequestConfig } from "axios";
import { logError } from "./logError";
import { axiosClient } from "@http";

interface HandleAxiosErrorParams {
  error: unknown;
  requestConfig: AxiosRequestConfig;
  errorMessagePrefix: string;
  fallbackMessage: string;
}

export const handleAxiosError = ({
  error,
  requestConfig,
  errorMessagePrefix,
  fallbackMessage,
}: HandleAxiosErrorParams): string => {
  const requestUrl = axiosClient.getUri(requestConfig);

  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      const errorMessage = `${errorMessagePrefix} failed with status ${status}.`;

      const responsePayload = error.response.data;
      const serializedPayload =
        typeof responsePayload === "string"
          ? responsePayload
          : (() => {
              try {
                return JSON.stringify(responsePayload, null, 2);
              } catch {
                return "Unable to serialize error response.";
              }
            })();

      logError({
        errorTitle: `${errorMessagePrefix} at endpoint: ${requestUrl}`,
        errorContent: serializedPayload ?? errorMessage,
      });

      return errorMessage;
    }

    const errorMessage = error.message ?? fallbackMessage;
    logError({
      errorTitle: `Network error during ${errorMessagePrefix} at endpoint: ${requestUrl}`,
      errorContent: errorMessage,
    });

    return `Network error: ${errorMessage}`;
  }

  const errorMessage = error instanceof Error ? error.message : fallbackMessage;
  logError({
    errorTitle: `Unexpected error during ${errorMessagePrefix} at endpoint: ${requestUrl}`,
    errorContent: errorMessage,
  });

  return `Unexpected error: ${errorMessage}`;
};
