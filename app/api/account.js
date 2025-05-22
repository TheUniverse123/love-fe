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

export const fetchLoginGoogle = async (token) => {
    const data = await axiosInstanceJson.post(`/api/Auth/google-login`, token)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchUserInfoVer2 = async (userId) => {
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

export const updateUserInfo = async ({ signal, userUpdate }) => {
    const data = await axiosInstanceJson.put(`/api/Users/update`, userUpdate)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchRegister = async (userRegister) => {
    const data = await axiosInstanceJson.post(`/api/Users/register`, userRegister)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchConfirmEmail = async (email, token) => {
    const data = await axiosInstanceJson.get(`/api/Auth/confirm-email?email=${email}&token=${token}}`)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}