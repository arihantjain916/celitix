import { fetchWithAuth } from "../apiClient";

export const fetchCampaignReport = async (data) => {
  return await fetchWithAuth("/proCpaasRest/rcs/getCampaignReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
