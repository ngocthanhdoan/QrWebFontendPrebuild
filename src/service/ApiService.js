import axios from 'axios';

const apiBaseUrl = 'http://localhost:8082/v1/api';

const apiClient = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const apiService = {
    async fetchData(endpoint, toast) {
        try {
            const response = await apiClient.get(endpoint);
            const data = response.data;

            if (data.returnCode === 0) {
                toast.add({ severity: 'success', summary: 'Success', detail: data.msgDescs, life: 3000 });
            } else {
                toast.add({ severity: 'warn', summary: 'Warning', detail: data.msgDescs, life: 3000 });
            }

            return data;
        } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error);
            toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching data.', life: 3000 });
            throw error;
        }
    },

    async postData(endpoint, payload, toast) {
        try {
            const response = await apiClient.post(endpoint, payload);
            const data = response.data;

            if (data.returnCode === 0) {
                toast.add({ severity: 'success', summary: 'Success', detail: data.msgDescs, life: 3000 });
            } else {
                toast.add({ severity: 'warn', summary: 'Warning', detail: data.msgDescs, life: 3000 });
            }

            return data;
        } catch (error) {
            console.error(`Error posting data to ${endpoint}:`, error);
            toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while posting data.', life: 3000 });
            throw error;
        }
    }

    // Define other methods for PUT, DELETE, etc. if needed
};
