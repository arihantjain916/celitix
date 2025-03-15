import { fetchWithAuth } from "../apiClient.js";

// Get User Details
export const getUserDetails = async () => {
  return await fetchWithAuth("/proCpaasRest/auth/getuserdetails", {
    method: "GET",
  });
};

export const getRcsRate = async () => {
  return await fetchWithAuth(
    "/proCpaasRest/accountInfo/getAllRCSRateData?countryCode=&countryName=",
    {
      method: "POST",
    }
  );
};

export const getWhatsAppRate = async () => {
  return await fetchWithAuth("/proCpaasRest/accountInfo/getWhatsappRateAllData?countryCode=&countryName=", {
    method: "POST",
  });
};
