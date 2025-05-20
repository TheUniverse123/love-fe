import Cookies from 'js-cookie'

const COOKIE_EXPIRATION_DAYS = 1 / 24;

export const getAuthToken = () => {
    const userInfo = getUserInfo()
    const token = userInfo?.accessToken
    if (!token) {
        return null
    }
    const tokenDuration = getAuthTokenDuration()

    if (tokenDuration < 0) {
        return 'EXPIRED'
    }
    return token
}

export const setAuthToken = (accessToken) => {
    Cookies.set('accessToken', accessToken, {
        expires: COOKIE_EXPIRATION_DAYS,
        secure: true,
        sameSite: 'Strict',
    })
}

export const getUserInfo = () => {
    const userInfo = Cookies.get('userInfo')
    if (!userInfo) {
        return null
    }
    return JSON.parse(userInfo)
}

export const setUserInfoToStorage = (userInfo) => {
    Cookies.set('userInfo', JSON.stringify(userInfo), {
        expires: COOKIE_EXPIRATION_DAYS,
        secure: true,
        sameSite: 'Strict',
    })
}

export const getAuthTokenDuration = () => {
    const userInfo = getUserInfo()
    if (!userInfo || !userInfo.expiration) {
        return 0  // Nếu không có expiration, trả về 0 (hết hạn ngay lập tức)
    }
    const expirationDate = new Date(userInfo.expiration)
    const now = new Date()
    const duration = expirationDate.getTime() - now.getTime()
    return duration
}

export const tokenLoader = () => {
    return getAuthToken()
}

