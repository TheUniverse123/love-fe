import jwt from 'jsonwebtoken';
import { axiosInstanceJson } from './axiosInstance';
import Cookies from 'js-cookie';
export function decodeToken(token) {
    try {
        const decoded = jwt.decode(token, { complete: true });
        return decoded;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}

export const fetchLogin = async (email, password) => {
    const data = await axiosInstanceJson.post('/api/Auth/login', {
        email,
        password
    }).then((response) => {
        return response.data
    }
    ).catch((error) => {
        const errors = error.response.data.errorMessages || error.response.data.errors || []
        return errors
    })
    return data
}

export const fetchLogout = () => {
    Cookies.remove('userInfo', { secure: true, sameSite: 'Strict' })
    Cookies.remove('token', { secure: true, sameSite: 'Strict' })
    Cookies.remove('expiration', { secure: true, sameSite: 'Strict' })
    location.reload()
}

export const fetchUserInfo = async ({ signal, userId }) => {
    const data = await axiosInstanceJson.get(`/api/Users/${userId}`)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}