const API_URL = 'http://localhost:5000/api';

export const api = {
    async post(endpoint, data) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Something went wrong');
        }
        return result;
    },

    async get(endpoint) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            credentials: 'include',
        });


        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Something went wrong');
        }
        return result;
    },
};
