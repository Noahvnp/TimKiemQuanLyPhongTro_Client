import axiosConfig from "../axiosConfig";

export const apiRental = (payload, postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "api/v1/rental/",
        data: payload,
        params: { postId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

<<<<<<< HEAD
export const apiGetRenter = (query) =>
=======
export const apiGetRenter = (postId) =>
>>>>>>> 6641730968f58f96e894e99fc326e9a0079faf8c
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "api/v1/rental/renter",
<<<<<<< HEAD
        params: query,
=======
        params: { postId },
>>>>>>> 6641730968f58f96e894e99fc326e9a0079faf8c
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiAcceptRenter = (renterId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: "/api/v1/rental/accept_renter",
        params: { renterId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
<<<<<<< HEAD

export const apiCreateRoom = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/v1/room/",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetRooms = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "api/v1/room/",
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreateContract = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/v1/contract/",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
=======
>>>>>>> 6641730968f58f96e894e99fc326e9a0079faf8c
