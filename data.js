import { fetchCountConfirmTicket } from "./app/api/booking";
import { fetchCategoryCount } from "./app/api/category";
import { fetchWorkshopsSavedVer2 } from "./app/api/saved-workshops";
import { fetchWorkshopsCount, fetchWorkshopsNumber } from "./app/api/workshop";
import { getUserInfo } from "./app/util/auth";
const userInfo = getUserInfo()

export const trendWorkshops = [
    {
        id: Math.random(),
        img: "/assets/workshop/home/1.png",
        avgRating: 4.95,
        reviews: 672,
        title: "WORKSHOP NAME: Lorem ipsum dolor sit amet",
        date: "15/10/2025",
        price: "100.000 đ",
    },
    {
        id: Math.random(),
        img: "/assets/workshop/home/2.png",
        avgRating: 4.95,
        reviews: 672,
        title: "WORKSHOP NAME: Lorem ipsum dolor sit amet",
        date: "15/10/2025",
        price: "100.000 đ",
    },
    {
        id: Math.random(),
        img: "/assets/workshop/home/3.png",
        avgRating: 4.95,
        reviews: 672,
        title: "WORKSHOP NAME: Lorem ipsum dolor sit amet",
        date: "15/10/2025",
        price: "100.000 đ",
    },
    {
        id: Math.random(),
        img: "/assets/workshop/home/4.png",
        avgRating: 4.95,
        reviews: 672,
        title: "WORKSHOP NAME: Lorem ipsum dolor sit amet",
        date: "15/10/2025",
        price: "100.000 đ",
    },
]

export const AIChooseWorkshops = [
    {
        id: Math.random(),
        img: "/assets/workshop/home/11.png",
        avgRating: 4.95,
        reviews: 672,
        title: "WORKSHOP NAME: Lorem ipsum dolor sit amet",
        date: "15/10/2025",
        price: "100.000 đ",
    },
    {
        id: Math.random(),
        img: "/assets/workshop/home/12.png",
        avgRating: 4.95,
        reviews: 672,
        title: "WORKSHOP NAME: Lorem ipsum dolor sit amet",
        date: "15/10/2025",
        price: "100.000 đ",
    },
    {
        id: Math.random(),
        img: "/assets/workshop/home/13.png",
        avgRating: 4.95,
        reviews: 672,
        title: "WORKSHOP NAME: Lorem ipsum dolor sit amet",
        date: "15/10/2025",
        price: "100.000 đ",
    },
    {
        id: Math.random(),
        img: "/assets/workshop/home/14.png",
        avgRating: 4.95,
        reviews: 672,
        title: "WORKSHOP NAME: Lorem ipsum dolor sit amet",
        date: "15/10/2025",
        price: "100.000 đ",
    },
]

export const comingSoonWorkshops = [
    {
        id: Math.random(),
        img: "/assets/workshop/home/15.png",
        avgRating: 4.95,
        reviews: 672,
        title: "WORKSHOP NAME: Lorem ipsum dolor sit amet",
        date: "15/10/2025",
        price: "100.000 đ",
    },
    {
        id: Math.random(),
        img: "/assets/workshop/home/16.png",
        avgRating: 4.95,
        reviews: 672,
        title: "WORKSHOP NAME: Lorem ipsum dolor sit amet",
        date: "15/10/2025",
        price: "100.000 đ",
    },
    {
        id: Math.random(),
        img: "/assets/workshop/home/17.png",
        avgRating: 4.95,
        reviews: 672,
        title: "WORKSHOP NAME: Lorem ipsum dolor sit amet",
        date: "15/10/2025",
        price: "100.000 đ",
    },
    {
        id: Math.random(),
        img: "/assets/workshop/home/18.png",
        avgRating: 4.95,
        reviews: 672,
        title: "WORKSHOP NAME: Lorem ipsum dolor sit amet",
        date: "15/10/2025",
        price: "100.000 đ",
    },
]

const dataCategory = await fetchCategoryCount();
const totalNumber = await fetchWorkshopsNumber();
const categoryCount1 = dataCategory?.find(item => item.categoryId === 1)?.workshopCount || 0
const categoryCount2 = dataCategory?.find(item => item.categoryId === 2)?.workshopCount || 0
const categoryCount3 = dataCategory?.find(item => item.categoryId === 3)?.workshopCount || 0
const categoryCount4 = dataCategory?.find(item => item.categoryId === 4)?.workshopCount || 0
const categoryCount5 = totalNumber - categoryCount1 - categoryCount2 - categoryCount3 - categoryCount4

