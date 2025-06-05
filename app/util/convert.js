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

export function convertWorkshopApi(workshops = []) {
    if (workshops === undefined) return []
    return workshops?.map(item => {
        return {
            label: "",
            imgSrc: item.imagePath,
            rating: item.averageRating,
            title: item.title,
            date: formatDate(item.startDate),
            price: formatPrice(item.price),
            link: `/user/explore/${item.workshopId}`,
            approvedReviewCount: item.approvedReviewCount,
            workshopId: item.workshopId
        }
    })
}

export function convertTrendWorkshop(workshops = []) {
    if (workshops === undefined) return []
    return workshops?.map(item => {
        return {
            id: item.workshopId,
            img: item.imagePath,
            avgRating: item.averageRating,
            reviews: item.approvedReviewCount,
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

export function formatDateRange(startDateStr, endDateStr) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    // Lấy giờ, phút theo định dạng 2 chữ số
    const padZero = (num) => num.toString().padStart(2, '0');

    const startHour = padZero(start.getHours());
    const startMinute = padZero(start.getMinutes());

    const endHour = padZero(end.getHours());
    const endMinute = padZero(end.getMinutes());

    const day = padZero(start.getDate());
    const month = padZero(start.getMonth() + 1); // Tháng trong JS từ 0-11
    const year = start.getFullYear();

    return `${startHour}:${startMinute} - ${endHour}:${endMinute}, ${day} tháng ${month}, ${year}`;
}

export function getTimeFromISO(isoString) {
    if (!isoString) return "00:00";
    const date = new Date(isoString);
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
}

export function extractHourMinuteFromISO(datetimeString) {
    const date = new Date(datetimeString);
    const pad = (num) => String(num).padStart(2, '0');
    return {
        selectedHour: pad(date.getHours()),      // giờ local
        selectedMinute: pad(date.getMinutes())   // phút local
    };
}

export function getTop5RecentBookings(bookings) {
    // Helper function to format and sort the dates
    const formatDate = (dateStr) => new Date(dateStr);

    // Step 1: Group bookings by email
    const groupedBookings = bookings.reduce((acc, booking) => {
        const email = booking.userEmail;

        if (!acc[email]) {
            acc[email] = [];
        }

        acc[email].push(booking);
        return acc;
    }, {});

    // Step 2: Sort each group by bookingDate (most recent first)
    const recentBookings = Object.values(groupedBookings).map(group => {
        // Sort the group by bookingDate (most recent first)
        group.sort((a, b) => formatDate(b.bookingDate) - formatDate(a.bookingDate));

        // Keep the most recent booking
        return group[0];
    });

    // Step 3: Limit to 5 items (take the top 5 most recent)
    return recentBookings.slice(0, 5);
}