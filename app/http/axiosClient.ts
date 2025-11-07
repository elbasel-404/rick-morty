import { getApiRootUrl } from "@util";
import axios from "axios";

const DEFAULT_TIMEOUT_MS = 10000;

// Shared Axios instance keeps base config consistent across requests.
export const axiosClient = axios.create({
  baseURL: getApiRootUrl(),
  headers: {
    Accept: "application/json",
  },
  timeout: DEFAULT_TIMEOUT_MS,
});
