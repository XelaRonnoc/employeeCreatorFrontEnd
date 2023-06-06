import axios, { AxiosRequestConfig } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import instance from "../services/axios";

const axiosMockInstance = axios.create();

export const axiosMockAdapterInstance = new AxiosMockAdapter(
    axiosMockInstance,
    { delayResponse: 0 }
);
export default axiosMockInstance;
