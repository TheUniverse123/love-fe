import axios from 'axios';
import { getAuthToken } from '../util/auth';
const token = getAuthToken()
export const axiosInstanceJson = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    },
});