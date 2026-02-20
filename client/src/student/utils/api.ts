const API_URL = 'http://localhost:5001/api/v1';

export const api = {
    async post(endpoint: string, data: any) {
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

    async get(endpoint: string) {
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
