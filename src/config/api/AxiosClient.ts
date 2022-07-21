import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from 'constants/apiUrl';
import QueryString from 'query-string';
const token = JSON.parse(localStorage.getItem('gearfocus-admin-AUTH') || '{}');
const AxiosClient = axios.create({
    baseURL: API_URL,
    headers: { Authorization: token.user_cookie },
    // { 'Content-Type': 'application/json' },
    paramsSerializer: (params) => QueryString.stringify(params),
});
AxiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
    return config;
});
AxiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error) => {
        throw error;
    },
);
export default AxiosClient;
