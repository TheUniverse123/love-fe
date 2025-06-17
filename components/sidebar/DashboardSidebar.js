'use client';
import { useState, useEffect } from 'react';
import styles from './DashboardSidebar.module.css';
import TicketIcon from '@/public/assets/icon/TicketIcon';
import { fetchLogout, fetchUserInfo } from '@/app/api/account';
import { getUserInfo } from '@/app/util/auth';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { fetchPoint } from '@/app/api/point';
import { Spinner } from 'react-bootstrap';
const userInfo = getUserInfo()
export default function DashboardSidebar() {
    const [activeItem, setActiveItem] = useState();

    useEffect(() => {
        const savedActiveItem = localStorage.getItem("activeItem");
        if (savedActiveItem) {
            setActiveItem(savedActiveItem);
        }
    }, []);

    const { data: point, isLoading: isLoadingPoint } = useQuery({
        queryKey: ['point'],
        queryFn: () => fetchPoint(),
    })

    const handleItemClick = (item) => {
        setActiveItem(item); // Cập nhật state
        localStorage.setItem("activeItem", item); // Lưu trạng thái vào localStorage
    };

    const { data } = useQuery({
        queryKey: ['user-info'],
        queryFn: ({ signal }) => fetchUserInfo({ signal, userId: userInfo.id }),
    })

    return (
        <div className={styles.sidebar}>
            <div className={styles.profile}>
                <div className='flex-space'>
                    <img className={styles.avatar} src={data?.result.avatarUrl} alt="User Avatar" />
                    <span className={styles.userName}>{data ? data?.result.userName : 'Tên người dùng'}</span>
                </div>
                <div className='pb-15 w-100 flex-center border-1px-bottom'>
                    <div className="btn btn-default grey-button-background mt-15"
                        style={{ padding: "10px 20px!important", width: "70%!important" }}>
                        <Link href='/dashboard/point-accumulate' className='flex-space white-color'>
                            <span>{isLoadingPoint ? <Spinner /> : point?.totalPoints}</span>
                            <span className="flex-center ml-5">
                                <img src='/assets/icon/star-dashboard.svg' alt='' />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={`${styles.menu} pb-5 border-1px-bottom`}>
                <Link href="/dashboard" className={`${styles.menuItemContainer} flex-start ${activeItem === 'ticket' ? styles.active : ''}`} style={{ padding: "12px 0" }} onClick={() => handleItemClick('ticket')}>
                    <TicketIcon />
                    <div className={`ml-10 ${styles.menuItem}`}>Vé đã đặt</div>
                </Link>

                <Link href="/dashboard/my-event" className={`${styles.menuItemContainer} flex-start ${activeItem === 'event' ? styles.active : ''}`} style={{ padding: "12px 0" }} onClick={() => handleItemClick('event')}>
                    <TicketIcon icon="event" />
                    <div className={`ml-10 ${styles.menuItem}`}>Sự kiện của tôi</div>
                </Link>

                <Link href="/dashboard/saved-event" className={`${styles.menuItemContainer} flex-start ${activeItem === 'savedEvent' ? styles.active : ''}`} style={{ padding: "12px 0" }} onClick={() => handleItemClick('savedEvent')}>
                    <TicketIcon icon="savedEvent" />
                    <div className={`ml-10 ${styles.menuItem}`}>Sự kiện đã lưu</div>
                </Link>

                <Link href="/dashboard/report" className={`${styles.menuItemContainer} flex-start ${activeItem === 'report' ? styles.active : ''}`} style={{ padding: "12px 0" }} onClick={() => handleItemClick('report')}>
                    <TicketIcon icon="report" />
                    <div className={`ml-10 ${styles.menuItem}`}>Quản lý báo cáo</div>
                </Link>

                {data?.result.roles.includes("Admin") && <Link href="/dashboard/review" className={`${styles.menuItemContainer} flex-start ${activeItem === 'review' ? styles.active : ''}`} style={{ padding: "12px 0" }} onClick={() => handleItemClick('review')}>
                    <TicketIcon icon="report" />
                    <div className={`ml-10 ${styles.menuItem}`}>Xét duyệt sự kiện</div>
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
