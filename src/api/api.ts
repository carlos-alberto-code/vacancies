import axios from 'axios';

const API_TIMEOUT_MS = 10000;

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: API_TIMEOUT_MS,
});

export default api;