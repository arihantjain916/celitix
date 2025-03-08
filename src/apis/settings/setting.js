import { fetchWithAuth } from "../apiClient.js";

// Get New API KEY
export const getApiKey = async () => {
  return await fetchWithAuth("/proCpaasRest/settings/generateKey", {
    method: "POST",
  });
};
