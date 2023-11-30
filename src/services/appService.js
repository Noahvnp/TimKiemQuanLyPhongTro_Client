import axiosConfig from "../axiosConfig";
import axios from "axios";

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

export const apiGetAllProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/v1/province/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetVietNamProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://vapi.vnappmob.com/api/province/",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetVietNamDistricts = (province_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://vapi.vnappmob.com/api/province/district/${province_id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetMapGoogle = (address) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://maps.googleapis.com/maps/api/geocode/json`,
        params: {
          address,
          key: process.env.REACT_APP_MAP_API,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetOverviews = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/v1/overview/",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
