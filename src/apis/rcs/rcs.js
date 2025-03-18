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

export const fetchAllAgents = async (agent_id = "") => {
  return await fetchWithAuth(
    `proCpaasRest/rcs/bot/getListOfAgents?agentId=${agent_id}`,
    {
      method: "POST",
    }
  );
};

// export const fetchAgentBySrNo = async (srno) => {
//   return await fetchWithAuth(
//     `proCpaasRest/rcs/bot/getBotDetailsBySrNo?botSrNo=${srno}`,
//     {
//       method: "POST",
//     }
//   );
// };

export const fetchsuggestionReport = async (data) => {
  return await fetchWithAuth("/proCpaasRest/rcs/getReplyReport", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
