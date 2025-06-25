import { useQuery } from "@tanstack/react-query";
import styles from './DashboardSidebar.module.css';

import { Spinner } from "react-bootstrap";
import Link from "next/link";
import { getUserInfo } from "@/app/util/auth";
import { fetchUserInfo } from "@/app/api/account";
import { fetchPoint } from "@/app/api/point";

const userInfo = getUserInfo()

// Helper to get tier info based on address
function getTierInfoByAddress(address) {
    if (!address) {
        return { icon: '/assets/logo/copper.svg', border: 'linear-gradient(to bottom, #FFCFA5, #D76A0B)' };
    }
    const addr = address.toLowerCase();
    if (addr.includes('kim cương') || addr.includes('diamond')) {
        return { icon: '/assets/logo/diamond.svg', border: 'linear-gradient(to bottom, #98F1FF, #007F92)' };
    } else if (addr.includes('vàng') || addr.includes('gold')) {
        return { icon: '/assets/logo/gold.svg', border: 'linear-gradient(to bottom, #FFD467, #CA8C00)' };
    } else if (addr.includes('bạc') || addr.includes('silver')) {
        return { icon: '/assets/logo/silver.svg', border: 'linear-gradient(to bottom, #ECEEF2, #898A8C)' };
    } else {
        return { icon: '/assets/logo/copper.svg', border: 'linear-gradient(to bottom, #FFCFA5, #D76A0B)' };
    }
}

export default function UserAvatar() {
    const { data: point, isLoading: isLoadingPoint } = useQuery({
        queryKey: ['point'],
        queryFn: () => fetchPoint(),
    })
    const { data } = useQuery({
        queryKey: ['user-info'],
        queryFn: ({ signal }) => fetchUserInfo({ signal, userId: userInfo.id }),
    })
    return (
        <div className={styles.profile}>
            <div className='flex-space'>
                <div className={styles.avatar} style={{ background: getTierInfoByAddress(data?.result.address).border }}>
                    <img className={styles.avatarImg} src={data?.result.avatarUrl} alt="User Avatar" />
                    <img src={getTierInfoByAddress(data?.result.address).icon} alt='avatar-crown' className={styles.avatarCrown} />
                </div>
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
    )
}