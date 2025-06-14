'use client'
import styles from "./ReportContent.module.css"

import { fetchWorkshopRecentRegisterUser } from "@/app/api/dashboard"
import { fetchWorkshopByUsers } from "@/app/api/manage-workshop"
import { fetchWorkshopOfUsers } from "@/app/api/workshop"
import { getUserInfo } from "@/app/util/auth"
import { formatDateRange } from "@/app/util/convert"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import CalendarSidebarCanvas from "../calendar/CalendarSidebarCanvas"
import ChartComponent from './ChartComponent'
import MyEvent from './MyEvent'
const userInfo = getUserInfo()

export default function ReportContent() {
    const [currentPage, setCurrentPage] = useState(1); // Trạng thái trang hiện tại
    const [dataDates, setDataDates] = useState([])
    const [registerUsers, setRegisterUsers] = useState([])

    const { data: workshopDates } = useQuery({
        queryKey: ['workshop-dates'],
        queryFn: ({ signal }) => fetchWorkshopOfUsers({ signal, userId: userInfo.id }),
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
    })

    const { data, isPending } = useQuery({
        queryKey: ['workshop-user', currentPage],
        queryFn: ({ signal }) => fetchWorkshopByUsers(
            { signal, pageNumber: currentPage, pageSize: 3, userId: userInfo?.id }),
    });

    const totalPages = data?.totalPages || 1; // Tổng số trang

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
        if (workshopDates) {
            if (workshopDates.statusCode === 200) {
                setDataDates(workshopDates.result)
            }
        }
    }, [workshopDates])

    return (
        <div className="row">
            <div className="col-xxxl-8 col-xxl-7 col-xl-12 mb-200">
                <div className="section-box main-background border-1px border-radius-10 mb-25">
                    <div className="container p-0">
                        <div className="panel-white">
                            <div className={`panel-head flex-space border-1px-bottom ${styles.sectionStyle}`}>
                                <h6 className="text-xl-bold white-color">Thống kê doanh thu & bán vé</h6>
                            </div>
                            <div className="panel-body">
                                <ChartComponent />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-box main-background border-1px border-radius-10">
                    <div className="container p-0">
                        <div className="panel-white">
                            <div className={`panel-head flex-space border-1px-bottom ${styles.sectionStyle}`}>
                                <h6 className="text-xl-bold white-color">Sự kiện đã tạo gần đây</h6>
                            </div>
                            <div className={`panel-body ${styles.eventList}`}>
                                <div className="box-list-tours list-tours wow fadeIn">
                                    {isPending ? <Spinner /> : data?.workshops.map((event, index) => (
                                        <MyEvent
                                            workshopId={event.workshopId}
                                            key={index}
                                            title={event.title}
                                            time={formatDateRange(event.startDate, event.endDate)}
                                            address={event.location.replace("(credit-card-payment)", "").trim()}
                                            price={event.isFree ? 'Miễn phí' : `${event.price.toLocaleString()} VNĐ`}
                                            imageSrc={event.imagePath}
                                            buttonText="Chi tiết"
                                            isButtonVisible={false}
                                            isSuccess={event.status === 0
                                                ? 'waiting'
                                                : (new Date(event.startDate).getTime() < Date.now() ? 'success' : undefined)}
                                        />
                                    ))}
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        {/* Nút Previous */}
                                        <li className="page-item">
                                            <Link
                                                className="page-link main-third-background white-color-4"
                                                href="#"
                                                onClick={handlePreviousPage}
                                                aria-label="Previous"
                                            >
                                                <span aria-hidden="true">
                                                    <svg
                                                        className={styles.whiteTextsvg}
                                                        width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </li>
                                        {/* Các trang */}
                                        {generatePagination().map((page, index) => (
                                            <li key={index} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                                <Link className="page-link main-third-background white-color-4 flex-center" href="#"
                                                    onClick={() => handlePageChange(page)}>
                                                    {page}
                                                </Link>
                                            </li>
                                        ))}
                                        {/* Nút Next */}
                                        <li className="page-item">
                                            <Link
                                                className="page-link main-third-background white-color-4"
                                                href="#"
                                                onClick={handleNextPage}
                                                aria-label="Next"
                                            >
                                                <span aria-hidden="true">
                                                    <svg
                                                        className={styles.whiteTextsvg}
                                                        width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.99967 10.6666L10.6663 5.99992L5.99968 1.33325M10.6663 5.99992L1.33301 5.99992" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xxxl-4 col-xxl-5 col-xl-12">
                <div className="section-box main-background border-1px border-radius-10 mb-25">
                    <div className="container p-0">
                        <div className="panel-white">
                            <div className={`panel-head flex-space border-1px-bottom ${styles.sectionStyle}`}>
                                <h6 className="text-xl-bold white-color">Người dùng mới đăng ký</h6>
                            </div>
                            <div className={`panel-body ${styles.panelBody}`}>
                                {registerUsers?.map(item => (
                                    <div className="card-style-3 row pb-20 pt-20 border-1px-bottom" key={item.userEmail}>
                                        <div className="col-lg-5 flex-center-align pr-0">
                                            <div className="mr-10 flex-center">
                                                <img className={styles.image} src={item.avatarUrl || "/assets/icon/user.svg"} alt="icon" />
                                            </div>
                                            <div className="card-title">
                                                <p className="text-sm-bold white-color">
                                                    {item.userName}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-3 flex-center pl-0">
                                            <img src='/assets/icon/phone-dashboard.svg' className='mr-5' />
                                            <Link className="text-xs-medium phone white-color" href="#">{item.userPhone || 'Unknonw'}</Link>
                                        </div>
                                        <div className="card-email col-4 pr-0 flex-start">
                                            <img src='/assets/icon/email-dashboard.svg' className='mr-5' />
                                            <Link className={`email white-color ${styles.emailText}`} href="#">{item.userEmail}</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-box main-background border-1px border-radius-10 mb-25">
                    <div className="container p-0">
                        <div className="panel-white">
                            <CalendarSidebarCanvas dataDates={dataDates} background="none" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
