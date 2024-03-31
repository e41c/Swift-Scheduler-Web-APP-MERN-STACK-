// frontend/src/api.js
import axios from 'axios';

export const FetchClasses = async (token) => {
    if (!token) {
        return Promise.reject('Token is missing');
    }

    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/classes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
