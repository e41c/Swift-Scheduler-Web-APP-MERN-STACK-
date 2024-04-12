// Capstone-II---Group26/frontend/src/api.js
import axios from 'axios';
// import { useAuth } from './AuthContext';
export const FetchClasses = async (token) => {
    
    if (!token) {
        return;
    }
    else {
        return axios.get('/api/classes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .catch(error => error);
    }
    

}