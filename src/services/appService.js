import axiosConfig from "../axiosConfig";

export const apiGetAllPrices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/v1/price/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllAcreages = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/v1/acreage/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
