export function formatDate(isoString) {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Invalid date";

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function formatPrice(price) {
    if (isNaN(price)) return '';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
}

export function convertToISOString(dateStr) {
    const [day, month, year] = dateStr.split('/');
    const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
    return date.toISOString();
}

export function generateRandomUsername(length = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let username = '';
    for (let i = 0; i < length; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return "user" + username;
}

export function shuffleArray(array = []) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export function converWorkshopApi(workshops = []) {
    if (workshops === undefined) return []
    return workshops?.map(item => {
        return {
            label: "",
            imgSrc: item.imagePath,
            rating: item.averageRating,
            title: item.title,
            date: formatDate(item.startDate),
            price: formatPrice(item.price),
            link: `/user/explore/${item.workshopId}`
        }
    })
}

export function convertTrendWorkshop(workshops = []) {
    if (workshops === undefined) return []
    console.log(workshops)
    console.log(workshops)

    return workshops?.map(item => {
        return {
            id: item.workshopId,
            img: item.imagePath,
            avgRating: item.averageRating,
            reviews: "Chưa có",
            title: item.title,
            date: formatDate(item.startDate),
            price: formatPrice(item.price),
        }
    })
}

export function convertRemarkedWorkshop(workshops = []) {
    if (!workshops) return []
    return workshops?.map(item => {
        return {
            link: item.workshopId,
            imageSrc: item.imagePath,
            title: item.title,
            price: formatPrice(item.price),
        }
    })
}