export const filters = [
    {
        title: 'Vị trí',
        items: (await fetchWorkshopsCount())?.map(item => (
            { label: item.district, count: item.workshopCount, type: item.district }
        )),
    },
    {
        title: 'Thể loại',
        items: [
            { label: 'Nghệ thuật & Thủ công', count: categoryCount1, type: "art" },
            { label: 'Ẩm thực & Pha chế', count: categoryCount2, type: "food" },
            { label: 'Sức khỏe', count: categoryCount3, type: "health" },
            { label: 'Phát triển kỹ năng', count: categoryCount4, type: "skill" },
            { label: 'Khác', count: categoryCount5, type: "other" },
        ]
    }
];

export const posts = [
    {
        link: '#',
        imageSrc: '/assets/lib/user/imgs/page/tour/post.png',
        title: 'Singapore Skylines: Urban Exploration',
        price: '$48.25',
        oldPrice: '$60.75',
    },
    {
        link: '#',
        imageSrc: '/assets/lib/user/imgs/page/tour/post2.png',
        title: 'Paris City Tour: Sightseeing',
        price: '$40.00',
    },
    {
        link: '#',
        imageSrc: '/assets/lib/user/imgs/page/tour/post3.png',
        title: 'New York: The Big Apple',
        price: '$50.00',
        oldPrice: '$55.00',
    },
    // Các bài viết khác
];

export const questions = [
    {
        id: 1,
        question: "Câu hỏi 1",
        answer: "Absolutely! The High Roller offers a family-friendly experience suitable for visitors of all ages. Children must be accompanied by an adult."
    },
    {
        id: 2,
        question: "Câu hỏi 2",
        answer: "Outside food and beverages are not permitted on The High Roller. However, there are nearby dining options at The LINQ Promenade where you can enjoy a meal before or after your ride."
    },
    {
        id: 3,
        question: "Câu hỏi 3",
        answer: "Yes, The High Roller cabins are wheelchair accessible, making it possible for everyone to enjoy the breathtaking views of Las Vegas."
    }
]

export const historyAccumulatePoint = [
    {
        id: 1,
        date: "25/10/2023",
        points: "100 điểm",
        isPositive: true,
        eventName: "Workshop 1"
    },
    {
        id: 2,
        date: "25/10/2023",
        points: "100 điểm",
        isPositive: false,
        eventName: "Workshop 1"
    },
    {
        id: 3,
        date: "25/10/2023",
        points: "100 điểm",
        isPositive: false,
        eventName: "Workshop 1"
    },
    {
        id: 4,
        date: "25/10/2023",
        points: "100 điểm",
        isPositive: true,
        eventName: "Workshop 1"
    },
    {
        id: 5,
        date: "25/10/2023",
        points: "100 điểm",
        isPositive: true,
        eventName: "Workshop 1"
    },
]

export const progressData = [
    { title: 'Giá cả', progress: 90, average: 4.8 },
    { title: 'Dịch vụ', progress: 90, average: 4.2 },
    { title: 'Nội dung', progress: 95, average: 4.9 },
    { title: 'Giải trí', progress: 85, average: 4.7 },
    { title: 'Không gian', progress: 100, average: 5.0 },
    { title: 'Hỗ trợ', progress: 100, average: 5.0 }
];

export const ratingTypes = [
    { title: 'Giá cả', stars: 5 },
    { title: 'Dịch vụ', stars: 5 },
    { title: 'Nội dung', stars: 5 },
    { title: 'Giải trí', stars: 5 },
    { title: 'Không gian', stars: 5 },
    { title: 'Hỗ trợ', stars: 5 }
];

