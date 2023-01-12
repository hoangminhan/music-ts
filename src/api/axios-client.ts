import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
  responseType: "json",
  // paramsSerializer: {
  //   encode:(params)=>{
  //    return queryString.stringify(params)
  //   }
  // },
});

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken: string = localStorage.accessToken || "";
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;

 
    }
    return config;
  },
  function error() {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error: string) => {
    throw error;
  }
);

export default axiosClient;
