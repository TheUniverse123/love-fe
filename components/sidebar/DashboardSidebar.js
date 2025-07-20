'use client';
import { fetchLogout, fetchUserInfo } from '@/app/api/account';
import { getUserInfo } from '@/app/util/auth';
import TicketIcon from '@/public/assets/icon/TicketIcon';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './DashboardSidebar.module.css';
import UserAvatar from './UserAvatar';
const userInfo = getUserInfo()
export default function DashboardSidebar() {
    const [activeItem, setActiveItem] = useState();

    const { data } = useQuery({
        queryKey: ['user-info'],
        queryFn: ({ signal }) => fetchUserInfo({ signal, userId: userInfo.id }),
    })

    useEffect(() => {
        const savedActiveItem = localStorage.getItem("activeItem");
        if (savedActiveItem) {
            setActiveItem(savedActiveItem);
        }
    }, []);

    const handleItemClick = (item) => {
        setActiveItem(item); // Cập nhật state
        localStorage.setItem("activeItem", item); // Lưu trạng thái vào localStorage
    };

    return (
        <div className={styles.sidebar}>
            <UserAvatar />

            <div className={`${styles.menu} pb-5 border-1px-bottom`}>
                {!data?.result.roles.includes("Admin") &&
                    <Link href="/dashboard" className={`${styles.menuItemContainer} flex-start ${activeItem === 'ticket' ? styles.active : ''}`} style={{ padding: "12px 0" }} onClick={() => handleItemClick('ticket')}>
                        <TicketIcon />
                        <div className={`ml-10 ${styles.menuItem}`}>Vé đã đặt</div>
                    </Link>}

                {!data?.result.roles.includes("Admin") &&
                <Link href="/dashboard/my-event" className={`${styles.menuItemContainer} flex-start ${activeItem === 'event' ? styles.active : ''}`} style={{ padding: "12px 0" }} onClick={() => handleItemClick('event')}>
                    <TicketIcon icon="event" />
                    <div className={`ml-10 ${styles.menuItem}`}>Sự kiện của tôi</div>
                </Link>}

                {!data?.result.roles.includes("Admin") &&
                <Link href="/dashboard/saved-event" className={`${styles.menuItemContainer} flex-start ${activeItem === 'savedEvent' ? styles.active : ''}`} style={{ padding: "12px 0" }} onClick={() => handleItemClick('savedEvent')}>
                    <TicketIcon icon="savedEvent" />
                    <div className={`ml-10 ${styles.menuItem}`}>Sự kiện đã lưu</div>
                </Link>}

                {!data?.result.roles.includes("Admin") &&
                <Link href="/dashboard/report" className={`${styles.menuItemContainer} flex-start ${activeItem === 'report' ? styles.active : ''}`} style={{ padding: "12px 0" }} onClick={() => handleItemClick('report')}>
                    <TicketIcon icon="report" />
                    <div className={`ml-10 ${styles.menuItem}`}>Quản lý báo cáo</div>
                </Link>}

                {data?.result.roles.includes("Admin") && <Link href="/dashboard/review" className={`${styles.menuItemContainer} flex-start ${activeItem === 'review' ? styles.active : ''}`} style={{ padding: "12px 0" }} onClick={() => handleItemClick('review')}>
                    <TicketIcon icon="report" />
                    <div className={`ml-10 ${styles.menuItem}`}>Xét duyệt sự kiện</div>
                </Link>}

                {data?.result.roles.includes("Admin") && <Link href="/dashboard/admin/overview-report" className={`${styles.menuItemContainer} flex-start ${activeItem === 'overviewReport' ? styles.active : ''}`} style={{ padding: "12px 0" }} onClick={() => handleItemClick('overviewReport')}>
                    <TicketIcon icon="report" />
                    <div className={`ml-10 ${styles.menuItem}`}>Tổng quan báo cáo</div>
                </Link>}

                {data?.result.roles.includes("Admin") && <Link href="/dashboard/admin/detail-report" className={`${styles.menuItemContainer} flex-start ${activeItem === 'detailReport' ? styles.active : ''}`} style={{ padding: "12px 0" }} onClick={() => handleItemClick('detailReport')}>
                    <TicketIcon icon="report" />
                    <div className={`ml-10 ${styles.menuItem}`}>Chi tiết báo cáo</div>
                </Link>}

                {data?.result.roles.includes("Admin") && <Link href="/dashboard/ticket/checkin" className={`${styles.menuItemContainer} flex-start ${activeItem === 'checkin' ? styles.active : ''}`} style={{ padding: "12px 0" }} onClick={() => handleItemClick('checkin')}>
                    <TicketIcon icon="checkin" />
                    <div className={`ml-10 ${styles.menuItem}`}>Check-in vé</div>
                </Link>}
            </div>

            <div className={`${styles.menu} pb-5 mt-20`}>
                <Link href="/dashboard/profile" className={`${styles.menuItemContainer} flex-start ${activeItem === 'user' ? styles.active : ''}`} style={{ padding: "12px 0" }} onClick={() => handleItemClick('user')}>
                    <TicketIcon icon="user" />
                    <div className={`ml-10 ${styles.menuItem}`}>Tài khoản của tôi</div>
                </Link>
                <Link href="" onClick={fetchLogout} className={`${styles.menuItemContainer} flex-start ${activeItem === 'logout' ? styles.active : ''}`} style={{ padding: "12px 0" }}>
                    <TicketIcon icon="logout" />
                    <div className={`ml-10 ${styles.menuItem}`}>Đăng xuất</div>
                </Link>
            </div>
        </div>
    );
}
