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

export const apiGetRenter = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "api/v1/rental/renter",
        params: query,
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

export const apiGetContract = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "api/v1/contract",
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreatePayment = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/v1/payment/",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPayment = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "api/v1/payment",
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiVerifyPayment = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: "api/v1/payment/accept",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetYourPayment = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "api/v1/payment/your_payment",
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdatePayment = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: "api/v1/payment/your_payment/pay",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreatePaymentVNPay = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "api/v1/payment/create_payment_url",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPaymentVNPay = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "api/v1/payment/vnpay_return",
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
