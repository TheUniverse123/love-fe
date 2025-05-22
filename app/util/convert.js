export function formatDate(isoString) {
    const date = new Date(isoString);
    console.log(date, isoString)
    if (isNaN(date.getTime())) return "Invalid date";

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function generateRandomUsername(length = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let username = '';
    for (let i = 0; i < length; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return "user" + username;
}