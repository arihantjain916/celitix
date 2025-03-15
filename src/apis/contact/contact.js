import { fetchWithAuth } from "../apiClient.js";

export const getContactListByGrpId = async (data) => {
  return await fetchWithAuth("/proCpaasRest/contact/getAllContact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
