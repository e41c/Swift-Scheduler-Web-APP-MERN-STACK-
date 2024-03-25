import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

export const ClassManagementContext = createContext();

export const ClassManagementProvider = ({ children }) => {

    const [availableSlots, setAvailableSlots] = useState([]);

    const fetchAvailableSlotsByDay = async (date) => {
        try{

        }catch(error){
            console.error(error);
        }
    }
}