export const events = {
    upcoming: [
        {
            title: "WORKSHOP NAME: Lorem ipsW Lorem ipsu dolor sit ametum dolor sit amet 1",
            time: "10:00 - 11:30, 27 tháng 02, 2025",
            address: "53/104 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
            price: "100.000",
            imageSrc: "/assets/workshop/explore/detail/1.png",
            link: "room-detail-2.html",
            buttonText: "Đặt ngay",
            isButtonVisible: false,
        },
    ],
    past: [
        {
            title: "WORKSHOP NAME: Lorem ipsW Lorem ipsu dolor sit ametum dolor sit amet 2",
            time: "10:00 - 11:30, 27 tháng 02, 2025",
            address: "53/104 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
            price: "100.000",
            imageSrc: "/assets/workshop/explore/detail/1.png",
            link: "room-detail-2.html",
            buttonText: "Đặt ngay",
            isButtonVisible: false,
            isSuccess: "success",
        },
    ],
    waiting: [
        {
            title: "WORKSHOP NAME: Lorem ipsW Lorem ipsu dolor sit ametum dolor sit amet 3",
            time: "10:00 - 11:30, 27 tháng 02, 2025",
            address: "53/104 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
            price: "100.000",
            imageSrc: "/assets/workshop/explore/detail/1.png",
            link: "room-detail-2.html",
            buttonText: "Đặt ngay",
            isButtonVisible: false,
            isSuccess: "waiting",
        },
    ],
};

export const eventRecent = [
    {
        title: "WORKSHOP NAME: Lorem ipsW Lorem ipsu dolor sit ametum dolor sit amet 1",
        time: "10:00 - 11:30, 27 tháng 02, 2025",
        address: "53/104 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
        price: "100.000",
        imageSrc: "/assets/workshop/explore/detail/1.png",
        link: "room-detail-2.html",
        buttonText: "Đặt ngay",
        isButtonVisible: false,
    },
    {
        title: "WORKSHOP NAME: Lorem ipsW Lorem ipsu dolor sit ametum dolor sit amet 1",
        time: "10:00 - 11:30, 27 tháng 02, 2025",
        address: "53/104 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
        price: "100.000",
        imageSrc: "/assets/workshop/explore/detail/1.png",
        link: "room-detail-2.html",
        buttonText: "Đặt ngay",
        isButtonVisible: false,
    },
    {
        title: "WORKSHOP NAME: Lorem ipsW Lorem ipsu dolor sit ametum dolor sit amet 1",
        time: "10:00 - 11:30, 27 tháng 02, 2025",
        address: "53/104 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
        price: "100.000",
        imageSrc: "/assets/workshop/explore/detail/1.png",
        link: "room-detail-2.html",
        buttonText: "Đặt ngay",
        isButtonVisible: false,
    },
]

