export function validateNonEmptyString(str) {
    if (str.trim() === '') {
        return false
    }
    return true
}

export function validateSameStringValue(str1, str2) {
    return str1 === str2 && str1 !== '' && str2 !== ''
}

export function validatePassword(password) {
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{6,}$/
    return passwordRegex.test(password)
}

export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
}

export function validatePhoneNumber(phone) {
    const phoneRegex = /^[+]?[0-9]{1,4}?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
}