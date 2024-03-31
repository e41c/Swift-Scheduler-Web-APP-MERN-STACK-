// frontend/src/api.js
import axios from 'axios';

// Hardcoded backend URL for debugging
const backendUrl = 'https://capstone-ii-group26.onrender.com';

export const FetchClasses = async (token) => {
    if (!token) {
        return Promise.reject('Token is missing');
    }

    try {
        const response = await axios.get(`${backendUrl}/classes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
