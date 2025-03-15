import { fetchWithAuth } from "../apiClient.js";

export const getContactListByGrpId = async (data) => {
  return await fetchWithAuth("/proCpaasRest/contact/getAllContact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const getGrpList = async () => {
  return await fetchWithAuth("/proCpaasRest/group/showGroups", {
    method: "POST",
  });
};

export const addContact = async (data) => {
  return await fetchWithAuth("/proCpaasRest/contact/addContact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const addGrp = async (data) => {
  return await fetchWithAuth("/proCpaasRest/group/addGroup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
