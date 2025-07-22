'use client'
import styles from "@/components/dashboard/ReportContent.module.css"

import { fetchRecentCreatedWorkshops, fetchWorkshopBottomRevenue, fetchWorkshopOrganizer, fetchWorkshopParticipant, fetchWorkshopRevenue, fetchWorkshopTopRevenue } from "@/app/api/admin-dashboard"
import { fetchWorkshopRecentRegisterUser } from "@/app/api/dashboard"
import { formatDateRange, formatPrice } from "@/app/util/convert"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import ChartOrganizer from "./ChartOrganizer"
import ChartRevenueExample from "./ChartRevenue"
import RecentCreatedEvents from './RecentCreatedEvents'
export default function ReportContentOverviewAdmin() {
    const [currentPage, setCurrentPage] = useState(1); // Trạng thái trang hiện tại
    const [dataDates, setDataDates] = useState([])
    const [registerUsers, setRegisterUsers] = useState([])
    const [isMediumScreen, setIsMediumScreen] = useState(false)

    // Check screen size for 1400px-1600px
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMediumScreen(width >= 1400 && width <= 1600);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const tableClass = isMediumScreen ? styles.tableTopRevenueMedium : styles.tableTopRevenue;

    const { data: recentCreatedWorkshops, isPending: isPendingRecent } = useQuery({
        queryKey: ['recent-created-workshops', currentPage],
        queryFn: ({ signal }) => fetchRecentCreatedWorkshops({ signal, pageNumber: currentPage, pageSize: 3 }),
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
    })
    const totalPages = recentCreatedWorkshops?.totalPages || 1; // Tổng số trang

    const generatePagination = () => {
        let pages = [];
        if (totalPages <= 5) {
            // Nếu có 5 trang trở xuống, hiển thị tất cả
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Hiển thị trang đầu tiên, dấu ba chấm, và trang cuối cùng
            pages.push(1);

            if (currentPage > 3) pages.push('...'); // Nếu không phải trang đầu thì dấu ba chấm
            for (let i = Math.max(currentPage - 1, 2); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push('...'); // Nếu không phải trang cuối thì dấu ba chấm

            pages.push(totalPages);
        }
        return pages;
    };

    const handlePageChange = (page) => {
        if (page !== '...') {
            setCurrentPage(page);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    async function handleFetchNewRegisterUsers() {
        const response = await fetchWorkshopRecentRegisterUser()
        if (response.statusCode === 200) {
            setRegisterUsers(response.result)
        }
    }

    useEffect(() => {
        handleFetchNewRegisterUsers()
    }, [])

    useEffect(() => {
        if (recentCreatedWorkshops) {
            if (recentCreatedWorkshops.statusCode === 200) {
                setDataDates(recentCreatedWorkshops.result)
            }
        }
    }, [recentCreatedWorkshops])

    console.log(recentCreatedWorkshops)

    const { data: revenueWeekly, isPending: isPendingRevenue } = useQuery({
        queryKey: ['revenue-data'],
        queryFn: () => fetchWorkshopRevenue(),
    })

    const { data: organizerWeekly, isPending: isPendingOrganizer } = useQuery({
        queryKey: ['organizer-data'],
        queryFn: () => fetchWorkshopOrganizer(),
    })

    const { data: participantWeekly, isPending: isPendingParticipant } = useQuery({
        queryKey: ['participant-data'],
        queryFn: () => fetchWorkshopParticipant(),
    })

    const { data: topRevenue, isPending: isPendingTopRevenue } = useQuery({
        queryKey: ['top-revenue-data'],
        queryFn: () => fetchWorkshopTopRevenue(),
    })

    const { data: bottomRevenue, isPending: isPendingBottomRevenue } = useQuery({
        queryKey: ['bottom-revenue-data'],
        queryFn: () => fetchWorkshopBottomRevenue(),
    })

    return (
        <>
            <div className="row mb-20">
                <div className="col-xxxl-6 col-xxl-6 col-xl-12">
                    <div className="section-box main-background border-1px border-radius-10 mb-25">
                        {isPendingRevenue ? <Spinner /> :
                            <ChartRevenueExample
                                labels={revenueWeekly?.weeks?.map(week => week.label) || []}
                                revenueData={revenueWeekly?.weeks?.map(week => week.totalRevenue || 0) || []}
                                ticketData={revenueWeekly?.weeks?.map(week => week.totalTickets || 0) || []}
                                min={0}
                                max={100} />}
                    </div>
                </div>

                <div className="col-xxxl-6 col-xxl-6 col-xl-12">
                    {isPendingOrganizer ? <Spinner /> :
                        <ChartOrganizer
                            labels={organizerWeekly?.weeks?.map(week => week.label) || []}
                            organizerData={organizerWeekly?.weeks?.map(week => week.totalOrganizers || 0) || []}
                            workshopData={organizerWeekly?.weeks?.map(week => week.totalWorkshops || 0) || []}
                        />}
                    <div style={{ marginBottom: 22 }}></div>
                    {isPendingParticipant ? <Spinner /> :
                        <ChartOrganizer
                            labels={participantWeekly?.weeks?.map(week => week.label) || []}
                            organizerData={participantWeekly?.weeks?.map(week => week.totalNewUsers || 0) || []}
                            workshopData={participantWeekly?.weeks?.map(week => week.totalParticipants || 0) || []}
                            title="Bên người tham gia"
                            organizerLabel="Số tài khoản mới"
                            workshopLabel="Số người tham gia workshop"
                        />}
                </div>
            </div>

            <div className="row mb-20">
                <div className="col-xxxl-6 col-xxl-6 col-xl-12">
                    <div className="section-box main-background border-1px border-radius-10 mb-25">
                        <div className="container p-0">
                            <div className="panel-white">
                                <div className={`panel-head flex-space border-1px-bottom ${styles.sectionStyle}`}>
                                    <h6 className="text-xl-bold white-color">Top 5 workshop doanh thu cao nhất</h6>
                                </div>
                                <div className={`panel-body ${styles.panelBody}`}>
                                    <table className={tableClass}>
                                        <thead>
                                            <tr>
                                                <th className={styles.rank}>Hạng</th>
                                                <th className={styles.organizer}>Nhà tổ chức</th>
                                                <th className={styles.workshop}>Tên workshop</th>
                                                <th className={styles.revenue}>Doanh thu</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topRevenue?.map((item, idx) => (
                                                <tr key={item.userEmail || idx}>
                                                    <td className={styles.rank}>{idx + 1}</td>
                                                    <td className={styles.organizer}>
                                                        <div className={styles.organizerInfo}>
                                                            <img className={styles.image} src={item.organizerAvatar || "/assets/icon/user.svg"} alt="icon" />
                                                            <div>
                                                                <div className={styles.organizerName}>{item.organizationName}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={styles.workshop}>
                                                        <span className={styles.workshopMain}>{item.workshopTitle || 'Khám phá giá trị bản thân'}</span>
                                                    </td>
                                                    <td className={styles.revenue} style={{ color: '#34D674' }}>
                                                        {formatPrice(item.revenue)}
                                                        <span className={styles.revenueIcon}>
                                                            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11 1H19M19 1V9M19 1L11 9L7 5L1 11" stroke="#34D674" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxxl-6 col-xxl-6 col-xl-12">
                    <div className="section-box main-background border-1px border-radius-10 mb-25">
                        <div className="container p-0">
                            <div className="panel-white">
                                <div className={`panel-head flex-space border-1px-bottom ${styles.sectionStyle}`}>
                                    <h6 className="text-xl-bold white-color">Top 3 workshop doanh thu thấp nhất</h6>
                                </div>
                                <div className={`panel-body ${styles.panelBody}`}>
                                    <table className={tableClass}>
                                        <thead>
                                            <tr>
                                                <th className={styles.rank}>Hạng</th>
                                                <th className={styles.organizer}>Nhà tổ chức</th>
                                                <th className={styles.workshop}>Tên workshop</th>
                                                <th className={styles.revenue}>Doanh thu</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bottomRevenue?.map((item, idx) => (
                                                <tr key={item.userEmail || idx}>
                                                    <td className={styles.rank}>{idx + 1}</td>
                                                    <td className={styles.organizer}>
                                                        <div className={styles.organizerInfo}>
                                                            <img className={styles.image} src={item.organizerAvatar || "/assets/icon/user.svg"} alt="icon" />
                                                            <div>
                                                                <div className={styles.organizerName}>{item.organizationName}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={styles.workshop}>
                                                        <span className={styles.workshopMain}>{item.workshopTitle || 'Khám phá giá trị bản thân'}</span>
                                                    </td>
                                                    <td className={styles.revenue} style={{ color: '#FF2E00' }}>
                                                        {formatPrice(item.revenue)}
                                                        <span className={styles.revenueIcon}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M13 17H21M21 17V9M21 17L13 9L9 13L3 7" stroke="#FF2E00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-200">
                <div className="col-xxxl-8 col-xxl-8 col-xl-12">
                    <RecentCreatedEvents
                        workshops={recentCreatedWorkshops?.items}
                        isPending={isPendingRecent}
                        handlePreviousPage={handlePreviousPage}
                        handleNextPage={handleNextPage}
                        handlePageChange={handlePageChange}
                        generatePagination={generatePagination}
                        currentPage={currentPage}
                        formatDateRange={formatDateRange}
                        styles={styles}
                    />
                </div>
            </div>
        </>

    );
}
