import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_BACK,
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})