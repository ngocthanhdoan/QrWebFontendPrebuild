// src/service/DataPayLoad.js
import axios from 'axios';

const apiService = axios.create({
    baseURL: 'http://localhost:8082/v1/api/', // URL cơ sở của API
    timeout: 10000
});

// Fetch data
export const fetchData = async (endpoint) => {
    try {
        const response = await apiService.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

// Create data
export const postData = async (endpoint, data) => {
    try {
        const response = await apiService.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

// Update data
export const putData = async (endpoint, data) => {
    try {
        const response = await apiService.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

// Delete data
export const deleteData = async (endpoint) => {
    try {
        const response = await apiService.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};
