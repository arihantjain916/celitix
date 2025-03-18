import { fetchWithAuth } from "../apiClient";

export const fetchCampaignReport = async (data) => {
  return await fetchWithAuth("/proCpaasRest/rcs/getCampaignReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const fetchSummaryReport = async (data) => {
  return await fetchWithAuth("/proCpaasRest/rcs/getSummaryReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const fetchAllAgents = async () => {
  return await fetchWithAuth("proCpaasRest/rcs/bot/getListOfAgents", {
    method: "POST",
  });
};
