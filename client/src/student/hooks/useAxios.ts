import { useState, useEffect, useCallback } from 'react';
import axios, { type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    withCredentials: true,
});

interface UseAxiosState<T> {
    data: T | null;
    loading: boolean;
    error: AxiosError | null;
}

export const useAxios = <T = any>(config: AxiosRequestConfig, immediate = true) => {
    const [state, setState] = useState<UseAxiosState<T>>({
        data: null,
        loading: immediate,
        error: null,
    });

    const execute = useCallback(async (overrides?: AxiosRequestConfig) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response: AxiosResponse<T> = await api.request({
                ...config,
                ...overrides,
            });
            setState({
                data: response.data,
                loading: false,
                error: null,
            });
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            setState({
                data: null,
                loading: false,
                error,
            });
            throw error;
        }
    }, [config]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [immediate]);

    return { ...state, execute };
};
