// api.js
import axios from 'axios';

const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_LOCAL_API_URL : import.meta.env.VITE_RENDER_API_URL;

export const FetchClasses = async (token) => {
    if (!token) {
        return Promise.reject(new Error('No token provided'));
    }

    try {
        const response = await axios.get(`${BASE_URL}/classes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching classes:', error);
        throw error;
    }
};