export const tickets = {
    all: {
        upcoming: [
            {
                title: "WORKSHOP 'Sáng Tạo' Góc Quay Nấu Ăn Tại Nhà",
                time: "10:00 - 11:30, 27 tháng 02, 2025",
                address: "53/104 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
                price: "100.000",
                imageSrc: "/assets/workshop/explore/detail/1.png",
                link: "/dashboard/point-accumulate",
                buttonText: "Đặt ngay",
                isButtonVisible: false,
            },
            {
                title: "WORKSHOP 'Sáng Tạo' Góc Quay Nấu Ăn Tại Nhà",
                time: "10:00 - 11:30, 27 tháng 02, 2025",
                address: "53/104 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
                price: "100.000",
                imageSrc: "/assets/workshop/explore/detail/1.png",
                link: "/dashboard/point-accumulate",
                buttonText: "Đặt ngay",
                isButtonVisible: false,
                isSuccess: "success"
            },
            {
                title: "WORKSHOP 'Sáng Tạo' Góc Quay Nấu Ăn Tại Nhà",
                time: "10:00 - 11:30, 27 tháng 02, 2025",
                address: "53/104 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
                price: "100.000",
                imageSrc: "/assets/workshop/explore/detail/1.png",
                link: "/dashboard/point-accumulate",
                buttonText: "Đặt ngay",
                isButtonVisible: false,
                isSuccess: "canceled"
            },
        ],
        completed: [
            {
                title: "WORKSHOP 'Bí Quyết' Món Ăn Thượng Hạng",
                time: "08:00 - 10:30, 10 tháng 01, 2025",
                address: "53/106 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
                price: "200.000",
                imageSrc: "/assets/workshop/explore/detail/3.png",
                link: "/dashboard/point-accumulate",
                buttonText: "Xem chi tiết",
                isButtonVisible: false,
                isSuccess: "success"
            },
        ],
    },
    success: {
        upcoming: [
            {
                title: "WORKSHOP 'Học Cách' Nấu Ăn Chuyên Nghiệp",
                time: "14:00 - 16:00, 15 tháng 03, 2025",
                address: "53/107 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
                price: "120.000",
                imageSrc: "/assets/workshop/explore/detail/4.png",
                link: "/dashboard/point-accumulate",
                buttonText: "Đặt ngay",
                isButtonVisible: false,
            },
        ],
        completed: [
            {
                title: "WORKSHOP 'Làm Đẹp' Món Ăn Tốt Cho Sức Khỏe",
                time: "16:00 - 18:00, 12 tháng 01, 2025",
                address: "53/108 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
                price: "180.000",
                imageSrc: "/assets/workshop/explore/detail/5.png",
                link: "/dashboard/point-accumulate",
                buttonText: "Đặt ngay",
                isButtonVisible: false,
                isSuccess: "success"
            },
        ],
    },
    processing: {
        upcoming: [
            {
                title: "WORKSHOP 'Khám Phá' Nghệ Thuật Nấu Ăn",
                time: "10:00 - 12:00, 30 tháng 03, 2025",
                address: "53/109 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
                price: "130.000",
                imageSrc: "/assets/workshop/explore/detail/6.png",
                link: "/dashboard/point-accumulate",
                buttonText: "Đặt ngay",
                isButtonVisible: false,
            },
        ],
        completed: [
            {
                title: "WORKSHOP 'Nâng Cao' Món Ăn Đặc Sản",
                time: "11:00 - 13:00, 18 tháng 02, 2025",
                address: "53/110 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
                price: "160.000",
                imageSrc: "/assets/workshop/explore/detail/7.png",
                link: "/dashboard/point-accumulate",
                buttonText: "Đặt ngay",
                isButtonVisible: false,
            },
        ],
    },
    canceled: {
        upcoming: [
            {
                title: "WORKSHOP 'Tự Học' Nấu Ăn Hằng Ngày",
                time: "09:00 - 11:00, 20 tháng 04, 2025",
                address: "53/111 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
                price: "110.000",
                imageSrc: "/assets/workshop/explore/detail/8.png",
                link: "/dashboard/point-accumulate",
                buttonText: "Đặt ngay",
                isButtonVisible: false,
            },
        ],
        completed: [
            {
                title: "WORKSHOP 'Cộng Đồng' Món Ăn Từ Sự Kiện",
                time: "10:30 - 12:30, 17 tháng 02, 2025",
                address: "53/112 Trần Khánh Dư, phường Tân Định, Quận 1, Thành Phố Hồ Chí Minh",
                price: "190.000",
                imageSrc: "/assets/workshop/explore/detail/9.png",
                link: "/dashboard/point-accumulate",
                buttonText: "Đặt ngay",
                isButtonVisible: false,
            },
        ],
    },
};

export const quickLinks = [
    {
        icon: '/assets/icon/sidebar-canvas/ticket.svg',
        title: 'Vé đã đặt',
        description: `${userInfo?.id ? (await fetchCountConfirmTicket(userInfo?.id)) : 'Chưa có'} sự kiện`,
        link: '/dashboard',
        status: 'resolved',
        type: "ticket",
    },
    {
        icon: '/assets/icon/sidebar-canvas/myevent.svg',
        title: 'Sự kiện của tôi',
        description: 'Trong hôm nay',
        link: '/dashboard/my-event',
        type: "event",
    },
    {
        icon: '/assets/icon/sidebar-canvas/saved.svg',
        title: 'Sự kiện đã lưu',
        description: `${userInfo?.id ? (await fetchWorkshopsSavedVer2(1, 1, userInfo?.id)) : 'Chưa có'} sự kiện`,
        link: '/dashboard/saved-event',
        type: "savedEvent",
    },
    {
        icon: '/assets/icon/sidebar-canvas/report.svg',
        title: 'Quản lý báo cáo',
        // description: '3 sự kiện',
        link: '/dashboard/report',
        // status: 'online',
        type: "report",
    },
    {
        icon: '/assets/icon/sidebar-canvas/user.svg',
        title: 'Cài đặt',
        description: 'Tài khoản của bạn',
        link: '/dashboard/profile',
        type: "user",
    }
];