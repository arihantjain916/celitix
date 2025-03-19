import { fetchWithAuth } from "../apiClient";

export const fetchAllUsers = async (data) => {
  return await fetchWithAuth("/proCpaasRest/user/getUserList", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
