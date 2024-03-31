import axios from 'axios';

export const FetchClasses = async (token) => {
    if (!token) {
        return Promise.reject('Token is missing');
    }

    const backendUrl = 'https://capstone-ii-group26.onrender.com'; 

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
