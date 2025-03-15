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
  return await fetchWithAuth(
    "/proCpaasRest/accountInfo/getWhatsappRateAllData?countryCode=&countryName=",
    {
      method: "POST",
    }
  );
};

export const getaccountInfo = async () => {
  return await fetchWithAuth("/proCpaasRest/accountInfo/showAccountInfo", {
    method: "POST",
  });
};

export const getSmsRate = async (sno) => {
  return await fetchWithAuth(
    `proCpaasRest/accountInfo/getSmsPricing?srno=${sno}`,
    {
      method: "POST",
    }
  );
};

// export const getRcsRate = async (sno) => {
//   return await fetchWithAuth(
//     `/proCpaasRest/accountInfo/getAllRCSRateData?countryCode=&countryName=`,
//     {
//       method: "POST",
//     }
//   );
// };
