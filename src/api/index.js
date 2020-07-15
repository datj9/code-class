import axios from "axios";
export const apiUrl = "https://code-class.herokuapp.com";
const api = axios.create({
    baseURL: `${apiUrl}/api`,
});

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.token = token ? token : "";
    config["Content-Type"] = "application/json";
    return config;
});

const BaseApi = () => {
    return {
        async get(endpoint) {
            try {
                const res = await api.get(endpoint);
                return res.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async post(endpoint, body, contentType) {
            try {
                const res = await api.post(
                    endpoint,
                    body,
                    contentType === "formData" && { headers: { "content-type": "multipart/form-data" } }
                );
                return res.data;
            } catch (error) {
                return error.response.data;
            }
        },
        async put(endpoint, body) {
            try {
                const res = await api.put(endpoint, body);
                return res.data;
            } catch (error) {
                return error.response.data;
            }
        },
        async patch(endpoint, body) {
            try {
                const res = await api.patch(endpoint, body);
                return res.data;
            } catch (error) {
                return error.response.data;
            }
        },
        async delete(endpoint) {
            try {
                const res = await api.delete(endpoint);
                return res.data;
            } catch (error) {
                return error.response;
            }
        },
    };
};

export default BaseApi;
