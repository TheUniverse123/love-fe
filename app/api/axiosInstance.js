'use client'

import axios from 'axios';
import { getAuthToken } from '../util/auth';

export const axiosInstanceJson = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstanceJson.interceptors.request.use(config => {
    const token = getAuthToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete config.headers['Authorization'];
    }
    return config;
});
