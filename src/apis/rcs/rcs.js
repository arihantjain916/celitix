import { fetchWithAuth } from "../apiClient";

export const fetchCampaignReport = async (data) => {
  return await fetchWithAuth("", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
